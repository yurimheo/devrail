import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrain } from "react-icons/fa";

export default function Header() {
  const [isHovering, setIsHovering] = useState(null);
  const location = useLocation();

  const menuItems = [
    { path: "/pricing", label: "승차권", hoverLabel: "요금" },
    { path: "/courses", label: "노선도", hoverLabel: "학습 소개" },
    { path: "/practice", label: "탑승", hoverLabel: "실습실" },
    { path: "/about", label: "기관실", hoverLabel: "팀 소개" },
    { path: "/login", label: "승객 확인/등록", hoverLabel: "로그인/회원가입" },
  ];

  return (
    <header className="bg-white py-8 shadow-sm">
      <div className="container mx-auto px-8 text-center">
        {/* 로고 */}
        <div className="mb-6">
          <Link to="/">
            <img
              src="/logo.png"
              alt="DevRail Logo"
              className="mx-auto"
              style={{ width: "400px", height: "auto" }}
            />
          </Link>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex justify-center space-x-6">
          {menuItems.map((item, index) => {
            // 현재 페이지가 활성화된 메뉴와 일치하거나, `/practice`로 시작하면 활성화
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={index}
                to={item.path}
                className={`text-lg transition-colors duration-300 ${
                  isHovering === index
                    ? "text-blue-500"
                    : isActive
                    ? "font-bold text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-600"
                }`}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                style={{
                  paddingBottom: isActive ? "4px" : "0",
                  transition: "all 0.3s ease",
                }}
              >
                {isHovering === index ? item.hoverLabel : item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
