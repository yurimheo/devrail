// 🧶 CourseLearningPath 컴포넌트
// ✔ `outline`: 학습 일정 데이터 배열 (각 Day 정보 포함)
// ✔ `courseId`: 현재 선택된 과목 ID (과목 변경 시 Day 초기화)

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CourseLearningPath({ outline, courseId }) {
  // 💠 기본 Day 설정
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    setSelectedDay(1); // 과목 변경 시 Day 초기화
  }, [courseId]);

  return (
    // 📦 전체 컨테이너 🔽
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">학습 일정</h3>

      {/* 🏁 학습 경로 노드 & 진행 바 컨테이너 🔽 */}
      <div className="relative py-8 px-2">
        <div className="flex justify-between items-start space-x-8">
          {/* `outline` 배열 순회 - 학습 일정 렌더링 */}
          {outline.map((item, index) => (
            // 🔵 학습 노드 (Day 버튼) 🔽
            <div
              key={item.day}
              className="relative flex flex-col items-center"
              onClick={() => setSelectedDay(item.day)}
            >
              {/* 📍 Day 버튼 (선택된 경우 스타일 변경) */}
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
                  selectedDay >= item.day
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-sm">{item.day}</span>
              </motion.div>

              {/* 📢 Day 제목 (현재 Day 강조) */}
              <p
                className={`text-xs mt-3 pt-3 text-center w-16 truncate ${
                  selectedDay >= item.day
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                {item.title}
              </p>
            </div>
            // 🔵 학습 노드 (Day 버튼) 🔼
          ))}
        </div>

        {/* 📏 전체 진행 바 🔽 */}
        <div className="absolute top-1/2 left-0 mt-5 w-full h-1 bg-gray-300 transform -translate-y-1/2"></div>

        {/* 🎏 진행 바 (선택된 Day까지 채워짐) */}
        <div
          className="absolute top-1/2 left-0 mt-5 h-1 bg-blue-600 transform -translate-y-1/2"
          style={{ width: `${(selectedDay / outline.length) * 100}%` }}
        ></div>
        {/* 📏 전체 진행 바 🔼 */}
      </div>
      {/* 🏁 학습 경로 노드 & 진행 바 컨테이너 🔼 */}

      {/* 📌 선택된 Day 상세보기 🔽 */}
      {selectedDay && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h4 className="font-bold text-lg text-gray-800">
            Day {selectedDay}:{' '}
            {outline.find((item) => item.day === selectedDay)?.title}
          </h4>
          <p className="text-gray-600 mt-2">
            {outline.find((item) => item.day === selectedDay)?.description}
          </p>
        </div>
      )}
      {/* 📌 선택된 Day 상세보기 🔼 */}
    </div>
    // 📦 전체 컨테이너 🔼
  );
}
