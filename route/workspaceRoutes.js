const express = require("express")
const router = express.Router()
const { Container } = require("@google-cloud/container")
const { GoogleAuth } = require("google-auth-library")

const containerClient = new Container()
const auth = new GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
})

const projectId = process.env.GOOGLE_CLOUD_PROJECT
const zone = process.env.GOOGLE_CLOUD_ZONE

// GKE 클러스터 생성 (기업 사용자용 워크스페이스)
router.post("/create-workspace", async (req, res) => {
  try {
    const { companyId, clusterName, nodeCount, machineType } = req.body

    const [operation] = await containerClient.createCluster({
      projectId,
      zone,
      cluster: {
        name: `workspace-${companyId}`,
        nodePools: [
          {
            name: "default-pool",
            initialNodeCount: nodeCount || 3,
            config: {
              machineType: machineType || "e2-medium",
            },
          },
        ],
      },
    })

    console.log(`워크스페이스 생성 중: ${clusterName}`)
    await operation.promise()

    res.json({ success: true, message: "워크스페이스가 성공적으로 생성되었습니다." })
  } catch (error) {
    console.error("워크스페이스 생성 오류:", error)
    res.status(500).json({ success: false, message: "워크스페이스 생성 중 오류가 발생했습니다.", error: error.message })
  }
})

// 워크스페이스 정보 조회
router.get("/workspace-info/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params
    const [clusters] = await containerClient.listClusters({ projectId, zone })
    const workspace = clusters.find((cluster) => cluster.name === `workspace-${companyId}`)

    if (workspace) {
      res.json({ success: true, workspace })
    } else {
      res.status(404).json({ success: false, message: "워크스페이스를 찾을 수 없습니다." })
    }
  } catch (error) {
    console.error("워크스페이스 정보 조회 오류:", error)
    res
      .status(500)
      .json({ success: false, message: "워크스페이스 정보 조회 중 오류가 발생했습니다.", error: error.message })
  }
})

// 워크스페이스 리소스 업데이트
router.put("/update-workspace/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params
    const { nodeCount, machineType } = req.body

    const [operation] = await containerClient.updateCluster({
      projectId,
      zone,
      clusterId: `workspace-${companyId}`,
      update: {
        desiredNodeCount: nodeCount,
        desiredNodePoolId: "default-pool",
        desiredNodePoolAutoscaling: null,
      },
    })

    console.log(`워크스페이스 업데이트 중: workspace-${companyId}`)
    await operation.promise()

    res.json({ success: true, message: "워크스페이스가 성공적으로 업데이트되었습니다." })
  } catch (error) {
    console.error("워크스페이스 업데이트 오류:", error)
    res
      .status(500)
      .json({ success: false, message: "워크스페이스 업데이트 중 오류가 발생했습니다.", error: error.message })
  }
})

// 사용자 Pod 생성 (기업 사용자의 개별 사용자용)
router.post("/create-user-pod", async (req, res) => {
  try {
    const { companyId, userId, courseId } = req.body

    // 여기서 Kubernetes API를 사용하여 사용자별 Pod를 생성합니다.
    // 실제 구현은 Kubernetes 클라이언트 라이브러리를 사용해야 합니다.

    console.log(`사용자 Pod 생성: 회사 ${companyId}, 사용자 ${userId}, 과정 ${courseId}`)

    res.json({ success: true, message: "사용자 Pod가 생성되었습니다." })
  } catch (error) {
    console.error("사용자 Pod 생성 오류:", error)
    res.status(500).json({ success: false, message: "사용자 Pod 생성 중 오류가 발생했습니다.", error: error.message })
  }
})

// 워크스페이스 삭제
router.delete("/delete-workspace/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params

    const [operation] = await containerClient.deleteCluster({
      projectId,
      zone,
      clusterId: `workspace-${companyId}`,
    })

    console.log(`워크스페이스 삭제 중: workspace-${companyId}`)
    await operation.promise()

    res.json({ success: true, message: "워크스페이스가 성공적으로 삭제되었습니다." })
  } catch (error) {
    console.error("워크스페이스 삭제 오류:", error)
    res.status(500).json({ success: false, message: "워크스페이스 삭제 중 오류가 발생했습니다.", error: error.message })
  }
})

module.exports = router

