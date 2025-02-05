const express = require('express');
const { User } = require('../models');

const router = express.Router();

// ✅ 모든 사용자 가져오기
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생", error: error.message });
  }
});

module.exports = router;  // ✅ `router`만 `export`
