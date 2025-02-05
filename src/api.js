// 📌 src/api.js (또는 src/api/index.js)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // 백엔드 URL에 맞게 수정하세요.
  withCredentials: true, // 쿠키 포함 여부
});

export default api;
