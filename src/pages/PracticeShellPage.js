import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { courses } from '../data/courses';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PracticeHeader from '../components/PracticeHeader';

export default function PracticeShellPage() {
  const { subject_id, subject_course_id } = useParams();
  const navigate = useNavigate();

  // ✅ 현재 과목과 현재 DAY 찾기
  const course = courses.find((c) => c.id === subject_id);
  const currentDay = course?.outline.find(
    (o) => o.day === parseInt(subject_course_id, 10),
  );

  const [markdownSections, setMarkdownSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (currentDay) {
      const markdownPath = `/markdowns/${subject_id}/day${currentDay.day}.md`;
      fetch(markdownPath)
        .then((res) => res.text())
        .then((data) => {
          const sections = data.split('---'); // '---'를 기준으로 마크다운 분리
          setMarkdownSections(sections);
          setCurrentPage(0);
        })
        .catch(() => setMarkdownSections(['# 파일을 찾을 수 없습니다.']));
    }
  }, [subject_id, subject_course_id, currentDay]);

  useEffect(() => {
    if (!terminalRef.current) {
      terminalRef.current = new Terminal();
      terminalRef.current.open(document.getElementById('terminal'));
      terminalRef.current.write('Welcome to DEVRAIL Terminal!\r\n');
    }
  }, []);

  // ✅ 이전 / 다음 섹션 이동
  const handlePageChange = (direction) => {
    if (direction === 'next') {
      if (currentPage < markdownSections.length - 1) {
        setCurrentPage((prev) => prev + 1);
      } else {
        handleDayChange('next');
      }
    } else if (direction === 'prev') {
      if (currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      } else {
        handleDayChange('prev');
      }
    }
  };

  // ✅ 이전 / 다음 DAY 이동
  const handleDayChange = (direction) => {
    const currentDayNumber = parseInt(subject_course_id, 10);
    const newDay =
      direction === 'next' ? currentDayNumber + 1 : currentDayNumber - 1;
    const isValidDay = course?.outline.some((o) => o.day === newDay);

    if (isValidDay) {
      navigate(`/practice/${subject_id}/day/${newDay}`);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* 헤더 */}
      <PracticeHeader
        course={course}
        currentDay={currentDay}
        subject_id={subject_id}
        subject_course_id={subject_course_id}
      />

      <div className="flex flex-1">
        {/* ✅ 마크다운 렌더링 화면 */}
        <div className="w-1/2 p-6 border-r bg-gray-50 overflow-y-auto">
          {/* 제목 및 설명 박스 */}
          <div className="p-6 border-b-4 border-blue-500 mb-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-600 mb-2">
              {currentDay?.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentDay?.description}
            </p>
          </div>

          {/* 현재 페이지의 마크다운 섹션 렌더링 */}
          <div className="prose prose-lg max-w-none p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownSections[currentPage]}
            </ReactMarkdown>
          </div>

          {/* 이전/다음 버튼 */}
          <div className="mt-6 flex justify-between">
            <button
              className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-400 transition duration-300"
              onClick={() => handlePageChange('prev')}
              disabled={
                currentPage === 0 && parseInt(subject_course_id, 10) === 1
              }
            >
              이전
            </button>
            <button
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
              onClick={() => handlePageChange('next')}
            >
              {currentPage === markdownSections.length - 1
                ? '다음 DAY'
                : '다음'}
            </button>
          </div>
        </div>

        {/* 터미널 화면 */}
        <div className="w-1/2 p-6 bg-gray-900 text-white">
          <div id="terminal" className="h-full rounded-xl bg-black"></div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-4">
        <p className="text-center">&copy; 2025 DevRail. All rights reserved.</p>
      </footer>
    </div>
  );
}
