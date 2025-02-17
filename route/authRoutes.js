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
      login_provider: "devrail", // ✅ 기본 로그인은 devrail
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

    // ✅ JWT 토큰 생성
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1시간
    });

    res.status(200).json({
      message: "로그인 성공!",
      user: { user_id: user.user_id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("❌ 로그인 중 오류 발생:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// ✅ 소셜 로그인 (카카오 & 구글)
router.post("/social-login", async (req, res) => {
  try {
    const { email, name, provider } = req.body;

    if (!email || !name || !provider) {
      return res.status(400).json({ message: "필수 정보가 누락되었습니다." });
    }

    // ✅ DB에서 사용자 조회
    let user = await User.findOne({ where: { email } });

    // ✅ 없으면 자동 회원가입
    if (!user) {
      console.log("🔹 새로운 소셜 로그인 유저 등록:", email);
      user = await User.create({
        name,
        email,
        role: "free", // ✅ 기본값 추가
        login_provider: provider, // "kakao" 또는 "google"
        password: null, // ✅ 비밀번호 없이 회원가입 가능하도록 설정
      });
    }

    // ✅ JWT 발급
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    // ✅ 쿠키에 저장 (클라이언트에서 요청 가능)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1시간 유지
    });

    console.log("✅ 소셜 로그인 성공:", user.email);
    return res.status(200).json({ user, message: "소셜 로그인 성공" });
  } catch (error) {
    console.error("❌ 소셜 로그인 중 오류 발생:", error);
    return res.status(500).json({ message: "서버 오류 발생", error: error.message });
  }
});

// ✅ 로그인 유지 확인 API
router.get("/check-auth", authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ authenticated: false, message: "로그인이 필요합니다." });
    }

    // ✅ 최신 유저 정보 가져오기
    const user = await User.findByPk(req.user.user_id, { attributes: ["user_id", "email", "role"] });

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
  res.clearCookie("token", { path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Lax" });
  res.status(200).json({ message: "✅ 로그아웃 완료! 쿠키 삭제됨" });
});


module.exports = router;
