const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ 회원가입 API
router.post("/register", async (req, res) => {
  try {
    console.log("📩 회원가입 요청 도착:", req.body);
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "모든 필드를 입력하세요." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "free",
    });

    return res.status(201).json({ message: "회원가입 성공!", user: newUser });
  } catch (error) {
    console.error("❌ 회원가입 중 오류 발생:", error);
    return res.status(500).json({ message: "서버 오류가 발생했습니다.", error: error.message });
  }
});

// ✅ 로그인 API (JWT 쿠키 저장)
router.post("/login", async (req, res) => {
  try {
    console.log("📩 로그인 요청:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    // ✅ JWT 토큰 생성 (user.user_id -> user.id 로 변경)
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1시간
    });

    res.status(200).json({ message: "로그인 성공!", user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("❌ 로그인 중 오류 발생:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// ✅ 로그인 유지 확인 API (수정됨)
router.get("/check-auth", authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ authenticated: false, message: "로그인이 필요합니다." });
    }

    // ✅ DB에서 최신 유저 정보 가져오기
    const user = await User.findByPk(req.user.id, { attributes: ["id", "email", "role"] });

    if (!user) {
      return res.status(401).json({ authenticated: false, message: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({ authenticated: true, user });
  } catch (error) {
    console.error("❌ check-auth 오류:", error);
    res.status(500).json({ authenticated: false, message: "서버 오류 발생" });
  }
});

// ✅ 로그아웃 API
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.status(200).json({ message: "로그아웃 완료!" });
});

module.exports = router;
