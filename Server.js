const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// ✅ Sequelize DB 연결
const db = require('./models');

// ✅ 미들웨어 가져오기
const authMiddleware = require('./middleware/authMiddleware');

// ✅ 라우트 가져오기
const authRoutes = require('./route/authRoutes');
const userRoutes = require('./route/userRoutes');
const paymentRoutes = require('./route/paymentRoutes');
const planRoutes = require('./route/planRoutes');
const kakaoAuthRoutes = require('./route/kakaoAuthRoutes');

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS 설정
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5001',
      'http://localhost:5000',
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// ✅ 로그인 없이 접근 가능한 API
app.use('/api/auth', authRoutes);
app.use('/api/kakao', kakaoAuthRoutes);

// ✅ 인증이 필요한 API
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/plans', authMiddleware, planRoutes);

// ✅ 데이터베이스 연결 확인
db.sequelize
  .sync()
  .then(() => console.log('✅ 데이터베이스 연결 성공!'))
  .catch((err) => console.error('❌ 데이터베이스 연결 실패:', err));

app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});

// 🔍 X-Frame-Options & CSP 헤더 수정
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOWALL'); // iframe 허용
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'self' http://localhost:3000",
  );
  next();
});

// ✅ 크롬 브라우저에서 외부 PDF 브라우저 허용
app.get('/pdfs/:workspaceId/:courseId/:fileName', (req, res) => {
  const path = require('path');
  const { workspaceId, courseId, fileName } = req.params;

  const decodedFileName = decodeURIComponent(fileName);
  const filePath = path.join(
    __dirname,
    'public',
    'pdfs',
    workspaceId,
    courseId,
    decodedFileName,
  );

  console.log(`📂 PDF 요청 경로: ${filePath}`);

  // 🛠️ 헤더 설정
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline');
  res.setHeader('X-Frame-Options', 'ALLOWALL'); // 🔹 iframe 허용
  res.setHeader('Access-Control-Allow-Origin', '*'); // 🔹 CORS 허용
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'self' http://localhost:3000",
  );

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`🚨 PDF 전송 실패: ${err.message}`);
      res.status(404).send('PDF 파일을 찾을 수 없습니다.');
    }
  });
});

// ✅ 워크스페이스 PDF 드롭다운 메뉴 데이터 가져오기
app.get('/api/workspaces/:workspaceId/:courseId/pdfs', (req, res) => {
  const { workspaceId, courseId } = req.params;
  const directoryPath = path.join(
    __dirname,
    'public',
    'pdfs',
    workspaceId,
    courseId,
  );
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('🚨 PDF 디렉토리 읽기 실패:', err);
      return res
        .status(500)
        .json({ error: 'PDF 리스트를 가져오는 중 오류 발생' });
    }
    // .pdf 파일만 필터링
    const pdfFiles = files.filter((file) => file.endsWith('.pdf'));
    res.json(pdfFiles);
  });
});
