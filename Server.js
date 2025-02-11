const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Sequelize DB 연결
const db = require("./models");

// ✅ 라우트 가져오기
const authRoutes = require("./route/authRoutes");
const userRoutes = require("./route/userRoutes");
const paymentRoutes = require("./route/paymentRoutes");
const planRoutes = require("./route/planRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5001", "http://localhost:5000"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ✅ API 엔드포인트 추가
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/plans", planRoutes); // ✅ 수정: "/api/plans"로 명확히 등록
app.use("/api/payment", paymentRoutes); 

// ✅ 데이터베이스 연결 확인
db.sequelize.sync()
  .then(() => console.log("✅ 데이터베이스 연결 성공!"))
  .catch(err => console.error("❌ 데이터베이스 연결 실패:", err));

app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});
