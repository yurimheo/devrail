const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false, message: "로그인이 필요합니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // ✅ 특정 경로에서만 로그 출력 (예: /api/auth/user-info)
    if (req.path === "/api/auth/user-info") {
      console.log("🔍 인증된 사용자:", req.user);
    }

    next();
  } catch (error) {
    return res.status(401).json({ authenticated: false, message: "유효하지 않은 토큰입니다." });
  }
};

module.exports = authMiddleware;
