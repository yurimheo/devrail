import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 이메일 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 비밀번호 정규식 (숫자, 문자, 특수문자 포함, 최소 5자)
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

  // 회원가입 처리
  const handleRegister = () => {
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('비밀번호는 최소 5자 이상, 숫자, 문자, 특수문자를 포함해야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 성공 로직
    alert(`회원가입 완료: ${name}, ${email}`);
    navigate('/login');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100">
      <div className="w-11/12 max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

        {/* 이름 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            placeholder="이름 입력"
          />
        </div>

        {/* 이메일 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              email && !emailRegex.test(email) ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="이메일 입력"
          />
          {email && !emailRegex.test(email) && (
            <p className="text-red-500 text-sm mt-1">유효한 이메일 주소를 입력하세요.</p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              password && !passwordRegex.test(password) ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="비밀번호 입력"
          />
          {password && (
            <p className={`text-sm mt-1 ${passwordRegex.test(password) ? 'text-green-500' : 'text-red-500'}`}>
              비밀번호는 최소 5자 이상, 숫자, 문자, 특수문자를 포함해야 합니다.
            </p>
          )}
        </div>

        {/* 비밀번호 확인 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            placeholder="비밀번호 확인 입력"
          />
        </div>

        {/* 오류 메시지 */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* 회원가입 버튼 */}
        <button
          onClick={handleRegister}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-green-600"
        >
          회원가입
        </button>

        {/* 로그인 페이지로 이동 */}
        <div className="text-center mt-4">
          <p className="text-sm">
            이미 계정이 있으신가요?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-green-500 cursor-pointer hover:underline"
            >
              로그인하기
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
