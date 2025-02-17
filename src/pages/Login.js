import React, { useState, useEffect, useRef } from "react"; // ✅ import 정리
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const kakaoInitialized = useRef(false); 
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY;
  
  useEffect(() => {
    if (kakaoInitialized.current) return; // ✅ 한 번만 실행되도록 설정
    kakaoInitialized.current = true;

    if (!KAKAO_JS_KEY) {
      console.error("❌ REACT_APP_KAKAO_JS_KEY 환경 변수가 설정되지 않았습니다.");
      return;
    }

    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JS_KEY);
          console.log("✅ Kakao SDK initialized:", window.Kakao.isInitialized());
        }
      };
      document.body.appendChild(script);
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
      console.log("✅ Kakao SDK initialized:", window.Kakao.isInitialized());
    }
  }, [KAKAO_JS_KEY]); // ✅ ESLint 경고 해결
 // ✅ ESLint 경고 해결 (필요한 의존성 추가)
  

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    setLoading(true);
    console.log("🔍 로그인 요청:", { email, password });
    console.log("🔍 요청 URL:", `${API_URL}/auth/login`);

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("✅ 로그인 성공 응답:", response.data);
      setUser(response.data.user);
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      console.error("❌ 로그인 요청 실패:", err);
      setError(err.response?.data?.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    if (!window.Kakao || !window.Kakao.Auth) {
      console.error("❌ Kakao SDK가 로드되지 않았습니다.");
      alert("Kakao SDK가 로드되지 않았습니다. 페이지를 새로고침하세요.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      console.error("❌ Kakao SDK가 초기화되지 않았습니다.");
      alert("Kakao SDK가 초기화되지 않았습니다. 페이지를 새로고침하세요.");
      return;
    }

    window.Kakao.Auth.login({
      success: async (authObj) => {
        console.log("✅ 카카오 로그인 성공:", authObj);

        try {
          const res = await window.Kakao.API.request({ url: "/v2/user/me" });
          console.log("✅ 카카오 사용자 정보:", res);

          const userData = {
            name: res.properties?.nickname || "카카오 유저",
            email: res.kakao_account?.email,
            provider: "kakao",
          };

          const response = await axios.post(`${API_URL}/auth/social-login`, userData, {
            withCredentials: true,
          });

          console.log("✅ 카카오 로그인 응답:", response.data);
          setUser(response.data.user);
          alert("카카오 로그인 성공!");
          navigate("/");
        } catch (error) {
          console.error("❌ 카카오 사용자 정보 요청 실패:", error);
        }
      },
      fail: (err) => {
        console.error("❌ 카카오 로그인 실패:", err);
      },
    });
  };

  const handleGoogleLogin = async () => {
    try {
      window.open(`${API_URL}/auth/google-login`, "_self");
    } catch (error) {
      console.error("구글 로그인 오류:", error);
    }
  };

  return (
    <div className="w-full mx-auto pt-2 pb-16 flex justify-center bg-white">
      <div className="container p-8 bg-white flex justify-center">
        <div className="w-11/12 max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

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

          <div className="mb-6 relative">
            <label className="block text-sm font-medium mb-2">비밀번호</label>
            <input
              type={showPassword ? "text" : "password"}
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

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button onClick={handleLogin} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-blue-600" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>

          {/* ✅ 회원가입 버튼 추가 */}
          <div className="text-center mt-4">
            <p className="text-sm">
              계정이 없으신가요?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                회원가입하기
              </span>
            </p>
          </div>

          <div className="mt-8">
            <hr className="border-t border-gray-300 mb-4" />
            <p className="text-center text-sm text-gray-500">간편 로그인</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button onClick={handleKakaoLogin} className="bg-yellow-400 rounded-full p-3 shadow-md">
                <RiKakaoTalkFill size={24} />
              </button>
              <button onClick={handleGoogleLogin} className="bg-white border rounded-full p-3 shadow-md">
                <FcGoogle size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
