const express = require('express');
const router = express.Router();
const { Mutex } = require('async-mutex');
const { google } = require('googleapis');
const compute = google.compute('v1');
const { GoogleAuth } = require('google-auth-library');

const auth = new GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIAL,
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const ZONE = process.env.GOOGLE_CLOUD_ZONE;
const MACHINE_TYPE = process.env.GOOGLE_CLOUD_MACHINE_TYPE || 'e2-medium';

const instanceMutex = new Mutex();
const activeInstances = new Map();

router.post("/create-instance", async (req, res) => {
  const release = await instanceMutex.acquire();

  try {
    const { userId, courseId, subjectId, day } = req.body;
    if (!userId || !courseId) {
      return res.status(400).json({ success: false, message: "필수 파라미터 누락" });
    }

    if (activeInstances.has(userId)) {
      return res.status(400).json({ success: false, message: "이미 실행 중인 인스턴스 존재" });
    }

    const instanceName = `practice-${courseId}-${userId}-${Date.now()}`.toLowerCase();

    let startupScript = `#! /bin/bash
apt-get update
apt-get install -y docker.io
systemctl start docker
`;

    if (subjectId === 'docker') {
      startupScript += `docker pull your-docker-image-for-docker-lab
docker run -d --name docker-lab your-docker-image-for-docker-lab
`;
    } else if (subjectId === 'jenkins') {
      startupScript += `docker pull your-jenkins-image
docker run -d --name jenkins-lab your-jenkins-image
`;
    }

    const authClient = await auth.getClient();
    compute.auth = authClient;

    const config = {
      project: projectId,
      zone: ZONE,
      requestBody: {
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
          items: [{ key: 'startup-script', value: startupScript }],
        },
        tags: { items: ['practice-instance', courseId] },
      },
    };

    console.log(`Creating instance: ${instanceName}`);
    const [operation] = await compute.instances.insert(config);

    await operation.promise();

    const [instance] = await compute.instances.get({
      project: projectId,
      zone: ZONE,
      instance: instanceName,
    });
    const externalIP = instance.networkInterfaces[0].accessConfigs[0].natIP;

    activeInstances.set(userId, { instanceName, externalIP, courseId, createdAt: new Date() });

    // Socket.IO를 통해 클라이언트에게 알림
    req.app.get('io').to(instanceName).emit('instanceCreated', { externalIP, instanceId: instanceName });

    res.json({ success: true, message: "인스턴스 생성 완료", externalIP, instanceId: instanceName });

  } catch (error) {
    console.error("Instance creation error:", error);
    res.status(500).json({ success: false, message: "인스턴스 생성 오류", error: error.message });
  } finally {
    release();
  }
});

async function deleteInstance(instanceName) {
  try {
    const authClient = await auth.getClient();
    compute.auth = authClient;

    const deleteOperation = await compute.instances.delete({
      project: projectId,
      zone: ZONE,
      instance: instanceName,
    });
    await deleteOperation.promise();
    console.log(`Instance ${instanceName} deleted successfully after 8 hours.`);
  } catch (error) {
    console.error("Error deleting instance:", error);
  }
}

module.exports = router;