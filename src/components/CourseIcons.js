// 🧶 CourseIcons 컴포넌트
// ✔ `courses`: 과목 리스트 배열
// ✔ `selectedCourse`: 현재 선택된 과목 ID
// ✔ `onSelectCourse`: 과목 선택 시 호출되는 함수

import { motion } from 'framer-motion';

export default function CourseIcons({
  courses,
  selectedCourse,
  onSelectCourse,
}) {
  return (
    // 📦 전체 컨테이너 🔽
    <div className="flex justify-center space-x-8 py-8">
      {/* `courses` 배열 순회 - 과목 아이콘 렌더링 */}
      {courses.map((course, index) => (
        // 📚 과목 아이콘 컨테이너 🔽
        <motion.div
          key={course.id}
          onClick={() => {
            if (!course.isDisabled) {
              onSelectCourse(course.id);
            }
          }}
          className={`relative flex flex-col items-center justify-center w-24 h-24 rounded-full cursor-pointer transition-all duration-300 border ${
            // 삼항 연산자를 이용한 조건문 <선택된 과목인 경우>
            course.id === selectedCourse
              ? 'bg-gray-100 shadow-md scale-110 border-gray-400' // ⭕ 선택된 과목
              : 'bg-white border-gray-200 hover:scale-110 hover:shadow-lg' // ❌ 선택되지 않은 과목
            // `$` 템플릿 리터럴을 이용한 추가 조건 <비활성화된 과목인 경우>
          } ${course.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} // 🚫 비활성화된 과목
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
        >
          {/* 📔 과목 아이콘 🔽 */}
          <motion.img
            src={`/images/services-icons/${course.icon}-icon.svg`}
            alt={`${course.name} 아이콘`}
            className="w-8 h-8"
            initial={{ opacity: 0 }} // 초기 상태
            animate={{ opacity: 1 }} // 아이콘이 서서히 나타남
            transition={{ delay: index * 0.2, duration: 0.6 }} // 지연시간 추가
          />
          {/* 📔 과목 아이콘 🔼 */}

          {/* 🚫 비활성화 과목 텍스트 추가  🔽 */}
          {course.isDisabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white text-xs font-bold">
              업데이트 예정
            </div>
          )}
          {/* 🚫 비활성화 과목 텍스트 추가 🔼 */}

          {/* 📢 과목명 🔽 */}
          <p
            className={`absolute top-28 text-center text-sm ${
              course.id === selectedCourse
                ? 'font-semibold text-blue-600'
                : 'text-gray-600'
            }`}
            style={{
              color:
                course.id === selectedCourse ? 'rgb(37 99 235)' : undefined,
            }}
          >
            {course.name}
          </p>
          {/* 📢 과목명 🔼 */}
        </motion.div>
        // 📚 과목 아이콘 컨테이너 🔼
      ))}
    </div>
    // 📦 전체 컨테이너 🔼
  );
}
