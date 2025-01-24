import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseTabs from "../components/CourseTabs";
import CourseLearningPath from "../components/CourseLearningPath";
import CourseIcons from "../components/CourseIcons";
import { courses } from "../data/courses";

export default function CoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [selectedCourseId, setSelectedCourseId] = useState(courseId || courses[0].id);

  // 로그인 상태 (true/false)
  const isLoggedIn = false;
  // 결제 상태 (true: 결제 완료, false: 결제 미완료)
  const isPaid = false;

  const selectedCourse = courses.find((course) => course.id === selectedCourseId);

  const handleCourseChange = (id) => {
    setSelectedCourseId(id);
    navigate(`/courses/${id}`);
  };

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      // 비로그인 상태에서 로그인 페이지로 이동
      alert("로그인 후 승차하세요!");
      navigate("/login");
    } else {
      // 로그인 상태에서 결제 상태에 따라 분기
      if (isPaid) {
        // 결제 완료된 경우 실습실 페이지로 이동
        alert("실습실로 이동합니다!");
        navigate("/practice");
      } else {
        // 결제되지 않은 경우 학습 소개 페이지로 이동
        alert("결제가 필요합니다!");
        navigate("/courses");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto pt-2 pb-16 relative">
        <div className="w-full container mx-auto shadow-xl p-8 bg-white rounded-2xl relative">
          {/* 상단 아이콘 섹션 */}
          <CourseIcons
            courses={courses}
            selectedCourse={selectedCourseId}
            onSelectCourse={handleCourseChange}
          />

          {/* 과목 상세 정보 */}
          <div className="container mx-auto py-12 px-4">
            {/* 과목 이름과 아이콘 */}
            <div className="flex items-center space-x-4 mb-8">
              <img
                src={`/services-icons/${selectedCourse.icon}-icon.svg`}
                alt={`${selectedCourse.name} 아이콘`}
                className="w-12 h-12 p-2 bg-gray-100 rounded-lg"
              />
              <h1 className="text-3xl font-bold text-gray-800">{selectedCourse.name}</h1>
            </div>
            <p className="text-gray-600 mt-2">{selectedCourse.description}</p>

            {/* 탭 */}
            <CourseTabs course={selectedCourse} />

            {/* 학습 일정 */}
            <CourseLearningPath outline={selectedCourse.outline} courseId={selectedCourseId} />

            <div className="text-right mt-8">
              <button
                onClick={handleButtonClick}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                지금 승차하기
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
