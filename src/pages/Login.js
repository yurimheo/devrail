import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext'; // ✅ 사용자 상태 가져오기
import { FcGoogle } from 'react-icons/fc'; // Google 아이콘
import { RiKakaoTalkFill } from 'react-icons/ri'; // Kakao 아이콘
import { FiEye, FiEyeOff } from 'react-icons/fi'; // 눈 아이콘

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser(); // ✅ 로그인 후 user 업데이트

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";  // ✅ API URL 설정

  // ✅ 카카오 SDK 초기화
  const initKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('084fde43f5f66193c70ab0718973be5e'); 
      console.log('Kakao SDK initialized');
    }
  };

  useEffect(() => {
    initKakao();
  }, []);

  // ✅ 카카오 로그인 처리 함수
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK가 로드되지 않았습니다.');
      return;
    }

    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log('카카오 로그인 성공:', authObj);

        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log('사용자 정보:', res);
            alert(`카카오 로그인 성공: ${res.kakao_account.email}`);
          },
          fail: (error) => {
            console.error('사용자 정보 요청 실패:', error);
          },
        });
      },
      fail: (err) => {
        console.error('카카오 로그인 실패:', err);
      },
    });
  };

  // ✅ 일반 로그인 처리 함수
  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });

      console.log("✅ 로그인 응답:", response.data); // 전체 응답 데이터 출력

      setUser(response.data.user); // ✅ 로그인 후 user 상태 업데이트
      alert("로그인 성공!");
      navigate("/"); // 로그인 후 홈페이지로 이동
    } catch (err) {
      console.error("❌ 로그인 요청 실패:", err);
      setError(err.response?.data?.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full mx-auto pt-2 pb-16 flex justify-center bg-white">
        <div className="container p-8 bg-white flex justify-center">
          <div className="w-11/12 max-w-lg bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

            {/* 이메일 입력 */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                placeholder="이메일 입력"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium mb-2">비밀번호</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                placeholder="비밀번호 입력"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {/* 오류 메시지 */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* 로그인 버튼 */}
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>

            {/* 회원가입 버튼 */}
            <div className="text-center mt-4">
              <p className="text-sm">
                계정이 없으신가요?{' '}
                <span
                  onClick={() => navigate('/register')}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  회원가입하기
                </span>
              </p>
            </div>

            {/* 간편 로그인 */}
            <div className="mt-8">
              <hr className="border-t border-gray-300 mb-4" />
              <p className="text-center text-sm text-gray-500">간편 로그인</p>
              <div className="flex justify-center space-x-4 mt-4">
                {/* 카카오톡 로그인 버튼 */}
                <button
                  onClick={handleKakaoLogin}
                  className="bg-yellow-400 rounded-full p-3 shadow-md flex items-center space-x-2"
                >
                  <RiKakaoTalkFill size={24} />
                  <span>카카오 로그인</span>
                </button>

                {/* Google 로그인 버튼 */}
                <button className="bg-white border rounded-full p-3 shadow-md flex items-center space-x-2">
                  <FcGoogle size={24} />
                  <span>Google 로그인</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
