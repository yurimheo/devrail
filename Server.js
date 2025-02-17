const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Sequelize DB 연결
const db = require("./models");

// ✅ 미들웨어 가져오기
const authMiddleware = require("./middleware/authMiddleware");

// ✅ 라우트 가져오기
const authRoutes = require("./route/authRoutes");
const userRoutes = require("./route/userRoutes");
const paymentRoutes = require("./route/paymentRoutes");
const planRoutes = require("./route/planRoutes");
const kakaoAuthRoutes = require("./route/kakaoAuthRoutes");

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS 설정
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5001", "http://localhost:5000"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ✅ 로그인 없이 접근 가능한 API
app.use("/api/auth", authRoutes);
app.use("/api/kakao", kakaoAuthRoutes);

// ✅ 인증이 필요한 API
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/payments", authMiddleware, paymentRoutes);
app.use("/api/plans", authMiddleware, planRoutes);

// ✅ 데이터베이스 연결 확인
db.sequelize.sync()
  .then(() => console.log("✅ 데이터베이스 연결 성공!"))
  .catch(err => console.error("❌ 데이터베이스 연결 실패:", err));

app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});
