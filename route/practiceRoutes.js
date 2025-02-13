const express = require('express');
const router = express.Router();
const { Mutex } = require('async-mutex');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const e = require('express');

const compute = google.compute('v1');
const auth = new GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const ZONE = process.env.GOOGLE_CLOUD_ZONE;
const MACHINE_TYPE = process.env.GOOGLE_CLOUD_MACHINE_TYPE || 'e2-micro';

const instanceMutex = new Mutex();
const activeInstances = new Map(); // userId -> { instanceName, externalIP, courseId, createdAt }
const deletedInstances = new Map(); // userId -> { deletedAt }

// 인스턴스 생성 또는 기존 인스턴스로 연결
router.post("/create-instance", async (req, res) => {
  const release = await instanceMutex.acquire(); // Mutex로 동시성 제어
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ success: false, message: "필수 파라미터 누락" });
    }

    // ✅ 기존 실행 중인 인스턴스를 확인
    if (activeInstances.has(userId)) {
      console.log(`User ${userId} already has an active instance.`);
      return res.json({
        success: true,
        message: "기존 실행 중인 인스턴스로 연결합니다.",
        ...activeInstances.get(userId),
      });
    }

    // ✅ 새로운 인스턴스를 생성
    const instanceName = `practice-${userId}-${Date.now()}`.toLowerCase();
    let startupScript = `
#! /bin/bash
apt-get update
apt-get install -y docker.io
systemctl start docker
`;

    if (courseId === 'docker') {
      startupScript += `
docker pull your-docker-image-for-docker-lab
docker run -d --name docker-lab your-docker-image-for-docker-lab
`;
    } else if (courseId === 'jenkins') {
      startupScript += `
docker pull your-jenkins-image
docker run -d --name jenkins-lab your-jenkins-image
`;
    }

    const authClient = await auth.getClient();
    const config = {
      auth: authClient,
      project: projectId,
      zone: ZONE,
      requestBody: {
        name: instanceName,
        machineType: `zones/${ZONE}/machineTypes/${MACHINE_TYPE}`,
        disks: [
          {
            boot: true,
            autoDelete: true,
            initializeParams: {
              sourceImage: "projects/ubuntu-os-cloud/global/images/ubuntu-2204-jammy-v20250128",
              diskSizeGb: 20,
            },
          },
        ],
        networkInterfaces: [
          {
            network: 'global/networks/default',
            accessConfigs: [{ type: 'ONE_TO_ONE_NAT', name: 'External NAT' }],
          },
        ],
        metadata: { items: [{ key: 'startup-script', value: startupScript }] },
        tags: { items: ['practice-instance', courseId] },
      },
    };

    console.log(`Creating instance: ${instanceName}`);
    
    // Google Cloud API 호출 및 응답 처리
    const operation = await compute.instances.insert(config);
    await operation.data; // Insert 작업 완료 대기

    const instanceResponse = await compute.instances.get({
      project: projectId,
      zone: ZONE,
      instance: instanceName,
    });

    const externalIP = instanceResponse.data.networkInterfaces[0].accessConfigs[0].natIP;

    // ✅ activeInstances에 추가
    activeInstances.set(userId, { instanceName, externalIP, courseId, createdAt: new Date() });

    // Socket.IO를 통해 클라이언트에게 알림 전송
    req.app.get('io').to(instanceName).emit('instanceCreated', { externalIP, instanceId: instanceName });

    res.json({ success: true, message: "새로운 인스턴스를 생성했습니다.", externalIP, instanceId: instanceName });
  } catch (error) {
    console.error("Instance creation error:", error);
    res.status(500).json({ success: false, message: "인스턴스 생성 오류", error });
  } finally {
    release(); // Mutex 해제 보장
  }
});
// 인스턴스 삭제 함수
async function deleteInstance(instanceName, userId) {
  try {
    const authClient = await auth.getClient();
    compute.auth = authClient;

    const deleteOperation = await compute.instances.delete({
      project: projectId,
      zone: ZONE,
      instance: instanceName,
    });

    await deleteOperation.promise();

    console.log(`Instance ${instanceName} deleted successfully.`);

    // 삭제된 시간 기록
    deletedInstances.set(userId, { deletedAt: new Date() });
  } catch (error) {
    console.error("Error deleting instance:", error);
  }
}

// 주기적으로 오래된 인스턴스를 삭제하는 스케줄 추가
setInterval(() => {
  activeInstances.forEach(async ({ instanceName, createdAt }, userId) => {
    const now = new Date();
    const elapsedHours = (now - createdAt) / (1000 * 60 * 60);

    if (elapsedHours >= 8) { // 8시간 이상 경과 시 삭제
      await deleteInstance(instanceName, userId);
      activeInstances.delete(userId);
      console.log(`Instance ${instanceName} for user ${userId} deleted after ${elapsedHours} hours.`);
    }
  });
}, 60 * 60 * 1000); // 매 시간마다 확인

module.exports = router;
