import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth"; 

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      setError('모든 필드를 입력하세요.');
      return;
    }

    setLoading(true);
    try {
      console.log('📩 회원가입 요청 데이터:', { name, email, password, role: null, login_provider: 'devrail' });

      const response = await axios.post(
        `${API_URL}/register`,
        { name, email, password, role: null, login_provider: 'devrail' }, // ✅ 변경됨
        { headers: { "Content-Type": "application/json" } }
      );

      console.log('✅ 회원가입 응답:', response);

      if (response.status === 201) {
        setSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error('❌ 회원가입 요청 실패:', err);
      setError(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto pt-2 pb-16 flex justify-center bg-white">
      <div className="container p-8 bg-white flex justify-center">
        <div className="w-11/12 max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="이름 입력"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="이메일 입력"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="비밀번호 입력"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="비밀번호 확인 입력"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <button
            onClick={handleRegister}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading || !name || !email || !password || !confirmPassword}
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm">
              이미 계정이 있으신가요?{' '}
              <span
                onClick={() => navigate('/login')}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                로그인하기
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
