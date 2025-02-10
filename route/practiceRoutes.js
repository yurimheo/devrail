const express = require("express");
const { Compute } = require("@google-cloud/compute");
const WebSocket = require("ws");
const router = express.Router();
const Mutex = require("async-mutex").Mutex; // 동시성 제어를 위한 Mutex

// Google Cloud 설정
const compute = new Compute({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const ZONE = "asia-northeast3-a";
const MACHINE_TYPE = "e2-standard-2";

// 활성 인스턴스 추적을 위한 Map
const activeInstances = new Map();

// Mutex 객체 생성
const instanceMutex = new Mutex();

// 웹소켓 서버 설정 (간단한 예시)
const wss = new WebSocket.Server({ noServer: true });

// WebSocket 연결 처리
wss.on("connection", (ws) => {
  console.log("클라이언트 연결됨");

  // 클라이언트에서 메시지를 받으면 처리
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
  });

  ws.on("close", () => {
    console.log("클라이언트 연결 종료");
  });
});

// HTTP 서버와 웹소켓 서버 통합
const server = express();
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

// 인스턴스 생성 요청 처리
router.post("/create-instance", async (req, res) => {
  const release = await instanceMutex.acquire(); // Mutex 락을 얻음

  try {
    const { userId, courseId, subjectId, day } = req.body;

    // 필수 파라미터 검증
    if (!userId || !courseId || !subjectId || !day) {
      return res.status(400).json({
        success: false,
        message: "필수 파라미터가 누락되었습니다.",
      });
    }

    // 이미 존재하는 인스턴스 확인
    const existingInstance = activeInstances.get(userId);
    if (existingInstance) {
      return res.status(400).json({
        success: false,
        message: "이미 실행 중인 인스턴스가 있습니다.",
        instanceInfo: existingInstance,
      });
    }

    const instanceName = `practice-${courseId}-${day}-${userId}-${Date.now()}`.toLowerCase();
    const zone = compute.zone(ZONE);

    // 인스턴스 설정
    const config = {
      http: true,
      https: true,
      machineType: MACHINE_TYPE,
      disks: [
        {
          boot: true,
          autoDelete: true,
          initializeParams: {
            sourceImage: 'projects/ubuntu-os-cloud/global/images/ubuntu-2204-lts',
            diskSizeGb: 20,
          },
        },
      ],
      networkInterfaces: [
        {
          network: 'global/networks/default',
          accessConfigs: [{ name: 'External NAT', type: 'ONE_TO_ONE_NAT' }],
        },
      ],
      metadata: {
        items: [
          {
            key: 'startup-script',
            value: `#! /bin/bash
            apt-get update
            apt-get install -y docker.io git
            systemctl start docker
            systemctl enable docker
            echo 'Instance setup completed'`,
          },
        ],
      },
      tags: {
        items: ['practice-instance', courseId, `day-${day}`],
      },
    };

    // 인스턴스 생성
    console.log(`Creating instance: ${instanceName}`);
    const [vm, operation] = await zone.vm(instanceName).create(config);

    // 작업 완료 대기
    await operation.promise();

    // 인스턴스 메타데이터 가져오기
    const [metadata] = await vm.getMetadata();
    const externalIP = metadata.networkInterfaces[0].accessConfigs[0].natIP;

    // 활성 인스턴스 맵에 추가
    activeInstances.set(userId, {
      instanceName,
      externalIP,
      courseId,
      day,
      createdAt: new Date(),
    });

    // 웹소켓을 통해 클라이언트에 인스턴스 IP 전달
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'instance-created',
          userId,
          externalIP,
        }));
      }
    });

    res.json({
      success: true,
      instanceName,
      externalIP,
      message: "인스턴스가 성공적으로 생성되었습니다.",
    });
  } catch (error) {
    console.error("Instance creation error:", error);
    res.status(500).json({
      success: false,
      message: "인스턴스 생성 중 오류가 발생했습니다.",
      error: error.message,
    });
  } finally {
    release(); // Mutex 락을 해제
  }
});

// 인스턴스 삭제 요청 처리
router.post("/delete-instance", async (req, res) => {
  const release = await instanceMutex.acquire(); // Mutex 락을 얻음

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "사용자 ID가 필요합니다.",
      });
    }

    const instance = activeInstances.get(userId);
    if (!instance) {
      return res.status(404).json({
        success: false,
        message: "실행 중인 인스턴스를 찾을 수 없습니다.",
      });
    }

    const zone = compute.zone(ZONE);
    const vm = zone.vm(instance.instanceName);

    // 인스턴스 삭제
    console.log(`Deleting instance: ${instance.instanceName}`);
    const [operation] = await vm.delete();

    // 작업 완료 대기
    await operation.promise();

    // 활성 인스턴스 맵에서 제거
    activeInstances.delete(userId);

    // 웹소켓을 통해 클라이언트에 인스턴스 삭제 메시지 전송
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'instance-deleted',
          userId,
          instanceName: instance.instanceName,
        }));
      }
    });

    res.json({
      success: true,
      message: `인스턴스 ${instance.instanceName}가 성공적으로 삭제되었습니다.`,
    });
  } catch (error) {
    console.error("Instance deletion error:", error);
    res.status(500).json({
      success: false,
      message: "인스턴스 삭제 중 오류가 발생했습니다.",
      error: error.message,
    });
  } finally {
    release(); // Mutex 락을 해제
  }
});

// 활성 인스턴스 조회
router.get("/instances", async (req, res) => {
  try {
    const instances = Array.from(activeInstances.entries()).map(([userId, instance]) => ({
      userId,
      ...instance,
    }));

    res.json({
      success: true,
      instances,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "인스턴스 조회 중 오류가 발생했습니다.",
      error: error.message,
    });
  }
});

module.exports = router;
