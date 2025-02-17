import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { courses } from '../data/courses'; // 과목 데이터
import { FiSettings, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

export default function WorkspacePage() {
  const navigate = useNavigate();

  // 💥임시 관리자 판별
  const [isAdmin, setIsAdmin] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 📂 PDF 리스트 상태 및 과거 기록 관리
  const [pdfFiles, setPdfFiles] = useState([]);
  const pdfHistory = useRef({});

  // 💠 워크스페이스 아이디를 URL에서 가져오기
  const { workspace_id } = useParams();
  // 💠 선택된 코스 정보 관리 - 기본값은 null (아직 선택되지 않음)
  const [selectedCourse, setSelectedCourse] = useState(null);
  // 💠 학습 일정의 확장된 정보 인덱스를 관리 - 기본값은 null (확장된 일정 없음)
  const [expandedDayIndex, setExpandedDayIndex] = useState(null);

  useEffect(() => {
    const mockUserWorkspaces = {
      kangyk00: 'docker',
      kimgun99: 'kubernetes',
      heoyurim0322: 'git',
    };

    const currentSubject = mockUserWorkspaces[workspace_id];

    // 📂 과거 기록 유지 및 PDF 리스트 갱신
    if (currentSubject) {
      if (!pdfHistory.current[currentSubject]) {
        pdfHistory.current[currentSubject] = generateMockPDFs(currentSubject);
      }
      setPdfFiles(pdfHistory.current[currentSubject]);

      // 🧠 선택된 과목 설정 (기존 로직)
      const foundCourse = courses.find((c) => c.id === currentSubject);
      setSelectedCourse(foundCourse);
    }
  }, [workspace_id]);

  // ✅ PDF 리스트 생성 함수
  const generateMockPDFs = (subject) => {
    const pdfMap = {
      git: ['Git_basic', 'Git_advanced'],
      docker: ['Docker_basics', 'Docker_practice'],
      kubernetes: ['Kubernetes_intro', 'Kubernetes_ops'],
    };
    return pdfMap[subject] || [];
  };

  // 💠 날짜 클릭 시 확장된 일정 인덱스 토글
  const handleDayClick = (index) => {
    setExpandedDayIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // ✅ 선택된 코스 정보가 없을 경우
  if (!selectedCourse) {
    return (
      <div className="flex items-start justify-center min-h-screen mt-16">
        <div className="text-lg text-blue-500">
          <span className="font-bold">워크스페이스</span>
          <span>를 찾을 수 없습니다. （＞人＜；）</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      {/* 🛠️ 임시 관리자 버튼 */}
      <button
        className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600"
        onClick={() => {
          setIsAdmin(!isAdmin);
          if (!isAdmin) {
            setShowHint(true);
            setTimeout(() => setShowHint(false), 3000); // 3초 후 자동 숨김
          }
        }}
      >
        {isAdmin ? '관리자 모드 해제' : '관리자 모드 활성화'}
      </button>

      {/* ------------------------------------------------------------------------------------------- */}
      {/* 🎀 워크스페이스 타이틀 섹션 🔽*/}
      <div className="container relative z-20 p-8 mx-auto shadow-lg rounded-lg bg-opacity-5">
        {/* ⚙️ 관리자 설정 아이콘 + 툴팁 */}
        {isAdmin && (
          <motion.div
            className="absolute z-20 top-6 right-6 p-2 cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
            onClick={() => navigate(`/workspaces/${workspace_id}/settings`)}
          >
            <FiSettings size={24} className="text-black" />

            {/* 🏷️ 툴팁 */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  className="absolute right-0 w-[180px] px-3 py-1.5 text-[11px] font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow-lg text-center"
                  style={{
                    bottom: '-50px',
                  }}
                  initial={{ opacity: 0, y: -5, scale: 0.9 }}
                  animate={{
                    opacity: [0, 0.3, 0.8, 1],
                    scale: [0.9, 1.05, 1],
                    y: 0,
                  }}
                  exit={{ opacity: 0, y: -5, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
                >
                  워크스페이스 관리자님!
                  <br />
                  관리자 전용 설정을 해보세요 :D
                  {/* 말풍선 꼬리 추가 */}
                  <div
                    className="absolute w-2 h-2 bg-white border border-gray-300"
                    style={{
                      top: '-5px',
                      right: '10px',
                      transform: 'translateX(-50%) rotate(45deg)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div
          className="relative px-10 py-6 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          whileHover={{
            scale: 1.05,
            rotate: 1,
            transition: { duration: 0.4, ease: 'easeInOut' },
          }}
        >
          <motion.h1
            className="text-2xl font-bold text-center text-black"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
          >
            <motion.h1
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {workspace_id}님의
            </motion.h1>
          </motion.h1>

          {/* 워크스페이스 타이틀 */}
          <motion.h1
            className="text-5xl font-bold text-center text-black"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
          >
            <motion.h1
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              워크스페이스
            </motion.h1>
          </motion.h1>
        </motion.div>
        {/* 🎀 워크스페이스 타이틀 섹션 🔼*/}
        {/* ------------------------------------------------------------------------------------------- */}
        <p className="text-xs text-black text-opacity-80 text-center leading-relaxed">
          <span className="relative font-semibold ">하루 최대&nbsp;</span>
          <span className="relative px-1 border border-black rounded-md border-opacity-55 font-bold">
            8시간
          </span>
          , 당신만의 학습 여정을 떠나세요!
          <br />
          <span>탑승하세요! 새로운 가능성이 기다리고 있습니다.</span>
        </p>
        {/* ------------------------------------------------------------------------------------------- */}
        {/* 🎀 선택된 과목 정보 헤더 섹션 🔽*/}
        <motion.div
          className="px-16 mt-10 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border border-black border-opacity-50 rounded-md p-3">
            <div className="relative flex items-center justify-center">
              {/* 메인 타이틀 */}
              <motion.h2 className="relative text-3xl font-bold text-center text-black">
                {selectedCourse.name}
              </motion.h2>
            </div>

            <p className="mt-2 text-sm text-gray-800">
              <ReactMarkdown>{selectedCourse.description}</ReactMarkdown>
            </p>
          </div>
        </motion.div>

        {/* 🎀 선택된 과목 정보 헤더 섹션 🔼*/}
        {/* ------------------------------------------------------------------------------------------- */}
        {/* 구분선 */}
        <div className="px-16 py-5 text-center">
          <span className="text-black font-bold text-sm">
            ●&nbsp;&nbsp;●&nbsp;&nbsp;●&nbsp;&nbsp;●&nbsp;&nbsp;●
          </span>
        </div>
        {/* ------------------------------------------------------------------------------------------- */}
        {/* 🎀 학습 일정 섹션 | DAY 목록 렌더링 🔽*/}
        <div className="px-16 space-y-4">
          {selectedCourse.outline.map((dayItem, index) => {
            const isOpen = expandedDayIndex === index;

            return (
              <motion.div
                key={index}
                className="relative flex items-center overflow-hidden border-b-2 border-opacity-5 h-14"
                style={{
                  border: isOpen ? '3px solid black)' : '1px solid black',
                  borderRadius: '10px 10px',
                }}
                animate={
                  isOpen
                    ? {
                        border: '3px solid rgba(59, 130, 246, 1)',
                      }
                    : {}
                }
              >
                {/* DAY n */}
                <motion.div
                  className="flex items-center justify-between w-2/6 min-w-60 px-4 pl-8 pr-6 overflow-hidden flex-shrink-0 border border-black border-opacity-55 rounded-l-md cursor-pointer h-14"
                  style={{
                    transition:
                      'background 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  }}
                  onClick={() => handleDayClick(index)}
                  whileHover={{
                    scale: 1.01,
                  }}
                >
                  <div>
                    <span className="font-bold text-blue-500">
                      DAY {dayItem.day}&nbsp;&nbsp;
                    </span>
                    <span className="text-md font-semibold text-black whitespace-nowrap">
                      |&nbsp;&nbsp;{dayItem.title}&nbsp;
                    </span>
                  </div>

                  {/* 펼치기/접기 버튼 */}
                  <motion.div
                    className="flex items-center justify-center w-8 h-8 text-black border border-black rounded-full shadow-md relative overflow-hidden"
                    initial={{ scale: 1 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-40"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(255, 240, 180, 0.3) 30%, rgba(255, 225, 130, 0.15) 70%, transparent 100%)',
                        filter: 'blur(6px)',
                      }}
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* 아이콘 변경 */}
                    <motion.div
                      transition={{
                        duration: 1,
                        repeat: isOpen ? Infinity : 0,
                        repeatType: 'reverse',
                      }}
                    >
                      {isOpen ? (
                        <FiChevronLeft size={18} color="#000000" />
                      ) : (
                        <FiChevronRight size={18} color="#000000" />
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* 슬라이드 영역 */}
                <AnimatePresence mode="sync">
                  {isOpen && (
                    <motion.div
                      key="slide"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 900, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center h-full overflow-hidden"
                      style={{ height: '56px' }}
                    >
                      <div className="flex items-center w-full gap-3 px-4">
                        <span className="text-md text-black truncate">
                          {dayItem.description}
                        </span>

                        {/* 시작하기 버튼 */}
                        <motion.button
                          className="ml-auto relative overflow-hidden bg-blue-500 text-white px-4 py-2 rounded-md shadow-md text-sm font-semibold"
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3, ease: 'easeInOut' },
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            navigate(
                              `/workspaces/${workspace_id}/${selectedCourse.id}/day/${dayItem.day}`,
                            )
                          }
                        >
                          시작하기
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        {/* 🎀 학습 일정 섹션 | DAY 목록 렌더링 🔼*/}
        {/* ------------------------------------------------------------------------------------------- */}

        {/* ------------------------------------------------------------------------------------------- */}
        {/* 🚀 커스텀 학습 섹션 (페이지 하단) */}
        <div className="px-16 text-center">
          {/* 구분선 */}
          <div className="py-20 text-center">
            <span className="text-black font-bold text-sm">
              ●&nbsp;&nbsp;●&nbsp;&nbsp;●&nbsp;&nbsp;●&nbsp;&nbsp;●
            </span>
          </div>

          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
          >
            {/* 타이틀 */}
            <motion.h2
              className="text-3xl font-bold text-black flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {workspace_id}님의
              <motion.div
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              >
                <FaRocket className="text-black drop-shadow-lg" size={28} />
              </motion.div>
            </motion.h2>

            <motion.h2
              className="text-5xl font-bold text-center text-black"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {' '}
              <motion.h2
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                커스텀 학습 노선
              </motion.h2>
            </motion.h2>
          </motion.div>

          <p className="text-xs text-gray-800 mt-2">
            특별히 설계된 학습 여정입니다.
            <span className="font-semibold"> 매일 8시간씩 </span>
            집중하며 한 걸음씩 성장하세요. 꾸준함이 곧 성공의 열쇠입니다!
          </p>

          {/* 📖 업로드된 PDF 갤러리 */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
            {pdfFiles.map((fileName, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center justify-between px-6 py-8 w-11/12 h-56 text-center bg-gradient-to-r from-[#111111] via-[#202020] to-[#131313] border border-gray-600 shadow-lg rounded-lg transform transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.08,
                  rotateY: [0, 10, 0],
                  transition: { duration: 0.4, ease: 'easeInOut' },
                }}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  boxShadow:
                    '10px 10px 25px rgba(58, 58, 58, 0.2), 0 0 10px rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* 📚 책 등 */}
                <div
                  className="absolute left-0 top-0 h-full w-12"
                  style={{
                    background: 'linear-gradient(to right, #353535, #1d1d1d)',
                    borderRadius: '20px 0 0 20px',
                    boxShadow: 'inset 4px 0 8px rgba(0, 0, 0, 0.5)',
                    zIndex: 10,
                  }}
                ></div>

                {/* 📜 책 제목 */}
                <h3 className="relative z-20 text-xl font-semibold text-white">
                  {fileName}
                </h3>

                {/* 시작하기 버튼 */}
                <motion.button
                  className="mt-auto relative overflow-hidden bg-transparent text-white px-4 py-2 rounded-md text-sm font-semibold border border-white shadow-md"
                  whileHover={{
                    scale: 1.05,

                    transition: { duration: 0.3, ease: 'easeInOut' },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    navigate(
                      `/workspaces/${workspace_id}/pdfs/${selectedCourse.id}/${fileName}.pdf`,
                      {
                        state: { pdfFiles: pdfFiles }, // pdfFiles 배열 함께 전달
                      },
                    )
                  }
                >
                  {/* 테두리  */}
                  <motion.div
                    className="absolute inset-0 rounded-md border-2 border-transparent"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      borderWidth: [3, 4, 3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* 반짝이는 테두리 선 효과 */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full rounded-md"
                    style={{
                      border: '2px solid #ffecec00',
                      maskImage:
                        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                    }}
                    animate={{
                      transform: ['translateX(-100%)', 'translateX(100%)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <span> 시작하기</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🚀 커스텀 학습 섹션 🔼 */}
        {/* ------------------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
}
