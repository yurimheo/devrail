import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 학습 코스 데이터
import { courses } from "../data/courses";

// 과목 아이콘 컴포넌트
import CourseIcons from "../components/CourseIcons";

export default function PracticePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // 현재 코스 찾기
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

  // DAY 목록
  const outlineData = selectedCourse?.outline || [];

  // "현재 어떤 DAY가 펼쳐져 있는가" - 인덱스로 관리
  const [expandedDayIndex, setExpandedDayIndex] = useState(0);

  // 코스(과목)가 바뀔 때마다 DAY1만 펼치도록 재설정
  useEffect(() => {
    if (outlineData.length > 0) {
      setExpandedDayIndex(0);
    }
  }, [outlineData]);

  // 과목 아이콘 클릭
  const handleSelectCourse = (clickedId) => {
    const target = courses.find((c) => c.id === clickedId);
    if (target && !target.isDisabled) {
      navigate(`/practice/${clickedId}`);
    }
  };

  // DAY 클릭 시 (하나만 펼치는 로직)
  const handleDayClick = (index) => {
    setExpandedDayIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className=" min-h-screen">
      <div className="w-full mx-auto pt-2 pb-16 flex justify-center bg-white">
      <div className="container p-8 bg-white ">
          {/* 상단: 과목 아이콘 */}
          <CourseIcons
            courses={courses}
            selectedCourse={selectedCourse?.id}
            onSelectCourse={handleSelectCourse}
          />

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
              const isOpen = expandedDayIndex === index; // 현재 DAY가 열려 있는지 여부

              return (
                <div
                  key={index}
                  className="flex items-center bg-white overflow-hidden h-14"
                >
                  {/* 왼쪽: DAY n (항상 고정된 크기) */}
                  <div className="w-2/6 flex items-center justify-between px-4 border rounded-md shadow bg-gray-100 overflow-hidden h-14 pl-8 pr-6">
                    <div>
                    <span className="font-bold text-blue-600">
                      DAY {dayItem.day}&nbsp;&nbsp;
                    </span>
                    <span className="font-semibold text-gray-800 whitespace-nowrap">
                            |&nbsp;&nbsp;{dayItem.title}&nbsp;
                          </span>
                    </div>
                    <button
                      onClick={() => handleDayClick(index)}
                      className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-400"
                    >
                      {isOpen ? "<" : ">"}
                    </button>
                  </div>

                  {/* 오른쪽: 슬라이드로 펼쳐지는 영역 */}
                  <AnimatePresence mode="sync">
                    {isOpen && (
                      <motion.div
                        key="slide"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 800, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center bg-white h-full overflow-hidden"
                        style={{ height: "56px" }}
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
