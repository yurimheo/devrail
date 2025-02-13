const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
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
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5001", "http://localhost:5002"],
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5000;

// ✅ CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5001"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ 요청 크기 제한 조정 (431 에러 방지)
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

// ✅ API 엔드포인트 추가
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/practice", practiceRoutes);

// Socket.IO 연결 처리
io.on('connection', (socket) => {
  console.log('새로운 Socket.IO 클라이언트 연결됨');

  socket.on('join', (instanceId) => {
    socket.join(instanceId);
    console.log(`클라이언트가 인스턴스 ${instanceId}에 참여함`);
  });

  socket.on('disconnect', () => {
    console.log('Socket.IO 클라이언트 연결 해제됨');
  });
});

// ✅ 데이터베이스 연결 확인
db.sequelize
  .sync()
  .then(() => console.log("✅ 데이터베이스 연결 성공!"))
  .catch((err) => console.error("❌ 데이터베이스 연결 실패:", err));

server.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});

module.exports = { app, io };