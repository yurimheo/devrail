import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle } from 'lucide-react';
import { FiLogIn, FiTrash2, FiInfo } from 'react-icons/fi'; // 로그인, 삭제, 정보 아이콘
import { FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiKubernetes, SiArgo, SiJenkins, SiAnsible } from 'react-icons/si';

// 💠 학습 코스 데이터
import { courses } from '../data/courses';

// 💠 과목 아이콘 컴포넌트
import CourseIcons from '../components/CourseIcons';

export default function PracticePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // 💥임시 유형 여부 판단 함수
  const [isCompanyUser, setIsCompanyUser] = useState(false); // 개인/기업 유저 유형 여부
  const [hasWorkspace, setHasWorkspace] = useState(false); // 워크스페이스 존재 여부

  // 💠 현재 코스 찾기
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

  // 💠 DAY 목록
  const outlineData = useMemo(
    () => selectedCourse?.outline || [],
    [selectedCourse],
  );

  // 🔹 `useState` 를 사용하여 현재 펼쳐진 DAY 인덱스를 관리
  // expandedDayIndex -> 현재 펼쳐져 있는 DAY의 index를 저장하는 상태 변수
  // setExpandedDayIndex → 상태를 변경하는 함수
  const [expandedDayIndex, setExpandedDayIndex] = useState(0);

  // 🔹 코스(과목)가 바뀔 때마다 DAY1만 펼치도록 재설정
  useEffect(() => {
    if (outlineData.length > 0) {
      setExpandedDayIndex(0);
    }
  }, [outlineData]);

  // 💠 과목 아이콘 클릭
  const handleSelectCourse = (clickedId) => {
    const target = courses.find((c) => c.id === clickedId);
    if (target && !target.isDisabled) {
      navigate(`/practice/${clickedId}`);
    }
  };

  // 🔹 DAY 클릭 시 하나만 펼쳐지도록 하기
  const handleDayClick = (index) => {
    setExpandedDayIndex((prev) => (prev === index ? -1 : index));
  };

  // 💠 워크스페이스 생성하기 모달창 ---------------------------------------------------------------------
  // 🔹 과목 선택을 위한 과목
  const subjects = [
    {
      name: 'Docker',
      icon: <FaDocker className="w-8 h-8 text-blue-500" />,
      tooltip:
        '🐳 Docker의 기본 개념과 컨테이너 기술을 학습하고, 직접 컨테이너를 만들어 실행해 봅니다!',
    },
    {
      name: 'Kubernetes',
      icon: <SiKubernetes className="w-8 h-8 text-blue-600" />,
      tooltip:
        '☸️ Kubernetes의 구조와 개념을 이해하고, 클러스터 환경에서 컨테이너를 자동으로 관리하는 방법을 배웁니다!',
    },
    {
      name: 'Ansible',
      icon: <SiAnsible className="w-8 h-8 text-gray-700" />,
      tooltip:
        '⚙️ 서버 자동화 개념을 배우고, Ansible을 이용하여 대규모 시스템을 효율적으로 관리하는 방법을 익힙니다!',
    },
    {
      name: 'Jenkins',
      icon: <SiJenkins className="w-8 h-8 text-red-600" />,
      tooltip:
        '🤖 CI/CD 개념을 배우고, Jenkins를 활용하여 자동화된 빌드 및 배포 환경을 구축하는 방법을 학습합니다!',
    },
    {
      name: 'ArgoCD',
      icon: <SiArgo className="w-8 h-8 text-orange-500" />,
      tooltip:
        '🚀 GitOps 방식의 배포를 배우고, ArgoCD를 활용하여 애플리케이션을 자동으로 배포하는 방법을 익힙니다!',
    },
    {
      name: 'Git',
      icon: <FaGitAlt className="w-8 h-8 text-red-500" />,
      tooltip:
        '🔧 Git의 기본 개념과 협업 방법을 익히고, 브랜치, 머지, 충돌 해결 등의 실전 활용법을 배웁니다!',
    },
  ];

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 리소스 설정
  const [cpu, setCpu] = useState(1); // 🖥️ CPU 설정 (기본 1)
  const [ram, setRam] = useState(2); // 🖥️ RAM 설정 (기본 2)
  const [isCustom, setIsCustom] = useState(false); // ✅ 기본 ↔ 사용자 정의 토글
  // ------------------------------------------------------------------------------------------------------

  return (
    <div className=" min-h-screen">
      <div className="w-full mx-auto pt-2 pb-16 flex justify-center bg-white">
        <div className="container p-8 bg-white ">
          {/* 💥임시 판단을 위한 고정 버튼 (유저 상태 변경) */}
          <button
            onClick={() => setIsCompanyUser((prev) => !prev)}
            className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600"
          >
            {isCompanyUser ? '기업 유저' : '개인 유저'}
          </button>

          {isCompanyUser && (
            <button
              onClick={() => setHasWorkspace((prev) => !prev)}
              className="absolute top-12 right-4 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600"
            >
              {hasWorkspace ? '워크스페이스 삭제' : '워크스페이스 생성'}
            </button>
          )}

          {/* 상단: 과목 아이콘 */}
          <CourseIcons
            courses={courses}
            selectedCourse={selectedCourse?.id}
            onSelectCourse={handleSelectCourse}
          />

          {/* 💚 워크스페이스 배너 💚 */}
          <div className="mt-10 px-4 md:px-24">
            <div
              className={`rounded-xl shadow-sm border overflow-hidden transition-all duration-500
    ${
      isCompanyUser
        ? hasWorkspace
          ? 'bg-gradient-to-br from-purple-100 to-blue-100' // ✅ 기업 - 워크스페이스 생성 후
          : 'bg-gradient-to-br from-blue-100 to-pink-50' // ✅ 기업 - 워크스페이스 생성 전
        : 'bg-gray-100 ' // ✅ 개인 유저
    }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
                <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                  {/* 제목 애니메이션 */}
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-3xl font-bold text-gray-800 mb-2"
                  >
                    {isCompanyUser
                      ? hasWorkspace
                        ? '워크스페이스 연결 완료! 팀과 함께하세요.'
                        : '지금, 우리 팀을 위한 워크스페이스를 생성하세요!'
                      : '엔터프라이즈 전용 기능, 워크스페이스!'}
                  </motion.h2>

                  {/* 설명 애니메이션 */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-gray-600 max-w-3xl"
                  >
                    {isCompanyUser
                      ? hasWorkspace
                        ? '당신의 팀에 맞게 최적화된 공간! 워크스페이스를 구축하고 맞춤형 협업 환경을 만들어보세요.'
                        : '지금 바로 워크스페이스를 생성하고 팀의 생산성을 극대화하세요. 효율적인 협업 환경을 구축할 수 있습니다.'
                      : '새로운 차원의 협업을 경험하세요! 엔터프라이즈 워크스페이스에서 팀과 함께 더 스마트하게 일하세요.'}
                  </motion.p>
                </div>

                {/* 버튼 표시 분기 */}
                {isCompanyUser ? (
                  hasWorkspace ? (
                    // ✅ 기업 유저 & 워크스페이스가 존재하는 경우 → "워크스페이스 들어가기 / 삭제하기" 버튼 표시
                    <div className="flex-shrink-0 flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gradient-to-br from-purple-400 to-blue-300 hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-300 text-white px-6 py-3 rounded-full transition shadow-md hover:shadow-lg"
                        onClick={() => navigate('/workspaces/heoyurim0322')} // 💥 임시 이동
                      >
                        <FiLogIn className="w-5 h-5" />{' '}
                        {/* 워크스페이스 들어가기 아이콘 */}
                        워크스페이스 들어가기
                      </motion.button>
                      <motion.button
                        onClick={() => setHasWorkspace(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-full transition shadow-md hover:shadow-lg"
                      >
                        <FiTrash2 className="w-5 h-5" /> {/* 삭제 아이콘 */}
                        삭제하기
                      </motion.button>
                    </div>
                  ) : (
                    // ✅ 기업 유저 & 워크스페이스가 없는 경우 → 기존 "새 워크스페이스" 버튼 표시
                    <div className="flex-shrink-0">
                      <motion.button
                        onClick={() => setIsModalOpen(true)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center bg-gradient-to-br from-pink-400 to-blue-200 hover:bg-gradient-to-br hover:from-pink-500 hover:to-blue-300 text-white px-6 py-3 rounded-full transition shadow-md hover:shadow-lg"
                      >
                        <PlusCircle className="mr-2 h-5 w-5" /> 새 워크스페이스
                      </motion.button>

                      {/* 🛑 모달 */}
                      <AnimatePresence>
                        {isModalOpen && (
                          <motion.div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                              setIsModalOpen(false);
                              setSelectedSubject(null);
                            }}
                          >
                            <motion.div
                              className="bg-white p-6 rounded-2xl shadow-2xl w-[450px]"
                              initial={{ opacity: 0, scale: 0.8, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8, y: 20 }}
                              transition={{ duration: 0.4, ease: 'easeOut' }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* 모달 헤더 */}
                              <div className="flex justify-between items-center">
                                <motion.h2
                                  initial={{ opacity: 0, x: -50 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.6,
                                    ease: 'easeOut',
                                    delay: 0.2,
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                  className="text-2xl font-semibold text-gray-800"
                                >
                                  워크스페이스 생성
                                  {selectedSubject && (
                                    <span className="text-blue-500 font-bold ml-2">
                                      - {selectedSubject}
                                    </span>
                                  )}
                                </motion.h2>

                                {/* 닫기 버튼 */}
                                <button
                                  onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedSubject(null);
                                  }}
                                  className="p-2 rounded-full hover:bg-gray-200 transition"
                                >
                                  <X className="w-6 h-6" />
                                </button>
                              </div>

                              {/* 과목 선택 */}
                              <div className="mt-5">
                                {/* 💚 과목 선택 💚 */}
                                <div className="relative flex items-center mt-4">
                                  <div className="flex-grow border-t border-gray-300"></div>
                                  <span className="mx-4 text-blue-500 text-lg font-semibold">
                                    과목 선택
                                  </span>
                                  <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-3">
                                  {subjects.map((subject, index) => (
                                    <motion.div
                                      key={subject.name}
                                      initial={{
                                        opacity: 0,
                                        x: -50,
                                        scale: 0.9,
                                      }}
                                      animate={{ opacity: 1, x: 0, scale: 1 }}
                                      transition={{
                                        duration: 0.5,
                                        ease: 'easeOut',
                                        delay: index * 0.1,
                                      }}
                                      className="relative group"
                                    >
                                      <motion.button
                                        onClick={() =>
                                          setSelectedSubject(subject.name)
                                        }
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center justify-center w-28 h-28 p-4 rounded-xl transition shadow-md text-center ${
                                          selectedSubject === subject.name
                                            ? 'border-2 border-blue-500 bg-blue-100 shadow-lg'
                                            : 'border border-gray-300 hover:border-gray-500 bg-white'
                                        }`}
                                      >
                                        <div className="w-10 h-10 flex items-center justify-center">
                                          {subject.icon}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 mt-2">
                                          {subject.name}
                                        </span>
                                      </motion.button>

                                      {/* 말풍선 (호버 시 표시) */}
                                      <div className="absolute left-1/2 -translate-x-1/2 -top-14 hidden group-hover:flex bg-white text-gray-700 text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-gray-300 whitespace-nowrap">
                                        {subject.tooltip}
                                        <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white transform rotate-45 border-b border-r border-gray-300"></div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              {/* 💚 리소스 설정 💚 */}
                              <div className="relative flex items-center mt-8">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-4 text-blue-500 text-lg font-semibold">
                                  리소스 설정
                                </span>
                                <div className="flex-grow border-t border-gray-300"></div>
                              </div>

                              {/* 기본 ↔ 사용자 정의 토글 스위치 */}
                              <div className="mt-8 flex items-center justify-center gap-6">
                                {/* 기본 리소스 */}
                                <span
                                  className={`${
                                    !isCustom
                                      ? 'text-gray-800 font-bold'
                                      : 'text-gray-700 font-medium'
                                  }`}
                                >
                                  기본 리소스
                                </span>

                                {/* 토글 */}
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isCustom}
                                    onChange={() => {
                                      if (isCustom) {
                                        // 기본 리소스로 돌아올 때 CPU와 RAM 초기화
                                        setCpu(1);
                                        setRam(2);
                                      }
                                      setIsCustom(!isCustom);
                                    }}
                                  />
                                  {/* 토글 배경 */}
                                  <div className="w-16 h-8 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-all relative">
                                    {/* 토글 동그라미 */}
                                    <span
                                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                                        isCustom
                                          ? 'translate-x-8'
                                          : 'translate-x-1'
                                      }`}
                                    ></span>
                                  </div>
                                </label>

                                {/* 사용자 정의 */}
                                <span
                                  className={`${
                                    isCustom
                                      ? 'text-blue-500 font-bold'
                                      : 'text-gray-700 font-medium'
                                  }`}
                                >
                                  사용자 정의
                                </span>
                              </div>

                              {/* ⚠️ 워크스페이스 리소스 정보 */}
                              <p className="mt-5 text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
                                ⚠️{' '}
                                {isCustom ? (
                                  <>
                                    <span className="text-gray-500">
                                      워크스페이스 인당 할당 리소스:&nbsp;
                                    </span>
                                    <span className="text-blue-600 font-semibold">
                                      {cpu} CPU / {ram} GB RAM
                                    </span>
                                  </>
                                ) : (
                                  <span>
                                    <strong className="font-bold">기본</strong>{' '}
                                    워크스페이스 인당 할당 리소스: 1 CPU, 2GB
                                    RAM
                                  </span>
                                )}
                              </p>

                              {/* ✅ 사용자 정의 리소스 설정*/}
                              <AnimatePresence>
                                {isCustom && (
                                  <motion.div
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    animate={{ opacity: 1, scaleY: 1 }}
                                    exit={{ opacity: 0, scaleY: 0 }}
                                    transition={{
                                      duration: 0.4,
                                      ease: 'easeInOut',
                                    }}
                                    className="mt-5 space-y-5 bg-gray-100 p-5 rounded-xl shadow-md border border-gray-200 origin-top overflow-hidden"
                                  >
                                    {/* CPU 설정 */}
                                    <div className="flex items-center gap-4">
                                      <span className="flex items-center gap-2 text-gray-700 font-semibold w-20">
                                        <i className="text-blue-500 text-lg">
                                          ⚙️
                                        </i>{' '}
                                        CPU
                                      </span>
                                      <input
                                        type="range"
                                        min="1"
                                        max="16"
                                        value={cpu}
                                        onChange={(e) => setCpu(e.target.value)}
                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                        style={{
                                          background: `linear-gradient(to right, #3b82f6 ${((cpu - 1) / 15) * 100}%, #d1d5db ${((cpu - 1) / 15) * 100}%)`,
                                        }}
                                      />
                                      <input
                                        type="number"
                                        min="1"
                                        max="16"
                                        value={cpu}
                                        onChange={(e) =>
                                          setCpu(Number(e.target.value))
                                        }
                                        className="w-16 p-2 border rounded-md text-center shadow-sm focus:ring-2 focus:ring-blue-500"
                                      />
                                    </div>

                                    {/* RAM 설정 */}
                                    <div className="flex items-center gap-4">
                                      <span className="flex items-center gap-2 text-gray-700 font-semibold w-20">
                                        <i className="text-green-500 text-lg">
                                          💾
                                        </i>{' '}
                                        RAM
                                      </span>
                                      <input
                                        type="range"
                                        min="2"
                                        max="64"
                                        value={ram}
                                        onChange={(e) => setRam(e.target.value)}
                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-500"
                                        style={{
                                          background: `linear-gradient(to right, #10b981 ${((ram - 2) / 62) * 100}%, #d1d5db ${((ram - 2) / 62) * 100}%)`,
                                        }}
                                      />
                                      <input
                                        type="number"
                                        min="2"
                                        max="64"
                                        value={ram}
                                        onChange={(e) =>
                                          setRam(Number(e.target.value))
                                        }
                                        className="w-16 p-2 border rounded-md text-center shadow-sm focus:ring-2 focus:ring-green-500"
                                      />
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* 생성하기 버튼 */}
                              <motion.button
                                className={`mt-6 w-full py-3 rounded-xl font-medium text-lg transition ${
                                  selectedSubject
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                onClick={() => {
                                  if (selectedSubject) {
                                    alert(
                                      `"${selectedSubject}" 워크스페이스 생성됨!`,
                                    );
                                    setIsModalOpen(false);
                                    setHasWorkspace(true);
                                  }
                                }}
                                disabled={!selectedSubject}
                                whileTap={{ scale: 0.95 }}
                              >
                                워크스페이스 생성하기
                              </motion.button>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                ) : (
                  // ✅ 개인 유저일 때 "워크스페이스에 대해 알아보기" 버튼 표시
                  <div className="flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-full transition shadow-md hover:shadow-lg"
                      onClick={() => navigate('/workspaces/info')}
                    >
                      <FiInfo className="w-5 h-5" /> {/* 정보 아이콘 */}
                      워크스페이스에 대해 알아보기
                    </motion.button>
                  </div>
                )}
              </div>

              {/* 색상 변화하는 애니메이션 바 */}
              <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animated-gradient-bar"></div>
            </div>
          </div>

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
              const isOpen = expandedDayIndex === index;

              return (
                <div
                  key={index}
                  className="flex items-center bg-white overflow-hidden h-14"
                >
                  {/* DAY n*/}
                  <div
                    className="w-2/6 flex items-center justify-between px-4 border rounded-md shadow bg-gray-100 overflow-hidden h-14 pl-8 pr-6 cursor-pointer"
                    onClick={() => handleDayClick(index)}
                  >
                    <div>
                      <span className="font-bold text-blue-600">
                        DAY {dayItem.day}&nbsp;&nbsp;
                      </span>
                      <span className="font-semibold text-gray-800 whitespace-nowrap">
                        |&nbsp;&nbsp;{dayItem.title}&nbsp;
                      </span>
                    </div>

                    {/* 펼치기 및 접기 버튼 */}
                    <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-700">
                      {isOpen ? '<' : '>'}
                    </div>
                  </div>

                  {/* 슬라이드 영역 */}
                  <AnimatePresence mode="sync">
                    {isOpen && (
                      <motion.div
                        key="slide"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 800, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center bg-white h-full overflow-hidden"
                        style={{ height: '56px' }}
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
