import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CourseLearningPath({ outline, courseId }) {
  const [selectedDay, setSelectedDay] = useState(1); // 기본 Day 설정

  // 과목 변경 시 Day를 초기화
  useEffect(() => {
    setSelectedDay(1);
  }, [courseId]);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">학습 일정</h3>
      <div className="relative py-8 px-2">
        {/* 노선도 노드 */}
        <div className="flex justify-between items-start space-x-8">
          {outline.map((item, index) => (
            <div
              key={item.day}
              className="relative flex flex-col items-center"
              onClick={() => setSelectedDay(item.day)} // 선택된 Day 업데이트
            >
              {/* 노드 (점) 크기 및 위치 수정 */}
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
                  selectedDay >= item.day ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-sm">{item.day}</span>
              </motion.div>

              {/* 노드 제목 */}
              <p
                className={`text-xs mt-4 text-center w-16 overflow-hidden ${
                  selectedDay >= item.day ? "font-semibold text-blue-600" : "text-gray-600"
                }`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* 노선도 선 (하나의 선) */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 transform -translate-y-1/2"></div>

        {/* 선택된 Day 까지 채워지는 선 */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-blue-600 transform -translate-y-1/2"
          style={{
            width: `${(selectedDay / outline.length) * 100}%`, // 선택된 Day까지 선이 채워짐
          }}
        ></div>
      </div>

      {/* 선택된 Day 상세보기 */}
      {selectedDay && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h4 className="font-bold text-lg text-gray-800">
            Day {selectedDay}: {outline.find((item) => item.day === selectedDay)?.title}
          </h4>
          <p className="text-gray-600 mt-2">
            {outline.find((item) => item.day === selectedDay)?.description}
          </p>
        </div>
      )}
    </div>
  );
}
