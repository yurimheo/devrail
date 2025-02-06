import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api';
import { useUser } from '../context/UserContext';

export default function Header() {
  const { user, setUser } = useUser();
  const [isHovering, setIsHovering] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/pricing', label: '승차권', hoverLabel: '요금' },
    { path: '/courses', label: '노선도', hoverLabel: '학습 소개' },
    { path: '/practice', label: '탑승', hoverLabel: '실습실' },
    { path: '/about', label: '기관실', hoverLabel: '팀 소개' },
  ];

  // ✅ 로그아웃 처리
  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null); // ✅ 즉시 상태 반영
      navigate('/login');
    } catch (err) {
      console.error('❌ 로그아웃 실패:', err);
    }
  };

  return (
    <header className="bg-white py-8 shadow-sm">
      <div className="container mx-auto px-8 text-center">
        <div className="mb-6">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="DevRail Logo"
              className="mx-auto"
              style={{ width: '400px', height: 'auto' }}
            />
          </Link>
        </div>

        <nav className="flex justify-center space-x-8 items-center">
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={index}
                to={item.path}
                className={`text-xl font-medium transition-all duration-300 ease-in-out px-4 py-2 ${
                  isHovering === index
                    ? 'text-blue-500 scale-105'
                    : isActive
                      ? 'font-bold text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-500 hover:scale-105'
                }`}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                style={{
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                {isHovering === index ? item.hoverLabel : item.label}
              </Link>
            );
          })}

          {/* ✅ 로그인 상태 확인 후 버튼 표시 */}
          {user?.id ? (
            <div className="flex space-x-6 items-center ml-6">
              <span className="text-gray-800 font-semibold">
                {user.email}님
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-red-600 transition-all duration-300"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`text-xl font-medium transition-all duration-300 ease-in-out px-4 py-2 ${
                location.pathname === '/login'
                  ? 'font-bold text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-500 hover:scale-105'
              }`}
            >
              승객 확인/등록
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
