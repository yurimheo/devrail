const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// ✅ Sequelize DB 연결
const db = require("./models");

// ✅ 라우트 가져오기
const authRoutes = require("./route/authRoutes");
const userRoutes = require("./route/userRoutes");
const practiceRoutes = require("./route/practiceRoutes");

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS 설정 (여러 도메인 허용)
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5001"], // 🔥 5001 추가
  credentials: true  // ✅ 쿠키 허용
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser()); // ✅ 쿠키 파싱 미들웨어 추가

// ✅ API 엔드포인트 추가
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/practice", practiceRoutes);

// ✅ 데이터베이스 연결 확인
db.sequelize.sync()
  .then(() => console.log("✅ 데이터베이스 연결 성공!"))
  .catch(err => console.error("❌ 데이터베이스 연결 실패:", err));

app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});
