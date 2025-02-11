const express = require("express");
const router = express.Router();

// 📌 요금제 정보 API (프론트엔드에서 '/api/plans'로 요청하기 때문에 맞춰줌)
router.get("/", async (req, res) => {
  try {
    const plans = [
      { id: "free", name: "프리티어", price: "3일 무료" },
      { id: "personal", name: "개인", price: "14,900원/월간" },
      { id: "enterprise", name: "기업", price: "4,900원/월간" }
    ];
    res.json(plans);
  } catch (error) {
    console.error("❌ 요금제 데이터 로드 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
