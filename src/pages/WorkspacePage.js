import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { courses } from '../data/courses'; // 과목 데이터
import { FiSettings, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa';

export default function WorkspacePage() {
  // 💥임시 관리자 판별
  const [isAdmin, setIsAdmin] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 💥 임시 PDF 파일 데이터
  const mockUploadedPDFs = [
    '기초_Docker.pdf',
    'Kubernetes_핵심_이론.pdf',
    'Ansible_자동화_가이드.pdf',
    'CI_CD_완벽_이해.pdf',
    '클라우드_배포전략.pdf',
    'DevOps_최적화_전략.pdf',
  ];

  const [uploadedPDFs, setUploadedPDFs] = useState([]);

  // 💥 임시 데이터 추가/삭제 버튼
  const toggleMockData = () => {
    if (uploadedPDFs.length === 0) {
      setUploadedPDFs(mockUploadedPDFs.map((file) => file.replace('.pdf', '')));
    } else {
      setUploadedPDFs([]);
    }
  };

  // 💠 백그라운드에 별을 생성하는 상태 관리
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // 💠 별을 랜덤으로 생성하는 함수
    const generateStars = () => {
      let starArray = [];
      for (let i = 0; i < 100; i++) {
        // 별의 개수 조정
        starArray.push({
          id: i, // 별의 고유 ID
          top: `${Math.random() * 100}%`, // 별의 위치 (수직)
          left: `${Math.random() * 100}%`, // 별의 위치 (수평)
          size: `${Math.random() * 3 + 1}px`, // 별의 크기 (1px ~ 4px 사이)
          delay: `${Math.random() * 2}s`, // 별의 애니메이션 지연 시간 (0~2초 사이)
        });
      }
      // 생성된 별 배열을 상태에 저장
      setStars(starArray);
    };

    // 컴포넌트가 마운트될 때 별을 생성
    generateStars();
  }, []); // 빈 배열로 설정 후, 컴포넌트가 처음 렌더링될 때만 실행

  // 💠 워크스페이스 아이디를 URL에서 가져오기
  const { workspace_id } = useParams();
  // 💠 선택된 코스 정보 관리 - 기본값은 null (아직 선택되지 않음)
  const [selectedCourse, setSelectedCourse] = useState(null);
  // 💠 학습 일정의 확장된 정보 인덱스를 관리 - 기본값은 null (확장된 일정 없음)
  const [expandedDayIndex, setExpandedDayIndex] = useState(null);

  useEffect(() => {
    // 💥 임시 | 유저가 선택한 과목
    const mockUserWorkspaces = {
      kangyk00: 'docker',
      kimgun99: 'kubernetes',
      heoyurim0322: 'github',
    };

    // 💠 코스 아이디 가져오기
    const courseId = mockUserWorkspaces[workspace_id];

    // ✅ 코스 아이디가 있을 경우
    if (courseId) {
      // 💠 찾은 코스 정보
      const foundCourse = courses.find((c) => c.id === courseId);

      // 찾은 코스 선택하기
      setSelectedCourse(foundCourse);
    }
  }, [workspace_id]);

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
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-black via-gray-800 to-black">
      {/* 반짝이는 별 배경 */}
      <div className="absolute z-10 w-full h-full overflow-hidden pointer-events-none stars">
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

      {/* 📂 PDF 임시 업로드 버튼 */}
      {isAdmin && (
        <button
          className="absolute top-12 right-4 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600"
          onClick={toggleMockData}
        >
          {uploadedPDFs.length > 0 ? '업로드된 파일 제거' : '임시 PDF 업로드'}
        </button>
      )}

      {/* ------------------------------------------------------------------------------------------- */}
      {/* 🎀 워크스페이스 타이틀 섹션 🔽*/}
      <div
        className="container relative z-20 p-8 mx-auto bg-gray-500 border border-opacity-50 rounded-lg border-blue-950 bg-opacity-5"
        style={{ boxShadow: '0px 0px 10px rgba(199, 239, 255, 0.6)' }}
      >
        {/* ⚙️ 관리자 설정 아이콘 + 툴팁 */}
        {isAdmin && (
          <motion.div
            className="absolute z-20 top-6 right-6 p-2 shadow-lg cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
          >
            <FiSettings
              size={24}
              className="text-white"
              style={{
                filter:
                  'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(173, 216, 230, 0.6))',
              }}
            />

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
            className="text-2xl font-bold text-center text-white"
            style={{
              textShadow:
                '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(173, 216, 230, 0.6)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              textShadow:
                '0 0 15px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 254, 234, 0.8)',
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

          {/* 별 장식 ✨ */}
          <motion.span
            className="absolute text-4xl text-white"
            style={{
              transform:
                'translate3d(-145px, 1px, 0) translate3d(-50%, -50%, 0) rotate(10deg)',
              textShadow:
                '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✢
          </motion.span>
          <motion.span
            className="absolute font-bold text-xl text-white"
            style={{
              transform:
                'translate3d(-160px, 20px, 0) translate3d(-50%, -50%, 0) rotate(-2deg)',
              textShadow:
                '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⭑
          </motion.span>
          <motion.span
            className="absolute font-bold text-2xl text-white"
            style={{
              transform:
                'translate3d(-145px, 32px, 0) translate3d(-50%, -50%, 0) rotate(-2deg)',
              textShadow:
                '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(119, 162, 255, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ✧
          </motion.span>
          <motion.span
            className="absolute font-bold text-3xl text-white"
            style={{
              transform:
                'translate3d(-50%, -50%, 0) translate3d(135px, -4px, 0) rotate(10deg)',
              textShadow:
                '0 0 8px rgba(212, 186, 255, 0.8), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 247, 211, 0.4)',
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              textShadow:
                '0 0 12px rgba(255, 123, 196, 1), 0 0 20px rgba(79, 131, 243, 0.8), 0 0 30px rgba(255, 247, 211, 0.6)',
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
          >
            ･☪·̩͙
          </motion.span>

          {/* 워크스페이스 타이틀 */}
          <motion.h1
            className="text-5xl font-bold text-center text-white"
            style={{
              fontFamily: 'HakgyoansimByeolbichhaneulTTF-B',
              textShadow:
                '0 0 12px rgba(210, 186, 255, 0.8), 0 0 20px rgba(79, 131, 243, 0.6), 0 0 25px rgba(255, 247, 211, 0.4)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              textShadow:
                '0 0 12px rgba(101, 84, 252, 1), 0 0 20px rgba(79, 131, 243, 0.8), 0 0 30px rgba(255, 247, 211, 0.6)',
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
          >
            {' '}
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
        {/* ------------------------------------------------------------------------------------------- */}
        {/* 🎀 선택된 과목 정보 헤더 섹션 🔽*/}
        <motion.div
          className="px-16 mt-10 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="border border-white border-opacity-50 rounded-md p-3"
            style={{ boxShadow: '0px 0px 10px rgba(199, 239, 255, 0.6)' }}
          >
            <div className="relative flex items-center justify-center">
              {/* 메인 타이틀 */}
              <motion.h2
                className="relative text-3xl font-bold text-center text-white"
                style={{
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.7)',
                  textShadow:
                    '0px 0px 5px rgba(255, 222, 160, 0.9), 0px 0px 20px rgba(237, 235, 100, 0.7)',
                }}
                animate={{
                  textShadow: [
                    '0px 0px 5px rgba(173, 216, 230, 0.9)',
                    '0px 0px 15px rgba(100, 149, 237, 0.7)',
                    '0px 0px 5px rgba(173, 216, 230, 0.973)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {selectedCourse.name}
              </motion.h2>
            </div>

            <p className="mt-2 text-sm text-gray-300">
              {selectedCourse.description}
            </p>
          </div>
        </motion.div>
        {/* 🎀 선택된 과목 정보 헤더 섹션 🔼*/}
        {/* ------------------------------------------------------------------------------------------- */}
        {/* 구분선 */}
        <div className="px-16 py-5 text-center">
          <span
            className="text-white font-bold text-2xl"
            style={{
              textShadow:
                '0px 0px 10px rgba(173, 216, 230, 0.9), 0px 0px 10px rgba(233, 222, 159, 0.699)',
            }}
          >
            ━━━━⊱✧⊰━━━━
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
                  boxShadow: isOpen
                    ? '0px 0px 10px rgba(199, 239, 255, 0.6)'
                    : '0px 0px 5px rgba(199, 239, 255, 0.3)',
                }}
                animate={
                  isOpen
                    ? {
                        boxShadow: [
                          '0px 0px 10px rgba(244, 206, 255, 0.6)',
                          '0px 0px 15px rgba(219, 199, 255, 0.9)',
                          '0px 0px 10px rgba(242, 221, 255, 0.6)',
                        ],
                      }
                    : {}
                }
                transition={
                  isOpen
                    ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                    : {}
                }
              >
                {/* DAY n */}
                <motion.div
                  className="flex items-center justify-between w-2/6 min-w-60 px-4 pl-8 pr-6 overflow-hidden flex-shrink-0 border border-opacity-25 border-white rounded-l-md shadow-lg cursor-pointer h-14"
                  style={{
                    background:
                      'linear-gradient(to top left, rgba(17, 28, 65, 0.5), rgba(9, 14, 44, 0.6), black, #051e25)',
                    transition:
                      'background 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  }}
                  onClick={() => handleDayClick(index)}
                  whileHover={{
                    background:
                      'linear-gradient(to  top left, rgba(19, 23, 77, 0.7), rgba(16, 25, 70, 0.8), black, #0a2038)',
                    boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                    scale: 1.01,
                  }}
                >
                  <motion.span
                    className="absolute left-[10px] text-sm text-white"
                    style={{
                      textShadow:
                        '0px 0px 10px rgba(173, 216, 230, 0.9), 0px 0px 20px rgba(255, 238, 139, 0.8), 0px 0px 10px rgba(255, 255, 255, 0.6)',
                    }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    ✦
                  </motion.span>
                  <div>
                    <span
                      className="font-bold text-white"
                      style={{
                        textShadow:
                          '0px 0px 10px rgba(173, 216, 230, 0.9), 0px 0px 20px rgba(139, 147, 255, 0.8), 0px 0px 10px rgba(255, 255, 255, 0.6)',
                      }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      DAY {dayItem.day}&nbsp;&nbsp;
                    </span>
                    <span className="text-md font-semibold text-white whitespace-nowrap">
                      |&nbsp;&nbsp;{dayItem.title}&nbsp;
                    </span>
                  </div>

                  {/* 펼치기/접기 버튼 (펼쳐지면 반짝반짝 ✨) */}
                  <motion.div
                    className="flex items-center justify-center w-8 h-8 text-white border border-yellow-100 rounded-full shadow-md relative overflow-hidden"
                    initial={{ scale: 1 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    whileHover={{
                      boxShadow:
                        '0 0 8px rgba(255, 235, 140, 0.7), 0 0 15px rgba(255, 231, 154, 0.5), 0 0 25px rgba(255, 245, 160, 0.3)',
                      scale: 1.1,
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* 부드러운 빛 퍼짐 효과 */}
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

                    {/* 반짝이는 효과 (펼쳐졌을 때) */}
                    {isOpen && (
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          opacity: [0.1, 0.5, 0.1],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}

                    {/* 아이콘 변경 (접힘: > / 펼쳐짐: 반짝반짝 <>) */}
                    <motion.div
                      animate={{
                        textShadow: isOpen
                          ? '0 0 6px rgba(255, 245, 180, 0.9), 0 0 12px rgba(255, 235, 140, 0.7), 0 0 18px rgba(255, 220, 100, 0.5)'
                          : 'none',
                      }}
                      transition={{
                        duration: 1,
                        repeat: isOpen ? Infinity : 0,
                        repeatType: 'reverse',
                      }}
                    >
                      {isOpen ? (
                        <FiChevronLeft size={18} color="#fde55a" />
                      ) : (
                        <FiChevronRight size={18} color="#fff098" />
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
                        <span className="text-md text-white truncate">
                          {dayItem.description}
                        </span>

                        {/* 시작하기 버튼 */}
                        <motion.button
                          className="ml-auto relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-500 text-white px-4 py-2 rounded-md shadow-md text-sm font-semibold"
                          whileHover={{
                            scale: 1.05,
                            background:
                              'linear-gradient(to right, #4F46E5, #204697)',
                            boxShadow: '0 0 10px rgba(79, 70, 229, 0.5)',
                            transition: { duration: 0.3, ease: 'easeInOut' },
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* 내부 반짝이는 효과 */}
                          <motion.div
                            className="absolute inset-0 opacity-30"
                            style={{
                              background:
                                'radial-gradient(circle, rgba(173, 216, 230, 0.5) 20%, transparent 70%)',
                              filter: 'blur(8px)',
                            }}
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                          {/* 반짝이는 선 효과 */}
                          <motion.div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                              background:
                                'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                              transform: 'translateX(-100%)',
                            }}
                            animate={{
                              transform: [
                                'translateX(-100%)',
                                'translateX(100%)',
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
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
        {isAdmin && uploadedPDFs.length > 0 && (
          <div className="px-16 text-center">
            {/* 구분선 */}
            <div className="py-20 text-center">
              <span
                className="text-white"
                style={{
                  textShadow:
                    '0 0 12px rgba(255, 223, 186, 0.8), 0 0 20px rgba(79, 131, 243, 0.6), 0 0 30px rgba(255, 247, 211, 0.4)',
                }}
              >
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
                className="text-3xl font-bold text-white flex items-center justify-center gap-2"
                style={{
                  textShadow:
                    '0 0 12px rgba(255, 223, 186, 0.8), 0 0 20px rgba(79, 131, 243, 0.6), 0 0 30px rgba(255, 247, 211, 0.4)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {workspace_id}님의
                <motion.div
                  animate={{
                    filter: [
                      'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(173, 216, 230, 0.6))',
                      'drop-shadow(0 0 15px rgba(255, 255, 255, 1)) drop-shadow(0 0 25px rgba(173, 216, 230, 0.8))',
                      'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(173, 216, 230, 0.6))',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                >
                  <FaRocket className="text-white drop-shadow-lg" size={28} />
                </motion.div>
              </motion.h2>

              {/* 별 장식 ✨ */}
              <motion.span
                className="absolute text-4xl text-white"
                style={{
                  transform:
                    'translate3d(-175px, 1px, 0) translate3d(-50%, -50%, 0) rotate(10deg)',
                  textShadow:
                    '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ✦
              </motion.span>
              <motion.span
                className="absolute text-2xl text-white"
                style={{
                  transform:
                    'translate3d(-175px, 30px, 0) translate3d(-50%, -50%, 0) rotate(50deg)',
                  textShadow:
                    '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ⚝
              </motion.span>
              <motion.span
                className="absolute font-bold text-xl text-white"
                style={{
                  transform:
                    'translate3d(-190px, 15px, 0) translate3d(-50%, -50%, 0) rotate(-2deg)',
                  textShadow:
                    '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ⭑
              </motion.span>
              <motion.span
                className="absolute font-bold text-3xl text-white"
                style={{
                  transform:
                    'translate3d(-50%, -50%, 0) translate3d(165px, -4px, 0) rotate(10deg)',
                  textShadow:
                    '0 0 8px rgba(212, 186, 255, 0.8), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 247, 211, 0.4)',
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  textShadow:
                    '0 0 12px rgba(255, 123, 196, 1), 0 0 20px rgba(79, 131, 243, 0.8), 0 0 30px rgba(255, 247, 211, 0.6)',
                  transition: { duration: 0.4, ease: 'easeInOut' },
                }}
              >
                ⯎
              </motion.span>
              <motion.span
                className="absolute font-bold text-xl text-white"
                style={{
                  transform:
                    'translate3d(-50%, -50%, 0) translate3d(165px, -4px, 0) rotate(10deg)',
                  textShadow:
                    '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ⭑
              </motion.span>
              <motion.span
                className="absolute font-bold text-xl text-white"
                style={{
                  transform:
                    'translate3d(-50%, -50%, 0) translate3d(175px, 30px, 0) rotate(10deg)',
                  textShadow:
                    '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ✣
              </motion.span>

              <motion.h2
                className="text-5xl font-bold text-center text-white"
                style={{
                  fontFamily: 'HakgyoansimByeolbichhaneulTTF-B',
                  textShadow:
                    '0 0 12px rgba(186, 230, 255, 0.8), 0 0 20px rgba(79, 131, 243, 0.6), 0 0 25px rgba(255, 247, 211, 0.4)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  textShadow:
                    '0 0 12px rgba(84, 185, 252, 1), 0 0 20px rgba(79, 131, 243, 0.8), 0 0 30px rgba(255, 247, 211, 0.6)',
                  transition: { duration: 0.4, ease: 'easeInOut' },
                }}
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
                  은하 학습 노선도
                </motion.h2>
              </motion.h2>
            </motion.div>

            <p className="text-sm text-gray-300 mt-2">
              관리자가 업로드한 학습 자료를 활용해 맞춤형 여정을 떠나세요! 🌌
            </p>

            {/* 구분선 */}
            <div className="px-16 py-5 text-center">
              <span
                className="text-white font-bold text-2xl"
                style={{
                  textShadow:
                    '0px 0px 10px rgba(173, 216, 230, 0.9), 0px 0px 10px rgba(233, 222, 159, 0.699)',
                }}
              >
                ━━━━⊱✧⊰━━━━
              </span>
            </div>

            {/* 📖 업로드된 PDF 갤러리 */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
              {uploadedPDFs.map((title, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center justify-between px-6 py-8 w-11/12 h-56 text-center bg-gradient-to-r from-[#1c2331] via-[#283347] to-[#0f1722] border border-gray-600 shadow-lg rounded-lg transform transition-all"
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
                      '10px 10px 25px rgba(79, 131, 243, 0.2), 0 0 10px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* 📚 책 등 */}
                  <div
                    className="absolute left-0 top-0 h-full w-12"
                    style={{
                      background: 'linear-gradient(to right, #2a3243, #1e2637)',
                      borderRadius: '20px 0 0 20px',
                      boxShadow: 'inset 4px 0 8px rgba(0, 0, 0, 0.5)',
                      zIndex: 10, // 책등은 낮은 z-index
                    }}
                  ></div>

                  {/* 📜 책 제목 */}
                  <h3
                    className="relative z-20 text-xl font-semibold text-white" // z-index를 높게 설정
                    style={{
                      textShadow:
                        '0 0 8px rgba(173, 216, 230, 0.8), 0 0 15px rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    {title}
                  </h3>

                  {/* ✨ 책 커버 장식 */}
                  <motion.span
                    className="absolute text-3xl text-white z-10"
                    style={{
                      transform: 'translate3d(-135px, -44px, 0) rotate(20deg)',
                      textShadow:
                        '0 0 10px rgba(222, 240, 255, 0.8), 0 0 20px rgba(255, 236, 149, 0.6), 0 0 30px rgba(255, 236, 149, 0.4)',
                    }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    ✦
                  </motion.span>

                  {/* 시작하기 버튼 */}
                  <motion.button
                    className="mt-auto relative overflow-hidden bg-transparent text-white px-4 py-2 rounded-md text-sm font-semibold border border-white shadow-md"
                    whileHover={{
                      scale: 1.05,
                      borderColor: '#fff2c8', // 테두리 색상 변경
                      boxShadow: '0 0 10px rgba(255, 228, 193, 0.5)', // 테두리에 반짝임
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* 테두리 반짝이는 효과 */}
                    <motion.div
                      className="absolute inset-0 rounded-md border-2 border-transparent"
                      style={{
                        borderImage:
                          'linear-gradient(to right, #fff2a8, #b7beff) 1',
                      }}
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
                    <span
                      style={{
                        textShadow:
                          '0px 0px 5px rgba(173, 216, 230, 0.9), 0px 0px 5px rgba(233, 222, 159, 0.699)',
                      }}
                    >
                      {' '}
                      시작하기
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {/* 🚀 커스텀 학습 섹션 🔼 */}
        {/* ------------------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
}
