import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // React Router Link 사용

export default function Header() {
  const [isHoveringPricing, setIsHoveringPricing] = useState(false);
  const [isHoveringCourses, setIsHoveringCourses] = useState(false);
  const [isHoveringPractices, setIsHoveringPractices] = useState(false);
  const [isHoveringEnterprises, setIsHoveringEnterprises] = useState(false);
  const [isHoveringLogins, setIsHoveringLogins] = useState(false);

  return (
    <header className="bg-white shadow-sm py-8">
      <div className="container mx-auto px-4 text-center">
        {/* 로고 */}
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

        {/* 네비게이션 메뉴 */}
        <nav className="flex justify-center space-x-6">
          <Link
            to="/pricing"
            className={`text-gray-600 text-lg transition-colors duration-300 ${isHoveringPricing ? 'text-primary' : ''}`}
            onMouseEnter={() => setIsHoveringPricing(true)}
            onMouseLeave={() => setIsHoveringPricing(false)}
          >
            {isHoveringPricing ? '요금' : '승차권'}
          </Link>
          <Link
            to="/courses"
            className={`text-gray-600 text-lg transition-colors duration-300 ${isHoveringCourses ? 'text-primary' : ''}`}
            onMouseEnter={() => setIsHoveringCourses(true)}
            onMouseLeave={() => setIsHoveringCourses(false)}
          >
            {isHoveringCourses ? '학습 소개' : '노선도'}
          </Link>
          <Link
            to="/practice"
            className={`text-gray-600 text-lg transition-colors duration-300 ${isHoveringPractices ? 'text-primary' : ''}`}
            onMouseEnter={() => setIsHoveringPractices(true)}
            onMouseLeave={() => setIsHoveringPractices(false)}
          >
            {isHoveringPractices ? '실습실' : '승차'}
          </Link>
          <Link
            to="/enterprise"
            className={`text-gray-600 text-lg transition-colors duration-300 ${isHoveringEnterprises ? 'text-primary' : ''}`}
            onMouseEnter={() => setIsHoveringEnterprises(true)}
            onMouseLeave={() => setIsHoveringEnterprises(false)}
          >
            {isHoveringEnterprises ? '팀 소개' : '기관실'}
          </Link>
          <Link
            to="/login"
            className={`text-gray-600 text-lg transition-colors duration-300 font-semibold ${isHoveringLogins ? 'text-primary' : ''}`}
            onMouseEnter={() => setIsHoveringLogins(true)}
            onMouseLeave={() => setIsHoveringLogins(false)}
          >
            {isHoveringLogins ? '로그인/회원가입' : '승객 확인/등록'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
