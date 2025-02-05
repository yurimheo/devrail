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
              src="/logo.png"
              alt="DevRail Logo"
              className="mx-auto"
              style={{ width: '400px', height: 'auto' }}
            />
          </Link>
        </div>

        <nav className="flex justify-center space-x-6">
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={index}
                to={item.path}
                className={`text-lg transition-colors duration-300 ${
                  isHovering === index
                    ? 'text-blue-500'
                    : isActive
                      ? 'font-bold text-blue-700 border-b-2 border-blue-700'
                      : 'text-gray-600'
                }`}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                style={{
                  paddingBottom: isActive ? '4px' : '0',
                  transition: 'all 0.3s ease',
                }}
              >
                {isHovering === index ? item.hoverLabel : item.label}
              </Link>
            );
          })}

          {/* ✅ 로그인 상태 확인 후 버튼 표시 */}
          {user?.id ? (
            <div className="flex space-x-4 items-center">
              <span className="text-gray-700 font-bold">{user.email}님</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`text-lg transition-colors duration-300 ${
                location.pathname === '/login'
                  ? 'font-bold text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600'
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
