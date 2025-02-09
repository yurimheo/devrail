const express = require("express");
const router = express.Router();

// ✅ DevOps 도구 목록 API
router.get("/", async (req, res) => {
    try {
        const tools = [
            { name: "Docker", description: "컨테이너 관리 도구" },
            { name: "Kubernetes", description: "컨테이너 오케스트레이션" },
            { name: "Ansible", description: "자동화 도구" },
            { name: "Jenkins", description: "CI/CD 도구" }
        ];
        res.json(tools);
    } catch (error) {
        console.error("❌ DevOps 도구 조회 오류:", error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
});

module.exports = router;
