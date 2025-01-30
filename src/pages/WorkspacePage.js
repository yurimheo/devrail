import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { courses } from '../data/courses'; // 과목 데이터

export default function WorkspacePage() {
  //  ✨ 별
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      let starArray = [];
      for (let i = 0; i < 50; i++) {
        // ⭐ 별 개수 조정 가능
        starArray.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 3 + 1}px`,
          delay: `${Math.random() * 2}s`,
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  const { workspace_id } = useParams(); // `workspace_id` 가져오기
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedDayIndex, setExpandedDayIndex] = useState(null);

  useEffect(() => {
    // 💥 임시 | 유저가 선택한 과목
    const mockUserWorkspaces = {
      kangyk00: 'docker',
      kimgun99: 'kubernetes',
    };

    const courseId = mockUserWorkspaces[workspace_id];

    // ✅ courseId가 존재하는 경우, 해당하는 과목 정보 가져오기
    if (courseId) {
      const foundCourse = courses.find((c) => c.id === courseId);
      setSelectedCourse(foundCourse);
    }
  }, [workspace_id]);

  // ✅ DAY 펼치기/접기 핸들러
  const handleDayClick = (index) => {
    setExpandedDayIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!selectedCourse) {
    return (
      <div className="min-h-screen mt-16 flex items-start justify-center">
        <div className="text-lg  text-blue-500">
          <span className="font-bold">워크스페이스</span>
          <span>를 찾을 수 없습니다. （＞人＜；）</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-800 to-black py-10 px-6">
      {/* 반짝이는 별 배경 */}
      <div className="stars absolute w-full h-full overflow-hidden z-10 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <div className="relative z-20 container mx-auto border  border-gray-500 border-opacity-50 p-8 rounded-lg bg-gray-500 bg-opacity-5 shadow-lg">
        {/* 타이틀 */}
        <motion.h1
          className="text-2xl font-bold text-white text-center"
          style={{
            textShadow:
              '0 0 8px rgba(255, 235, 123, 0.8), 0 0 15px rgba(79, 131, 243, 0.6), 0 0 25px rgba(255, 247, 211, 0.4)',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {workspace_id}님의
        </motion.h1>
        <motion.h1
          className="text-5xl font-bold text-white text-center"
          style={{
            fontFamily: 'HakgyoansimByeolbichhaneulTTF-B',
            textShadow:
              '0 0 8px rgba(255, 235, 123, 0.8), 0 0 15px rgba(79, 131, 243, 0.6), 0 0 25px rgba(255, 247, 211, 0.4)',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          워크스페이스
        </motion.h1>

        {/* 선택된 과목 정보 */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-blue-600">
            {selectedCourse.name}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {selectedCourse.description}
          </p>
        </motion.div>

        <div className="px-24">
          <hr className="my-6" />
        </div>

        {/* DAY 목록 렌더링 */}
        <div className="space-y-4 px-24">
          {selectedCourse.outline.map((dayItem, index) => {
            const isOpen = expandedDayIndex === index;

            return (
              <div
                key={index}
                className="flex items-center shadow-lg shadow-blue-500/10 border-b-2 border-opacity-5 border-opacity-5 overflow-hidden h-14"
              >
                {/* DAY n */}
                <div
                  className="w-2/6 flex items-center justify-between px-4 border border-black rounded-md shadow bg-black overflow-hidden h-14 pl-8 pr-6 cursor-pointer"
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
                  <div className="bg-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-white shadow border border-white">
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
                      className="flex items-center h-full overflow-hidden"
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
  );
}
