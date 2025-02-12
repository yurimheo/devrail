const express = require("express");
const { InstancesClient } = require('@google-cloud/compute').v1;
const WebSocket = require("ws");
const router = express.Router();
const Mutex = require("async-mutex").Mutex;

const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!projectId || !keyFilename) {
  console.error("환경 변수가 설정되지 않았습니다. GOOGLE_CLOUD_PROJECT와 GOOGLE_APPLICATION_CREDENTIALS를 확인하세요.");
  process.exit(1);
}

// InstancesClient 객체 생성
const instancesClient = new InstancesClient({ projectId, keyFilename });

const ZONE = "asia-northeast3-a";
const MACHINE_TYPE = "e2-standard-2";

// 활성 인스턴스 추적을 위한 Map
const activeInstances = new Map();
const instanceMutex = new Mutex();

// 웹소켓 서버 설정
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("클라이언트 연결됨");
  ws.on("message", (message) => console.log(`Received: ${message}`));
  ws.on("close", () => console.log("클라이언트 연결 종료"));
});

const server = express();
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

// 인스턴스 생성 요청 처리
router.post("/create-instance", async (req, res) => {
  const release = await instanceMutex.acquire();

  try {
    const { userId, courseId, subjectId, day } = req.body;
    if (!userId || !courseId || !subjectId || !day) {
      return res.status(400).json({ success: false, message: "필수 파라미터 누락" });
    }

    if (activeInstances.has(userId)) {
      return res.status(400).json({ success: false, message: "이미 실행 중인 인스턴스 존재" });
    }

    const instanceName = `practice-${courseId}-${day}-${userId}-${Date.now()}`.toLowerCase();

    const config = {
      project: projectId,
      zone: ZONE,
      instanceResource: {
        name: instanceName,
        machineType: `zones/${ZONE}/machineTypes/${MACHINE_TYPE}`,
        disks: [{
          boot: true,
          autoDelete: true,
          initializeParams: {
            sourceImage: 'projects/ubuntu-os-cloud/global/images/ubuntu-2204-lts',
            diskSizeGb: 20,
          },
        }],
        networkInterfaces: [{
          network: 'global/networks/default',
          accessConfigs: [{ type: 'ONE_TO_ONE_NAT', name: 'External NAT' }],
        }],
        metadata: {
          items: [{ key: 'startup-script', value: `#! /bin/bash\napt-get update\napt-get install -y nginx\nsystemctl start nginx` }],
        },
        tags: { items: ['practice-instance', courseId, `day-${day}`] },
      },
    };

    console.log(`Creating instance: ${instanceName}`);
    const [operation] = await instancesClient.insert(config);

    // 작업 완료 대기
    await operation.promise();

    // 인스턴스 메타데이터 가져오기
    const [instance] = await instancesClient.get({
      project: projectId,
      zone: ZONE,
      instance: instanceName,
    });
    const externalIP = instance.networkInterfaces[0].accessConfigs[0].natIP;

    activeInstances.set(userId, { instanceName, externalIP, courseId, day, createdAt: new Date() });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'instance-created', userId, externalIP }));
      }
    });

    res.json({ success: true, instanceName, externalIP, message: "인스턴스 생성 완료" });
  } catch (error) {
    console.error("Instance creation error:", error);
    res.status(500).json({ success: false, message: "인스턴스 생성 오류", error: error.message });
  } finally {
    release();
  }
});

// 인스턴스 삭제 요청 처리
router.post("/delete-instance", async (req, res) => {
  const release = await instanceMutex.acquire();

  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: "사용자 ID 필요" });

    const instance = activeInstances.get(userId);
    if (!instance) return res.status(404).json({ success: false, message: "인스턴스 없음" });

    console.log(`Deleting instance: ${instance.instanceName}`);
    const [operation] = await instancesClient.delete({
      project: projectId,
      zone: ZONE,
      instance: instance.instanceName,
    });

    // 작업 완료 대기
    await operation.promise();

    activeInstances.delete(userId);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'instance-deleted', userId, instanceName: instance.instanceName }));
      }
    });

    res.json({ success: true, message: `인스턴스 ${instance.instanceName} 삭제 완료` });
  } catch (error) {
    console.error("Instance deletion error:", error);
    res.status(500).json({ success: false, message: "인스턴스 삭제 오류", error: error.message });
  } finally {
    release();
  }
});

// 활성 인스턴스 조회
router.get("/instances", async (req, res) => {
  try {
    const instances = Array.from(activeInstances.entries()).map(([userId, instance]) => ({ userId, ...instance }));
    res.json({ success: true, instances });
  } catch (error) {
    res.status(500).json({ success: false, message: "인스턴스 조회 오류", error: error.message });
  }
});

module.exports = router;
