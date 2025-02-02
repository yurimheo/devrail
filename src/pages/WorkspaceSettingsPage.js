import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClipboard,
  FiRefreshCcw,
  FiUpload,
  FiUsers,
  FiCheckSquare,
  FiTrash,
  FiTrash2,
} from 'react-icons/fi';
import { TiUserDelete } from 'react-icons/ti';
import { MdOutlineArrowBackIosNew, MdDeleteForever } from 'react-icons/md';
import {
  AiOutlineUserDelete,
  AiOutlineUserAdd,
  AiOutlineUsergroupDelete,
} from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

export default function WorkspaceSettingsPage() {
  const navigate = useNavigate();
  const { workspace_id } = useParams(); // 워크스페이스 ID 가져오기

  const [inviteCode, setInviteCode] = useState(generateInviteCode());
  const [selectedTab, setSelectedTab] = useState('users'); // "users" | "pdfs"
  const [showResetModal, setShowResetModal] = useState(false);
  const [showCopySnackbar, setShowCopySnackbar] = useState(false);
  const [showResetSnackbar, setShowResetSnackbar] = useState(false);
  const [showPdfUploadSnackbar, setShowPdfUploadSnackbar] = useState(false);
  const [showDeleteSnackbar, setShowDeleteSnackbar] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState({
    show: false,
    type: '',
    targetId: null,
  });

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

  const [showBackTooltip, setShowBackTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBackTooltip(false), 3000); // 3초 후 자동 숨김
    return () => clearTimeout(timer);
  }, []);

  const [invitedUsers, setInvitedUsers] = useState([
    { id: 1, name: '사용자1', email: 'user1@example.com', selected: false },
    { id: 2, name: '사용자2', email: 'user2@example.com', selected: false },
    { id: 3, name: '사용자3', email: 'user3@example.com', selected: false },
    { id: 4, name: '사용자4', email: 'user4@example.com', selected: false },
    { id: 5, name: '사용자5', email: 'user5@example.com', selected: false },
    { id: 6, name: '사용자6', email: 'user6@example.com', selected: false },
    { id: 7, name: '사용자7', email: 'user7@example.com', selected: false },
    { id: 8, name: '사용자8', email: 'user8@example.com', selected: false },
    { id: 9, name: '사용자9', email: 'user9@example.com', selected: false },
    { id: 10, name: '사용자10', email: 'user10@example.com', selected: false },
    { id: 11, name: '사용자11', email: 'user11@example.com', selected: false },
    { id: 12, name: '사용자12', email: 'user12@example.com', selected: false },
  ]);
  const [uploadedPDFs, setUploadedPDFs] = useState([
    { id: 1, name: 'GitHub 기초.pdf', selected: false },
    { id: 2, name: 'GitHub 명령어 정리.pdf', selected: false },
    { id: 3, name: 'GitHub 브랜치 관리.pdf', selected: false },
    { id: 4, name: 'GitHub 협업 가이드.pdf', selected: false },
    { id: 5, name: 'GitHub Actions 활용.pdf', selected: false },
    { id: 6, name: 'GitHub Issues & PR 관리.pdf', selected: false },
    { id: 7, name: 'GitHub Pages로 배포하기.pdf', selected: false },
    { id: 8, name: 'GitHub API 활용.pdf', selected: false },
    { id: 9, name: 'GitHub 보안 및 권한 관리.pdf', selected: false },
    { id: 10, name: 'GitHub 고급 사용법.pdf', selected: false },
  ]);

  // 💠 총 참여 인원수 관리
  const [participantCount, setParticipantCount] = useState(invitedUsers.length);
  // eslint-disable-next-line no-unused-vars
  const [maxParticipants, setMaxParticipants] = useState(15);

  useEffect(() => {
    setParticipantCount(invitedUsers.length);
  }, [invitedUsers]);

  // 💠 초대 코드 모달 상태 관리
  const [showInviteModal, setShowInviteModal] = useState(false);

  function generateInviteCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  function handleResetInviteCode() {
    setShowResetModal(false);
    setInviteCode(generateInviteCode());
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.pdf')) {
      setUploadedPDFs([
        ...uploadedPDFs,
        { id: Date.now(), name: file.name, selected: false },
      ]);
      // ✅ PDF 업로드 완료 스낵바 표시
      setShowPdfUploadSnackbar(true);
      setTimeout(() => setShowPdfUploadSnackbar(false), 2000);
    }
  }

  function handleCopyInviteCode() {
    navigator.clipboard.writeText(inviteCode);
    setShowCopySnackbar(true);
    setTimeout(() => setShowCopySnackbar(false), 2000);
  }

  function handleSelectAll(list, setList) {
    const isAllSelected = list.every((item) => item.selected);
    setList(list.map((item) => ({ ...item, selected: !isAllSelected })));
  }

  function handleToggleSelect(id, list, setList) {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  }

  function handleConfirmAction() {
    if (showConfirmModal.type === 'removeUser') {
      setInvitedUsers(
        invitedUsers.filter((user) => user.id !== showConfirmModal.targetId),
      );
    } else if (showConfirmModal.type === 'removeAllUsers') {
      setInvitedUsers([]);
    } else if (showConfirmModal.type === 'removeSelectedUsers') {
      setInvitedUsers(
        invitedUsers.filter(
          (user) => !showConfirmModal.targetIds.includes(user.id),
        ),
      );
    } else if (showConfirmModal.type === 'removePDF') {
      setUploadedPDFs(
        uploadedPDFs.filter((file) => file.id !== showConfirmModal.targetId),
      );
    } else if (showConfirmModal.type === 'removeAllPDFs') {
      setUploadedPDFs([]);
    } else if (showConfirmModal.type === 'removeSelectedPDFs') {
      setUploadedPDFs(
        uploadedPDFs.filter(
          (file) => !showConfirmModal.targetIds.includes(file.id),
        ),
      );
    }

    setShowConfirmModal({ show: false, type: '', targetId: null });

    // ✅ 삭제 완료 스낵바 띄우기
    setShowDeleteSnackbar(true);
    setTimeout(() => setShowDeleteSnackbar(false), 2000); // 2초 후 사라짐
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

      <div
        className="container relative z-20 p-8 mx-auto bg-gray-500 border border-opacity-50 rounded-lg border-blue-950 bg-opacity-5"
        style={{ boxShadow: '0px 0px 10px rgba(199, 239, 255, 0.6)' }}
      >
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
                'translate3d(-190px, 1px, 0) translate3d(-50%, -50%, 0) rotate(-10deg)',
              textShadow:
                '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✧
          </motion.span>
          <motion.span
            className="absolute font-bold text-xl text-white"
            style={{
              transform:
                'translate3d(-190px, 30px, 0) translate3d(-50%, -50%, 0) rotate(50deg)',
              textShadow:
                '0 0 8px rgba(222, 240, 255, 1), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 236, 149, 0.4)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✦
          </motion.span>
          <motion.span
            className="absolute font-bold text-xl text-white"
            style={{
              transform:
                'translate3d(-50%, -50%, 0) translate3d(190px, 15px, 0) rotate(20deg)',
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
                'translate3d(-50%, -50%, 0) translate3d(190px, 35px, 0) rotate(30deg)',
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
            className="absolute font-bold text-2xl text-white"
            style={{
              transform:
                'translate3d(-50%, -50%, 0) translate3d(190px, -5px, 0) rotate(10deg)',
              textShadow:
                '0 0 8px rgba(255, 239, 186, 0.8), 0 0 15px rgba(235, 255, 119, 0.6), 0 0 25px rgba(255, 247, 211, 0.4)',
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              textShadow:
                '0 0 12px rgba(255, 123, 196, 1), 0 0 20px rgba(79, 131, 243, 0.8), 0 0 30px rgba(255, 247, 211, 0.6)',
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
          >
            ⛏
          </motion.span>

          {/* 워크스페이스 타이틀 */}
          <motion.h1
            className="text-5xl font-bold text-center text-white"
            style={{
              fontFamily: 'HakgyoansimByeolbichhaneulTTF-B',
              textShadow:
                '0 0 12px rgba(255, 166, 166, 0.8), 0 0 20px rgba(158, 189, 255, 0.6), 0 0 25px rgba(255, 247, 211, 0.4)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              textShadow:
                '0 0 12px rgba(245, 111, 156, 1), 0 0 20px rgba(79, 131, 243, 0.8), 0 0 30px rgba(255, 247, 211, 0.6)',
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
              워크스페이스 설정
            </motion.h1>
          </motion.h1>
        </motion.div>
        <p className="text-xs text-white text-opacity-80 text-center leading-relaxed">
          <span className="relative">은하를 가로지르는 학습 기차</span>
          , 이제 출발합니다!
          <br />
          <span
            className="relative px-1 border border-white rounded-md border-opacity-55 font-bold"
            style={{
              background:
                'linear-gradient(to top right, rgba(255, 221, 89, 0.6), rgba(255, 160, 186, 0.8), rgba(144, 202, 249, 0.6))',
            }}
          >
            초대 코드
          </span>
          &nbsp;를 공유해 새로운 승객을 태우고,
          <br />
          <span className="relative font-semibold after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[1px] after:bg-gradient-to-r after:from-cyan-200 after:via-pink-300 after:to-yellow-200 after:opacity-50">
            PDF 학습 자료
          </span>
          를 업로드하여 더 넓은 세계로 향해보세요!
        </p>
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        {/* 뒤로가기 버튼 */}
        <AnimatePresence>
          {showBackTooltip && (
            <motion.div
              className="absolute left-8 w-[180px] px-3 py-1.5 text-[11px] font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow-lg text-center"
              style={{
                top: '60px',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              이 버튼을 눌러 워크스페이스로 돌아갈 수 있어요!
              {/* 말풍선 꼬리 추가 */}
              <div
                className="absolute w-2 h-2 bg-white border border-gray-300"
                style={{
                  top: '-5px',
                  left: '10px',
                  transform: 'translateX(-50%) rotate(45deg)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="absolute top-4 left-4 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          onClick={() => navigate(`/workspaces/${workspace_id}`)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{
            scale: 1.1,
            x: -2,
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setShowBackTooltip(true)}
          onMouseLeave={() => setShowBackTooltip(false)}
        >
          <motion.span
            style={{
              filter:
                'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(230, 220, 173, 0.6))',
              display: 'inline-block',
            }}
            animate={{
              textShadow:
                '0 0 10px rgba(253, 255, 131, 0.8), 0 0 20px rgba(230, 220, 173, 0.6)',
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <MdOutlineArrowBackIosNew
              size={24}
              className="text-white"
              style={{
                filter:
                  'drop-shadow(0 0 15px rgba(253, 255, 131, 0.8)) drop-shadow(0 0 15px rgba(230, 220, 173, 0.6))',
              }}
            />
          </motion.span>
        </motion.button>
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        {/* 🎀 초대 코드 섹션 🔽 */}
        <motion.div
          className="px-16 mt-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="border border-white border-opacity-50 rounded-md px-8 py-3 flex justify-between items-center"
            style={{ boxShadow: '0px 0px 10px rgba(199, 239, 255, 0.6)' }}
          >
            <span
              className="text-lg font-bold text-white"
              style={{
                textShadow:
                  '0 0 10px rgba(253, 255, 131, 0.8), 0 0 20px rgba(230, 220, 173, 0.6)',
              }}
            >
              초대 코드: {inviteCode}
            </span>

            {/* 초대 코드 복사/초기화 및 PDF 업로드 버튼*/}
            <div className="flex gap-3">
              {/* 📋 초대 코드 복사 버튼 */}
              <motion.button
                className="relative px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md overflow-hidden"
                style={{
                  background: 'transparent',
                  borderBottom: '3px solid rgba(120, 180, 255, 0.8)', // 하늘색
                  transition: 'all 0.3s ease-in-out',
                }}
                whileHover={{
                  scale: 1.05,
                  borderBottom: '3px solid rgba(160, 210, 255, 1)',
                  boxShadow: '0px 4px 12px rgba(120, 180, 255, 0.6)',
                  transition: { duration: 0.3, ease: 'easeInOut' },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleCopyInviteCode(); // 초대 코드 복사 실행
                  setShowCopySnackbar(true); // 복사 스낵바 표시
                  setTimeout(() => setShowCopySnackbar(false), 2000); // 2초 후 사라짐
                }}
              >
                <FiClipboard className="text-white text-lg" /> 복사
              </motion.button>

              {/* 🔄 초대 코드 초기화 버튼 */}
              <motion.button
                className="relative px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md overflow-hidden"
                style={{
                  background: 'transparent',
                  borderBottom: '3px solid rgba(255, 140, 200, 0.8)', // 핑크빛 레드
                  transition: 'all 0.3s ease-in-out',
                }}
                whileHover={{
                  scale: 1.05,
                  borderBottom: '3px solid rgba(255, 170, 220, 1)',
                  boxShadow: '0px 4px 12px rgba(255, 140, 200, 0.6)',
                  transition: { duration: 0.3, ease: 'easeInOut' },
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0px 4px 12px rgba(255, 140, 200, 0.3)',
                    '0px 6px 15px rgba(255, 170, 220, 0.5)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                onClick={() => setShowResetModal(true)}
              >
                <FiRefreshCcw className="text-white text-lg" /> 초기화
              </motion.button>

              {/* 📂 PDF 업로드 버튼 */}
              <motion.label
                className="relative px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md cursor-pointer overflow-hidden"
                style={{
                  background: 'transparent',
                  borderBottom: '3px solid rgba(160, 230, 160, 0.8)', // 파스텔 그린
                  transition: 'all 0.3s ease-in-out',
                }}
                whileHover={{
                  scale: 1.05,
                  borderBottom: '3px solid rgba(190, 250, 190, 1)',
                  boxShadow: '0px 4px 12px rgba(160, 230, 160, 0.6)',
                  transition: { duration: 0.3, ease: 'easeInOut' },
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0px 4px 12px rgba(160, 230, 160, 0.3)',
                    '0px 6px 15px rgba(190, 250, 190, 0.5)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <FiUpload className="text-white text-lg" /> PDF 업로드
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </motion.label>
            </div>
          </div>
        </motion.div>
        {/* 🎀 초대 코드 섹션 🔼 */}
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        {/* 🎀 초대된 사용자 목록 및 업로드된 PDF 파일 목록 섹션 🔽 */}
        <div className="relative mt-6 px-16">
          {/* 탭 버튼 */}
          <div className="flex border-b border-opacity-25 border-white p-2 relative">
            {['users', 'pdfs'].map((tab) => (
              <div
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`relative flex-1 text-center py-3 cursor-pointer text-lg font-medium transition-all duration-300 ${
                  selectedTab === tab ? 'text-white font-bold' : 'text-gray-400'
                }`}
              >
                {tab === 'users' ? (
                  <FiUsers className="inline-block mr-2 text-lg" />
                ) : (
                  <FiUpload className="inline-block mr-2 text-lg" />
                )}
                {tab === 'users' ? '초대된 사용자 목록' : '업로드된 PDF'}

                {/* 🤍 선택된 탭 하단바 */}
                {selectedTab === tab && (
                  <motion.div
                    layout
                    className="absolute bottom-0 left-0 h-1 rounded-lg bg-gradient-to-r from-cyan-200 via-pink-200 to-purple-400"
                    style={{
                      width: 'calc(100% - 0.5rem)',
                      transform:
                        selectedTab === 'pdfs'
                          ? 'translateX(100%)'
                          : 'translateX(0%)',
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(255, 255, 255, 0.6)',
                        '0 0 20px rgba(255, 245, 200, 0.8)',
                      ],
                      scale: [1, 1.01, 1],
                      opacity: [0.7, 1, 0.7],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      },
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* 선택된 섹션 표시 */}
        <AnimatePresence mode="wait">
          {selectedTab === 'users' ? (
            // 💠 초대된 사용자 목록 탭
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="py-6 px-16"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center justify-start">
                  <h3 className="text-xl font-bold text-white">
                    워크스페이스 이용자 목록
                  </h3>

                  {/* 참여 인원 표시 */}
                  <span className="text-sm text-gray-300 ml-4">
                    총 참여 가능 인원
                  </span>
                  <span className="text-sm text-gray-300 ml-1 font-semibold">
                    ({participantCount}/{maxParticipants})
                  </span>
                </div>

                <div className="flex gap-3">
                  {/* 전체 선택 / 해제 버튼 */}
                  <motion.button
                    className="relative px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md overflow-hidden"
                    style={{
                      background: 'transparent',
                      borderBottom: '3px solid rgba(180, 180, 255, 0.8)',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderBottom: '3px solid rgba(200, 200, 255, 1)',
                      boxShadow: '0px 4px 12px rgba(180, 180, 255, 0.6)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0px 4px 12px rgba(180, 180, 255, 0.3)',
                        '0px 6px 15px rgba(200, 200, 255, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    onClick={() =>
                      handleSelectAll(invitedUsers, setInvitedUsers)
                    }
                  >
                    <FiCheckSquare className="text-white text-lg" /> 전체 선택 /
                    해제
                  </motion.button>

                  {/* 선택 추방 버튼 */}
                  <motion.button
                    className="relative px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md overflow-hidden"
                    style={{
                      background: 'transparent',
                      borderBottom: '3px solid rgba(255, 200, 120, 0.8)',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderBottom: '3px solid rgba(255, 220, 160, 1)',
                      boxShadow: '0px 4px 12px rgba(255, 200, 120, 0.6)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0px 4px 12px rgba(255, 200, 120, 0.3)',
                        '0px 6px 15px rgba(255, 220, 160, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removeSelectedUsers',
                        targetIds: invitedUsers
                          .filter((user) => user.selected)
                          .map((user) => user.id),
                      })
                    }
                  >
                    <AiOutlineUserDelete className="text-white text-lg" /> 선택
                    추방
                  </motion.button>

                  {/* 전체 추방 버튼 */}
                  <motion.button
                    className="relative px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md overflow-hidden"
                    style={{
                      background: 'transparent',
                      borderBottom: '3px solid rgba(255, 120, 120, 0.8)',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderBottom: '3px solid rgba(255, 160, 160, 1)',
                      boxShadow: '0px 4px 12px rgba(255, 120, 120, 0.6)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0px 4px 12px rgba(255, 120, 120, 0.3)',
                        '0px 6px 15px rgba(255, 160, 160, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removeAllUsers',
                      })
                    }
                  >
                    <AiOutlineUsergroupDelete className="text-white text-lg" />{' '}
                    전체 추방
                  </motion.button>
                </div>
              </div>
              {invitedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border-b border-gray-600"
                >
                  <div className="flex items-center justify-start">
                    {/* ---------------------------------------------------------------------------------------------------------------- */}
                    {/* ✅ 체크박스 */}
                    <label className="relative flex items-center cursor-pointer pr-3">
                      {/* 숨겨진 기본 체크박스 */}
                      <input
                        type="checkbox"
                        checked={user.selected}
                        onChange={() =>
                          handleToggleSelect(
                            user.id,
                            invitedUsers,
                            setInvitedUsers,
                          )
                        }
                        className="hidden"
                      />
                      {/* 커스텀 체크박스 */}
                      <motion.div
                        className="w-5 h-5 border border-gray-400 rounded-md flex items-center justify-center transition-all"
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          backgroundColor: user.selected
                            ? '#7569bd'
                            : 'transparent',
                          borderColor: user.selected ? '#7569bd' : '#aaa',
                          boxShadow: user.selected
                            ? '0px 0px 10px rgba(79, 70, 229, 0.5)'
                            : 'none',
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        {user.selected && (
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </motion.svg>
                        )}
                      </motion.div>
                    </label>
                    {/* ---------------------------------------------------------------------------------------------------------------- */}

                    <span className="text-white">
                      {user.name} | {user.email}
                    </span>
                  </div>
                  <motion.button
                    className="relative px-4 py-2 text-sm font-semibold text-white border border-[#FF6B6B] rounded-md shadow-md overflow-hidden transition-all flex items-center gap-2"
                    style={{
                      background: 'transparent',
                      borderBottom: '3px solid rgba(255, 107, 107, 0.8)', // 기본 부드러운 레드톤
                      transition: 'all 0.3s ease-in-out',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderBottom: '3px solid rgba(255, 135, 135, 1)',
                      boxShadow: '0px 4px 12px rgba(255, 107, 107, 0.6)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0px 4px 12px rgba(255, 107, 107, 0.3)',
                        '0px 6px 15px rgba(255, 135, 135, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removeUser',
                        targetId: user.id,
                      })
                    }
                  >
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TiUserDelete size={18} className="text-white" />
                    </motion.span>
                    추방
                  </motion.button>
                </div>
              ))}

              {/* ➕ 남은 초대 가능 칸 표시 */}
              {Array.from({
                length: maxParticipants - invitedUsers.length,
              }).map((_, index) => (
                <div
                  key={`empty-slot-${index}`}
                  className="flex items-center justify-between p-3 border-b border-gray-600 opacity-70 hover:opacity-100 transition cursor-pointer"
                  onClick={() => setShowInviteModal(true)}
                >
                  <div className="flex items-center gap-2">
                    <AiOutlineUserAdd className="text-blue-400 text-lg" />
                    <span className="text-gray-400">
                      사용자를 더 초대해보세요
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            // 💠 업로드된 PDF 목록 탭
            <motion.div
              key="pdfs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="py-6 px-16"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  업로드된 PDF 목록
                </h3>
                <div className="flex gap-3">
                  {/* 전체 선택 / 해제 버튼 */}
                  <motion.button
                    className="relative px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md overflow-hidden"
                    style={{
                      background: 'transparent',
                      borderBottom: '3px solid rgba(140, 200, 255, 0.8)',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderBottom: '3px solid rgba(180, 220, 255, 1)',
                      boxShadow: '0px 4px 12px rgba(140, 200, 255, 0.6)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0px 4px 12px rgba(140, 200, 255, 0.3)',
                        '0px 6px 15px rgba(180, 220, 255, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    onClick={() =>
                      handleSelectAll(uploadedPDFs, setUploadedPDFs)
                    }
                  >
                    <FiCheckSquare className="text-white text-lg" /> 전체 선택 /
                    해제
                  </motion.button>

                  {/* 선택 삭제 버튼 */}
                  <motion.button
                    className="relative px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md overflow-hidden"
                    style={{
                      background: 'transparent',
                      borderBottom: '3px solid rgba(255, 200, 140, 0.8)',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderBottom: '3px solid rgba(255, 220, 180, 1)',
                      boxShadow: '0px 4px 12px rgba(255, 200, 140, 0.6)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0px 4px 12px rgba(255, 200, 140, 0.3)',
                        '0px 6px 15px rgba(255, 220, 180, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removeSelectedPDFs',
                        targetIds: uploadedPDFs
                          .filter((file) => file.selected)
                          .map((file) => file.id),
                      })
                    }
                  >
                    <FiTrash className="text-white text-lg" /> 선택 삭제
                  </motion.button>

                  {/* 전체 삭제 버튼 */}
                  <motion.button
                    className="relative px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md overflow-hidden"
                    style={{
                      background: 'transparent',
                      borderBottom: '3px solid rgba(255, 100, 100, 0.8)',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderBottom: '3px solid rgba(255, 140, 140, 1)',
                      boxShadow: '0px 4px 12px rgba(255, 100, 100, 0.6)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0px 4px 12px rgba(255, 100, 100, 0.3)',
                        '0px 6px 15px rgba(255, 140, 140, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    onClick={() =>
                      setShowConfirmModal({ show: true, type: 'removeAllPDFs' })
                    }
                  >
                    <FiTrash2 className="text-white text-lg" /> 전체 삭제
                  </motion.button>
                </div>
              </div>
              {uploadedPDFs.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border-b border-gray-600"
                >
                  <div className="flex items-center justify-start">
                    {/* ---------------------------------------------------------------------------------------------------------------- */}
                    {/* ✅ 체크박스 */}
                    <label className="relative flex items-center cursor-pointer pr-3">
                      {/* 숨겨진 기본 체크박스 */}
                      <input
                        type="checkbox"
                        checked={file.selected}
                        onChange={() =>
                          handleToggleSelect(
                            file.id,
                            uploadedPDFs,
                            setUploadedPDFs,
                          )
                        }
                        className="hidden"
                      />
                      {/* 커스텀 체크박스 */}
                      <motion.div
                        className="w-5 h-5 border border-gray-400 rounded-md flex items-center justify-center transition-all"
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          backgroundColor: file.selected
                            ? '#5982cf'
                            : 'transparent',
                          borderColor: file.selected ? '#5982cf' : '#aaa',
                          boxShadow: file.selected
                            ? '0px 0px 10px rgba(110, 142, 231, 0.5)'
                            : 'none',
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        {file.selected && (
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </motion.svg>
                        )}
                      </motion.div>
                    </label>
                    {/* ---------------------------------------------------------------------------------------------------------------- */}

                    <span className="text-white">{file.name}</span>
                  </div>
                  <motion.button
                    className="relative px-4 py-2 text-sm font-semibold text-white border border-[#FF6B6B] rounded-md shadow-md overflow-hidden transition-all flex items-center gap-2"
                    style={{
                      background: 'transparent',
                      borderBottom: '3px solid rgba(255, 107, 107, 0.8)', // 기본 부드러운 레드톤
                      transition: 'all 0.3s ease-in-out',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderBottom: '3px solid rgba(255, 135, 135, 1)',
                      boxShadow: '0px 4px 12px rgba(255, 107, 107, 0.6)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0px 4px 12px rgba(255, 107, 107, 0.3)',
                        '0px 6px 15px rgba(255, 135, 135, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removePDF',
                        targetId: file.id,
                      })
                    }
                  >
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MdDeleteForever size={18} className="text-white" />
                    </motion.span>
                    삭제
                  </motion.button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {/* 🎀 초대된 사용자 목록 및 업로드된 PDF 파일 목록 섹션 🔼 */}
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        {/* ✅ 초대 코드 모달 */}
        {showInviteModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
              <h2 className="text-lg font-bold text-white mb-4">
                워크스페이스 초대 코드
              </h2>
              <div className="flex items-center justify-center bg-gray-700 p-3 rounded-md mb-4">
                <span className="text-white font-mono text-lg">
                  {inviteCode}
                </span>
              </div>
              {/* 📋 초대 코드 복사 버튼 */}
              <motion.button
                className="px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-transparent shadow-md overflow-hidden"
                style={{
                  background: 'transparent',
                  borderBottom: '3px solid rgba(120, 180, 255, 0.8)', // 하늘색
                  transition: 'all 0.3s ease-in-out',
                }}
                whileHover={{
                  scale: 1.05,
                  borderBottom: '3px solid rgba(160, 210, 255, 1)',
                  boxShadow: '0px 4px 12px rgba(120, 180, 255, 0.6)',
                  transition: { duration: 0.3, ease: 'easeInOut' },
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0px 4px 12px rgba(120, 180, 255, 0.3)',
                    '0px 6px 15px rgba(160, 210, 255, 0.5)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                onClick={handleCopyInviteCode}
              >
                <FiClipboard className="text-white text-lg" /> 초대 코드 복사
              </motion.button>

              {/* 닫기 버튼 */}
              <button
                className="mt-4 text-gray-300 hover:text-white"
                onClick={() => setShowInviteModal(false)}
              >
                닫기
              </button>
            </div>
          </motion.div>
        )}
        {/* ✅ 초기화 확인 모달 */}
        {showResetModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-lg shadow-lg border border-gray-600"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 border border-gray-600 rounded-lg shadow-xl animate-pulse" />

              <h2 className="text-lg font-bold text-white text-center mb-4">
                초대 코드를 초기화하시겠습니까?
              </h2>

              {/* 버튼 컨테이너 */}
              <div className="flex justify-center gap-4">
                {/* 아니요 버튼 */}
                <motion.button
                  className="relative px-6 py-2 text-white text-sm font-semibold rounded-lg overflow-hidden shadow-lg"
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(120, 180, 255, 0.8)',
                    boxShadow: '0 0 10px rgba(120, 180, 255, 0.5)',
                  }}
                  whileHover={{
                    scale: 1.08,
                    border: '2px solid rgba(160, 210, 255, 1)',
                    boxShadow: '0px 0px 15px rgba(120, 180, 255, 0.8)',
                    transition: { duration: 0.3, ease: 'easeInOut' },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowResetModal(false)}
                >
                  아니요
                </motion.button>
                {/* 예 버튼 */}
                <motion.button
                  className="relative px-6 py-2 text-white text-sm font-semibold rounded-lg overflow-hidden shadow-lg"
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(255, 120, 150, 0.8)',
                    boxShadow: '0 0 10px rgba(255, 120, 150, 0.5)',
                  }}
                  whileHover={{
                    scale: 1.08,
                    border: '2px solid rgba(255, 150, 180, 1)',
                    boxShadow: '0px 0px 15px rgba(255, 120, 150, 0.8)',
                    transition: { duration: 0.3, ease: 'easeInOut' },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleResetInviteCode(); // 초대 코드 초기화 실행
                    setShowResetSnackbar(true); // 초기화 스낵바 표시
                    setTimeout(() => setShowResetSnackbar(false), 2000); // 2초 후 사라짐
                  }}
                >
                  예
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {/* ✅ 초대 코드 초기화 스낵바 */}
        {showResetSnackbar && (
          <motion.div
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg text-white shadow-lg text-sm font-semibold tracking-wide"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 140, 200, 0.1), rgba(230, 220, 255, 0.2))',
              border: '1px solid rgba(255, 140, 200, 0.5)',
              backdropFilter: 'blur(10px)',
              boxShadow:
                '0px 0px 10px rgba(255, 140, 200, 0.5), 0px 0px 20px rgba(235, 200, 255, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            초대 코드가 새로운 코드로 변경되었습니다!
          </motion.div>
        )}
        {/* ✅ 초대 코드 복사 스낵바 */}
        {showCopySnackbar && (
          <motion.div
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg text-white shadow-lg text-sm font-semibold tracking-wide"
            style={{
              background:
                'linear-gradient(135deg, rgba(120, 180, 255, 0.1), rgba(190, 220, 255, 0.2))',
              border: '1px solid rgba(120, 180, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              boxShadow:
                '0px 0px 10px rgba(120, 180, 255, 0.5), 0px 0px 20px rgba(160, 210, 255, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            초대 코드가 클립보드에 복사되었습니다.
          </motion.div>
        )}
        {/* ✅ PDF 업로드 완료 스낵바 */}
        {showPdfUploadSnackbar && (
          <motion.div
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg text-white shadow-lg text-sm font-semibold tracking-wide"
            style={{
              background:
                'linear-gradient(135deg, rgba(160, 230, 160, 0.1), rgba(190, 250, 190, 0.2))',
              border: '1px solid rgba(160, 230, 160, 0.5)',
              backdropFilter: 'blur(10px)',
              boxShadow:
                '0px 0px 10px rgba(160, 230, 160, 0.5), 0px 0px 20px rgba(190, 250, 190, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            PDF 파일이 업로드되었습니다!
          </motion.div>
        )}
        {/* ✅ 삭제/추방 확인 모달 */}
        {showConfirmModal.show && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-lg shadow-lg border border-gray-600"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 반짝이는 테두리 효과 */}
              <div className="absolute inset-0 border border-gray-600 rounded-lg shadow-xl animate-pulse" />

              {/* 모달 타이틀 */}
              <h2 className="text-lg font-bold text-white text-center mb-4">
                정말로 삭제하시겠습니까?
              </h2>

              {/* 버튼 컨테이너 */}
              <div className="flex justify-center gap-4">
                {/* 취소 버튼 */}
                <motion.button
                  className="relative px-6 py-2 text-white text-sm font-semibold rounded-lg overflow-hidden shadow-lg"
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(120, 180, 255, 0.8)',
                    boxShadow: '0 0 10px rgba(120, 180, 255, 0.5)',
                  }}
                  whileHover={{
                    scale: 1.08,
                    border: '2px solid rgba(160, 210, 255, 1)',
                    boxShadow: '0px 0px 15px rgba(120, 180, 255, 0.8)',
                    transition: { duration: 0.3, ease: 'easeInOut' },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setShowConfirmModal({
                      show: false,
                      type: '',
                      targetId: null,
                    })
                  }
                >
                  취소
                </motion.button>

                {/* 확인 버튼 */}
                <motion.button
                  className="relative px-6 py-2 text-white text-sm font-semibold rounded-lg overflow-hidden shadow-lg"
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(255, 120, 150, 0.8)',
                    boxShadow: '0 0 10px rgba(255, 120, 150, 0.5)',
                  }}
                  whileHover={{
                    scale: 1.08,
                    border: '2px solid rgba(255, 150, 180, 1)',
                    boxShadow: '0px 0px 15px rgba(255, 120, 150, 0.8)',
                    transition: { duration: 0.3, ease: 'easeInOut' },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleConfirmAction(); // 삭제 실행
                    setShowDeleteSnackbar(true); // 삭제 완료 스낵바 표시
                    setTimeout(() => setShowDeleteSnackbar(false), 2000); // 2초 후 사라짐
                  }}
                >
                  확인
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ✅ 삭제/추방 완료 스낵바 */}
        {showDeleteSnackbar && (
          <motion.div
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg text-white shadow-lg text-sm font-semibold tracking-wide"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 80, 80, 0.2), rgba(255, 50, 50, 0.3))',
              border: '1px solid rgba(255, 100, 100, 0.5)',
              backdropFilter: 'blur(10px)',
              boxShadow:
                '0px 0px 10px rgba(255, 80, 80, 0.5), 0px 0px 20px rgba(255, 50, 50, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            삭제가 완료되었습니다.
          </motion.div>
        )}
      </div>
    </div>
  );
}
