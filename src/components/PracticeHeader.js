// 🧶 PracticeHeader 컴포넌트
// ✔ 실습 화면 상단 헤더
// ✔ 과목 정보, 뒤로 가기, Day 이동, 햄버거 메뉴 포함
// ✔ 로그인 상태에 따라 메뉴 옵션 변경

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeftCircle,
  FiMenu,
  FiX,
  FiBook,
  FiArrowRightCircle,
  FiCreditCard,
  FiBookOpen,
  FiTool,
  FiLogIn,
  FiLogOut,
} from 'react-icons/fi';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function PracticeHeader({ course, currentDay }) {
  // 💠 네비게이션 및 상태 관리
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 📌 로그아웃 함수
  const handleLogout = () => {
    logout();
    toast.success('로그아웃 되었습니다.');
    navigate('/');
  };

  // 📌 다음 Day로 이동 함수
  const handleDayChange = () => {
    if (!course || !currentDay) return;

    const newDay = currentDay.day + 1;

    // ✅ 과목 내에서 유효한 Day인지 확인
    const isValidDay = course?.outline.some((o) => o.day === newDay);

    if (isValidDay) {
      navigate(`/practice/${course.id}/day/${newDay}`);
    }
  };

  return (
    // 📦 전체 컨테이너 🔽
    <header className="bg-gradient-to-b from-black via-gray-900 to-black text-white flex justify-between items-center px-6 py-4 shadow-lg">
      {/* 📟 좌측 컨테이너 🔽 */}
      <div className="flex justify-start">
        {/* 🔙 뒤로 가기 버튼 */}
        <button
          onClick={() => navigate(`/practice/${course?.id}`)}
          className="text-white text-2xl hover:text-blue-400 transition-transform hover:scale-110 pr-1"
        >
          <FiArrowLeftCircle />
        </button>

        {/* 🎯 로고 버튼 */}
        <motion.div
          className="flex items-center cursor-pointer hover:opacity-80 transition p-2 mr-2 shadow-md"
          onClick={() => navigate('/')}
        >
          <img
            src="/images/logo.png"
            alt="DEVRAIL Logo"
            className="h-10 invert hover:brightness-110 transition duration-200"
          />
        </motion.div>

        {/* 📃 과목명 및 진행 상태 */}
        <div className="text-center flex items-center gap-3 bg-gray-900 border border-white/20 rounded-lg px-4 py-2 shadow-md">
          <FiBook className="text-blue-300 w-6 h-6" />
          <h2 className="text-lg font-bold text-blue-300">
            {course?.name}
            <span className="text-white font-normal">
              &nbsp; &gt; Day {currentDay?.day}
            </span>
            <span className="text-gray-300 font-light">
              &nbsp;| {currentDay?.title}
            </span>
          </h2>
        </div>

        {/* 🔹 다음 Day 이동 버튼 */}
        <div className="relative group flex items-center ml-3">
          <button
            onClick={() => {
              if (!course?.outline.some((o) => o.day === currentDay?.day + 1)) {
                toast.warn('마지막 Day입니다. 더 이상 진행할 수 없습니다.');
                return;
              }
              handleDayChange();
            }}
            className="text-white text-2xl hover:text-blue-400 transition-transform hover:scale-110"
          >
            <FiArrowRightCircle />
          </button>

          {/* 🗨️ 툴팁 (말풍선) */}
          <div className="top-10 right-3 -translate-x-1/2 bg-white text-black text-xs font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg whitespace-nowrap relative">
            다음 일차 학습을 진행하려면 클릭하세요!
            {/* 🔻 말풍선 아래쪽 화살표 */}
            <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-white"></div>
          </div>
        </div>
      </div>
      {/* 📟 좌측 컨테이너 🔼 */}

      {/* 📟 우측 햄버거 메뉴 🔽 */}
      <div className="relative">
        {/* ☰ 메뉴 버튼 */}
        <button
          className="text-white text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* 📃 드롭다운 메뉴 */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute right-0 mt-4 w-64 bg-gray-900/85 backdrop-blur-2xl border border-gray-700/40 hover:border-gray-500/70 rounded-xl shadow-lg hover:shadow-2xl py-6 px-7 z-50 divide-y divide-gray-700/50 transition-all transform translate-y-1 hover:translate-y-0 hover:scale-105 duration-300"
            style={{
              borderRadius: '16px',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <ul className="text-white space-y-4">
              {/* 🚂 승차권 구매 */}
              <li>
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 transition-all"
                >
                  <FiCreditCard className="w-5 h-5 text-yellow-400" /> 승차권
                  구매
                </button>
              </li>

              {/* 📖 학습 소개 */}
              <li>
                <button
                  onClick={() => navigate('/courses')}
                  className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 transition-all"
                >
                  <FiBookOpen className="w-5 h-5 text-blue-400" /> 학습 소개
                </button>
              </li>

              {/* 🛠️ 실습실 */}
              <li>
                <button
                  onClick={() => navigate(`/practice/${course?.id}`)}
                  className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 transition-all"
                >
                  <FiTool className="w-5 h-5 text-green-400" /> 실습실
                </button>
              </li>

              {/* 🔑 로그인 / 로그아웃 */}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/30 hover:scale-105 transition-all"
                  >
                    <FiLogOut className="w-5 h-5" /> 로그아웃
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 transition-all"
                  >
                    <FiLogIn className="w-5 h-5 text-gray-400" /> 로그인
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </div>
      {/* 📟 우측 햄버거 메뉴 🔼 */}
    </header>
    // 📦 전체 컨테이너 🔼
  );
}
