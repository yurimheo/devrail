import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { FiLogIn, FiTrash2, FiInfo } from 'react-icons/fi'; // 로그인, 삭제, 정보 아이콘

// 💠 학습 코스 데이터
import { courses } from '../data/courses';

// 💠 과목 아이콘 컴포넌트
import CourseIcons from '../components/CourseIcons';

export default function PracticePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // 💥임시 유형 여부 판단 함수
  const [isCompanyUser, setIsCompanyUser] = useState(false); // 개인/기업 유저 유형 여부
  const [hasWorkspace, setHasWorkspace] = useState(false); // 워크스페이스 존재 여부

  // 💠 현재 코스 찾기
  const selectedCourse = courses.find((c) => c.id === courseId);

  // 잘못된 코스거나 비활성화면 → 첫 번째 활성 코스로 이동
  useEffect(() => {
    if (!selectedCourse || selectedCourse.isDisabled) {
      const firstEnabled = courses.find((c) => !c.isDisabled);
      if (firstEnabled) {
        navigate(`/practice/${firstEnabled.id}`, { replace: true });
      }
    }
  }, [selectedCourse, navigate]);

  // 💠 DAY 목록
  const outlineData = useMemo(
    () => selectedCourse?.outline || [],
    [selectedCourse],
  );

  // 🔹 `useState` 를 사용하여 현재 펼쳐진 DAY 인덱스를 관리
  // expandedDayIndex -> 현재 펼쳐져 있는 DAY의 index를 저장하는 상태 변수
  // setExpandedDayIndex → 상태를 변경하는 함수
  const [expandedDayIndex, setExpandedDayIndex] = useState(0);

  // 🔹 코스(과목)가 바뀔 때마다 DAY1만 펼치도록 재설정
  useEffect(() => {
    if (outlineData.length > 0) {
      setExpandedDayIndex(0);
    }
  }, [outlineData]);

  // 💠 과목 아이콘 클릭
  const handleSelectCourse = (clickedId) => {
    const target = courses.find((c) => c.id === clickedId);
    if (target && !target.isDisabled) {
      navigate(`/practice/${clickedId}`);
    }
  };

  // 🔹 DAY 클릭 시 하나만 펼쳐지도록 하기
  const handleDayClick = (index) => {
    setExpandedDayIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className=" min-h-screen">
      <div className="w-full mx-auto pt-2 pb-16 flex justify-center bg-white">
        <div className="container p-8 bg-white ">
          {/* 💥임시 판단을 위한 고정 버튼 (유저 상태 변경) */}
          <div className="fixed top-1/2 right-5 transform -translate-y-1/2">
            <button
              onClick={() => setIsCompanyUser((prev) => !prev)}
              className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
            >
              {isCompanyUser ? '기업 유저' : '개인 유저'}
            </button>

            {isCompanyUser && (
              <button
                onClick={() => setHasWorkspace((prev) => !prev)}
                className="bg-gray-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-500 transition"
              >
                {hasWorkspace ? '워크스페이스 삭제' : '워크스페이스 생성'}
              </button>
            )}
          </div>

          {/* 상단: 과목 아이콘 */}
          <CourseIcons
            courses={courses}
            selectedCourse={selectedCourse?.id}
            onSelectCourse={handleSelectCourse}
          />

          {/* 💚 워크스페이스 배너 💚 */}
          <div className="mt-10 px-4 md:px-24">
            <div
              className={`rounded-xl shadow-sm border overflow-hidden transition-all duration-500
    ${
      isCompanyUser
        ? hasWorkspace
          ? 'bg-gradient-to-br from-purple-100 to-blue-100' // ✅ 기업 - 워크스페이스 생성 후
          : 'bg-gradient-to-br from-blue-100 to-pink-50' // ✅ 기업 - 워크스페이스 생성 전
        : 'bg-gray-100 ' // ✅ 개인 유저
    }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
                <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                  {/* 제목 애니메이션 */}
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-3xl font-bold text-gray-800 mb-2"
                  >
                    {isCompanyUser
                      ? hasWorkspace
                        ? '워크스페이스 연결 완료! 팀과 함께하세요.'
                        : '지금, 우리 팀을 위한 워크스페이스를 생성하세요!'
                      : '엔터프라이즈 전용 기능, 워크스페이스!'}
                  </motion.h2>

                  {/* 설명 애니메이션 */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-gray-600 max-w-3xl"
                  >
                    {isCompanyUser
                      ? hasWorkspace
                        ? '당신의 팀에 맞게 최적화된 공간! 워크스페이스를 구축하고 맞춤형 협업 환경을 만들어보세요.'
                        : '지금 바로 워크스페이스를 생성하고 팀의 생산성을 극대화하세요. 효율적인 협업 환경을 구축할 수 있습니다.'
                      : '새로운 차원의 협업을 경험하세요! 엔터프라이즈 워크스페이스에서 팀과 함께 더 스마트하게 일하세요.'}
                  </motion.p>
                </div>

                {/* 버튼 표시 분기 */}
                {isCompanyUser ? (
                  hasWorkspace ? (
                    // ✅ 기업 유저 & 워크스페이스가 존재하는 경우 → "워크스페이스 들어가기 / 삭제하기" 버튼 표시
                    <div className="flex-shrink-0 flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gradient-to-br from-purple-400 to-blue-300 hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-300 text-white px-6 py-3 rounded-full transition shadow-md hover:shadow-lg"
                      >
                        <FiLogIn className="w-5 h-5" />{' '}
                        {/* 워크스페이스 들어가기 아이콘 */}
                        워크스페이스 들어가기
                      </motion.button>
                      <motion.button
                        onClick={() => setHasWorkspace(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-full transition shadow-md hover:shadow-lg"
                      >
                        <FiTrash2 className="w-5 h-5" /> {/* 삭제 아이콘 */}
                        삭제하기
                      </motion.button>
                    </div>
                  ) : (
                    // ✅ 기업 유저 & 워크스페이스가 없는 경우 → 기존 "새 워크스페이스" 버튼 표시
                    <div className="flex-shrink-0">
                      <motion.button
                        onClick={() => setHasWorkspace(true)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center bg-gradient-to-br from-pink-400 to-blue-200 hover:bg-gradient-to-br hover:from-pink-500 hover:to-blue-300 text-white px-6 py-3 rounded-full transition shadow-md hover:shadow-lg"
                      >
                        <PlusCircle className="mr-2 h-5 w-5" /> 새 워크스페이스
                      </motion.button>
                    </div>
                  )
                ) : (
                  // ✅ 개인 유저일 때 "워크스페이스에 대해 알아보기" 버튼 표시
                  <div className="flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-full transition shadow-md hover:shadow-lg"
                      onClick={() => navigate('/workspaces/info')}
                    >
                      <FiInfo className="w-5 h-5" /> {/* 정보 아이콘 */}
                      워크스페이스에 대해 알아보기
                    </motion.button>
                  </div>
                )}
              </div>

              {/* 색상 변화하는 애니메이션 바 */}
              <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animated-gradient-bar"></div>
            </div>
          </div>

          {/* 선택된 코스 정보 */}
          {selectedCourse && !selectedCourse.isDisabled && (
            <div className="text-center mt-10 ">
              <motion.h1
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {selectedCourse.name}
              </motion.h1>
              <motion.p
                className="text-sm text-gray-600 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {selectedCourse.description}
              </motion.p>
            </div>
          )}
          <div className="px-24">
            <hr className="my-6" />
          </div>

          {/* DAY 목록 렌더링 */}
          <div className="space-y-4 px-24">
            {outlineData.map((dayItem, index) => {
              const isOpen = expandedDayIndex === index;

              return (
                <div
                  key={index}
                  className="flex items-center bg-white overflow-hidden h-14"
                >
                  {/* DAY n*/}
                  <div
                    className="w-2/6 flex items-center justify-between px-4 border rounded-md shadow bg-gray-100 overflow-hidden h-14 pl-8 pr-6 cursor-pointer"
                    onClick={() => handleDayClick(index)}
                  >
                    <div>
                      <span className="font-bold text-blue-600">
                        DAY {dayItem.day}&nbsp;&nbsp;
                      </span>
                      <span className="font-semibold text-gray-800 whitespace-nowrap">
                        |&nbsp;&nbsp;{dayItem.title}&nbsp;
                      </span>
                    </div>

                    {/* 펼치기 및 접기 버튼 */}
                    <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-700">
                      {isOpen ? '<' : '>'}
                    </div>
                  </div>

                  {/* 슬라이드 영역 */}
                  <AnimatePresence mode="sync">
                    {isOpen && (
                      <motion.div
                        key="slide"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 800, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center bg-white h-full overflow-hidden"
                        style={{ height: '56px' }}
                      >
                        <div className="px-4 flex items-center gap-3 w-full">
                          <span className="text-gray-600 text-sm truncate">
                            {dayItem.description}
                          </span>
                          <button className="ml-auto bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 text-sm">
                            시작하기
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
