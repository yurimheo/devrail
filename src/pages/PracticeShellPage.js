import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { courses } from '../data/courses';

export default function PracticeShellPage() {
  const { subject_id, subject_course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const terminalRef = useRef(null);

  // ✅ 과목과 해당 day 정보 찾기
  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === subject_id);
    if (foundCourse) {
      const dayNumber = parseInt(subject_course_id, 10);
      const foundDay = foundCourse.outline.find((o) => o.day === dayNumber);

      setCourse(foundCourse);
      setSelectedDay(foundDay);

      if (foundDay) {
        const pdfPath = `/pdfs/${subject_id}-day${dayNumber}.pdf`;
        fetch(pdfPath)
          .then((res) => {
            if (res.ok) setPdfUrl(pdfPath);
            else setPdfUrl('/pdfs/sample.pdf');
          })
          .catch(() => setPdfUrl('/pdfs/sample.pdf'));
      }
    }
  }, [subject_id, subject_course_id]);

  // ✅ xterm.js 초기화
  useEffect(() => {
    if (!terminalRef.current) {
      terminalRef.current = new Terminal(); // Terminal 인스턴스 생성
      terminalRef.current.open(document.getElementById('terminal'));
      terminalRef.current.write('Welcome to DEVRAIL Terminal!\r\n');
    }
  }, []);

  // 💠 햄버거 메뉴 열림/닫힘 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gradient-to-b from-black via-gray-900 to-black text-white flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">DEVRAIL</span>
        </div>
        <div className="relative">
          {/* 햄버거 버튼 */}
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            ☰
          </button>

          {/* 네비게이션 메뉴 */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute top-16 right-0 bg-gray-900 text-white rounded-lg shadow-lg p-4 w-[220px] z-50"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
              >
                <ul>
                  <li className="py-2">
                    <a
                      href="/"
                      className="block text-sm font-medium border-b-2 border-transparent hover:border-gray-400 transition duration-200"
                    >
                      메인
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      href="/pricing"
                      className="block text-sm font-medium border-b-2 border-transparent hover:border-gray-400 transition duration-200"
                    >
                      요금
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      href="/practice"
                      className="block text-sm font-medium border-b-2 border-transparent hover:border-gray-400 transition duration-200"
                    >
                      실습실
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      <div className="flex flex-1">
        <div className="w-1/2 p-4 border-r">
          {course && selectedDay ? (
            <>
              <h2 className="text-xl font-bold">
                {course.name} - {selectedDay.title}
              </h2>
              <p className="text-gray-600">{selectedDay.description}</p>
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-full mt-4"
                  title="PDF Viewer"
                ></iframe>
              ) : (
                <p>PDF 파일을 찾을 수 없습니다.</p>
              )}
            </>
          ) : (
            <p>과목 정보를 찾을 수 없습니다.</p>
          )}
        </div>
        <div className="w-1/2 p-4 bg-black text-white">
          <div id="terminal" className="h-full"></div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-4">
        <p className="text-center">&copy; 2025 DevRail. All rights reserved.</p>
      </div>
    </div>
  );
}
