import { motion } from "framer-motion";

export default function CourseIcons({ courses, selectedCourse, onSelectCourse }) {
  return (
    <div className="flex justify-center space-x-8 py-8">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          onClick={() => {
            if (!course.isDisabled) {
              onSelectCourse(course.id);
            }
          }}
          className={`relative flex flex-col items-center justify-center w-24 h-24 rounded-full cursor-pointer transition-all duration-300 border ${
            course.id === selectedCourse
              ? "bg-gray-100 shadow-md scale-110 border-gray-400"
              : "bg-white border-gray-200 hover:scale-110 hover:shadow-lg"
          } ${course.isDisabled ? "opacity-50 cursor-not-allowed" : ""}`} // 비활성화된 경우 'cursor-not-allowed' 추가
          initial={{ opacity: 0, y: 20 }} // 애니메이션 초기 상태
          animate={{ opacity: 1, y: 0 }} // 애니메이션 완료 상태
          transition={{ delay: index * 0.2, duration: 0.6 }} // 지연시간을 두어 순차적으로 나타남
        >
          {/* 아이콘 */}
          <motion.img
            src={`/services-icons/${course.icon}-icon.svg`}
            alt={`${course.name} 아이콘`}
            className="w-8 h-8"
            initial={{ opacity: 0 }} // 초기 상태
            animate={{ opacity: 1 }} // 아이콘이 서서히 나타남
            transition={{ delay: index * 0.2, duration: 0.6 }} // 지연시간 추가
          />
          
          {/* 비활성화된 과목에 '업데이트 예정' 텍스트 추가 */}
          {course.isDisabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white text-xs font-bold">
              업데이트 예정
            </div>
          )}
          
          {/* 과목명 */}
          <p
            className={`absolute top-28 text-center text-sm ${
              course.id === selectedCourse
                ? "font-semibold text-blue-600"
                : "text-gray-600"
            }`}
            style={{
              color: course.id === selectedCourse ? "rgb(37 99 235)" : undefined,
            }}
          >
            {course.name}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
