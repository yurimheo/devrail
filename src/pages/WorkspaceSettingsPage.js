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
    <div className="min-h-screen px-6 py-10 bg-white">
      <div className="container relative z-20 p-8 mx-auto shadow-lg rounded-lg bg-opacity-5">
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
              워크스페이스 설정
            </motion.h1>
          </motion.h1>
        </motion.div>
        <p className="text-xs text-black text-opacity-80 text-center leading-relaxed">
          <span className="relative px-1 border border-black rounded-md border-opacity-55 font-bold">
            초대 코드
          </span>
          &nbsp;를 공유해 새로운 승객을 태우고,
          <br />
          <span className="relative font-semibold after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[1px] after:bg-black after:opacity-50">
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
              display: 'inline-block',
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <MdOutlineArrowBackIosNew size={24} className="text-black" />
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
          <div className="border border-black border-opacity-50 rounded-md px-8 py-3 flex justify-between items-center">
            <span className="text-lg font-bold text-black">
              초대 코드: {inviteCode}
            </span>

            {/* 초대 코드 복사/초기화 및 PDF 업로드 버튼*/}
            <div className="flex gap-4">
              {/* 📋 초대 코드 복사 버튼 */}
              <button
                className="px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-gray-500 shadow-sm bg-gray-800 hover:bg-gray-700 transition-all"
                onClick={() => {
                  handleCopyInviteCode();
                  setShowCopySnackbar(true);
                  setTimeout(() => setShowCopySnackbar(false), 2000);
                }}
              >
                <FiClipboard className="text-white text-lg" /> 복사
              </button>

              {/* 🔄 초대 코드 초기화 버튼 */}
              <button
                className="px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-gray-500 shadow-sm bg-gray-800 hover:bg-gray-700 transition-all"
                onClick={() => setShowResetModal(true)}
              >
                <FiRefreshCcw className="text-white text-lg" /> 초기화
              </button>

              {/* 📂 PDF 업로드 버튼 */}
              <label className="px-5 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-semibold border border-gray-500 shadow-sm bg-gray-800 hover:bg-gray-700 transition-all cursor-pointer">
                <FiUpload className="text-white text-lg" /> PDF 업로드
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
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
                  selectedTab === tab
                    ? 'text-blue-500 font-bold'
                    : 'text-gray-400'
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
                  <div
                    className="absolute bottom-0 left-0 h-1 rounded-lg bg-blue-500"
                    style={{
                      width: 'calc(100% - 0.5rem)',
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
              className="py-6 px-16 bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center justify-start">
                  <h3 className="text-xl font-bold text-black">
                    워크스페이스 이용자 목록
                  </h3>

                  {/* 참여 인원 표시 */}
                  <span className="text-sm text-gray-600 ml-4">
                    총 참여 가능 인원
                  </span>
                  <span className="text-sm text-blue-500 ml-1 font-semibold">
                    ({participantCount}/{maxParticipants})
                  </span>
                </div>

                <div className="flex gap-3">
                  {/* 전체 선택 / 해제 버튼 */}
                  <motion.button
                    className="px-5 py-2 rounded-lg flex items-center gap-2 text-black text-sm font-semibold border border-blue-500 bg-white transition-all"
                    onClick={() =>
                      handleSelectAll(invitedUsers, setInvitedUsers)
                    }
                  >
                    <FiCheckSquare className="text-blue-500 text-lg" /> 전체
                    선택 / 해제
                  </motion.button>

                  {/* 선택 추방 버튼 */}
                  <motion.button
                    className="px-5 py-2 rounded-lg flex items-center gap-2 text-black text-sm font-semibold border border-blue-500 bg-white transition-all"
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
                    <AiOutlineUserDelete className="text-blue-500 text-lg" />{' '}
                    선택 추방
                  </motion.button>

                  {/* 전체 추방 버튼 */}
                  <motion.button
                    className="px-5 py-2 rounded-lg flex items-center gap-2 text-black text-sm font-semibold border border-red-500 bg-white transition-all"
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removeAllUsers',
                      })
                    }
                  >
                    <AiOutlineUsergroupDelete className="text-red-500 text-lg" />{' '}
                    전체 추방
                  </motion.button>
                </div>
              </div>

              {invitedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border-b border-gray-400"
                >
                  <div className="flex items-center justify-start">
                    {/* ✅ 체크박스 */}
                    <label className="relative flex items-center cursor-pointer pr-3">
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
                      <motion.div
                        className="w-5 h-5 border border-gray-500 rounded-md flex items-center justify-center transition-all"
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          backgroundColor: user.selected
                            ? '#ffffff'
                            : 'transparent', // Blue-500
                          borderColor: user.selected ? '#3B82F6' : '#888',
                        }}
                      >
                        {user.selected && (
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-blue-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </motion.svg>
                        )}
                      </motion.div>
                    </label>

                    <span className="text-black">
                      {user.name} | {user.email}
                    </span>
                  </div>
                  <motion.button
                    className="px-4 py-2 text-sm font-semibold text-black border border-red-500 rounded-md transition-all flex items-center gap-2 bg-white"
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removeUser',
                        targetId: user.id,
                      })
                    }
                  >
                    <TiUserDelete size={18} className="text-red-500" />
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
                  className="flex items-center justify-between p-3 border-b border-gray-400 opacity-70 hover:opacity-100 transition cursor-pointer"
                  onClick={() => setShowInviteModal(true)}
                >
                  <div className="flex items-center gap-2">
                    <AiOutlineUserAdd className="text-blue-500 text-lg" />
                    <span className="text-gray-600">
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
              className="py-6 px-16 bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-black">
                  업로드된 PDF 목록
                </h3>
                <div className="flex gap-3">
                  {/* 전체 선택 / 해제 버튼 */}
                  <motion.button
                    className="px-5 py-2 rounded-lg flex items-center gap-2 text-black text-sm font-semibold border border-blue-500 bg-white hover:bg-gray-100 transition-all"
                    onClick={() =>
                      handleSelectAll(uploadedPDFs, setUploadedPDFs)
                    }
                  >
                    <FiCheckSquare className="text-blue-500 text-lg" /> 전체
                    선택 / 해제
                  </motion.button>

                  {/* 선택 삭제 버튼 */}
                  <motion.button
                    className="px-5 py-2 rounded-lg flex items-center gap-2 text-black text-sm font-semibold border border-red-500 bg-white hover:bg-gray-100 transition-all"
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
                    <FiTrash className="text-red-500 text-lg" /> 선택 삭제
                  </motion.button>

                  {/* 전체 삭제 버튼 */}
                  <motion.button
                    className="px-5 py-2 rounded-lg flex items-center gap-2 text-black text-sm font-semibold border border-red-500 bg-white hover:bg-gray-100 transition-all"
                    onClick={() =>
                      setShowConfirmModal({ show: true, type: 'removeAllPDFs' })
                    }
                  >
                    <FiTrash2 className="text-red-500 text-lg" /> 전체 삭제
                  </motion.button>
                </div>
              </div>

              {uploadedPDFs.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border-b border-gray-400"
                >
                  <div className="flex items-center justify-start">
                    {/* ✅ 체크박스 */}
                    <label className="relative flex items-center cursor-pointer pr-3">
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
                      <motion.div
                        className="w-5 h-5 border border-gray-500 rounded-md flex items-center justify-center transition-all"
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          backgroundColor: file.selected
                            ? '#ffffff'
                            : 'transparent', // Blue-500
                          borderColor: file.selected ? '#3B82F6' : '#888',
                        }}
                      >
                        {file.selected && (
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-blue-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </motion.svg>
                        )}
                      </motion.div>
                    </label>

                    <span className="text-black">{file.name}</span>
                  </div>
                  <motion.button
                    className="px-4 py-2 text-sm font-semibold text-black border border-red-500 rounded-md transition-all flex items-center gap-2 bg-white hover:bg-gray-100"
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removePDF',
                        targetId: file.id,
                      })
                    }
                  >
                    <MdDeleteForever size={18} className="text-red-500" />
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
            <div className="bg-white p-6 rounded-lg text-center w-96 border border-gray-400">
              <h2 className="text-lg font-bold text-black mb-4">
                워크스페이스 초대 코드
              </h2>
              <div className="flex items-center justify-center bg-gray-200 p-3 rounded-md mb-4">
                <span className="text-black font-mono text-lg">
                  {inviteCode}
                </span>
              </div>

              {/* 📋 초대 코드 복사 버튼 */}
              <motion.button
                className="px-5 py-2 rounded-lg flex items-center gap-2 text-black text-sm font-semibold border border-gray-400 bg-white hover:bg-gray-100 transition-all"
                onClick={handleCopyInviteCode}
              >
                <FiClipboard className="text-blue-500 text-lg" /> 초대 코드 복사
              </motion.button>

              {/* 닫기 버튼 */}
              <button
                className="mt-4 text-gray-600 hover:text-black"
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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              className="relative bg-white p-8 rounded-lg border border-gray-400"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold text-black text-center mb-4">
                초대 코드를 초기화하시겠습니까?
              </h2>

              {/* 버튼 컨테이너 */}
              <div className="flex justify-center gap-4">
                {/* 아니요 버튼 */}
                <motion.button
                  className="px-6 py-2 text-black text-sm font-semibold border border-gray-400 bg-white hover:bg-gray-100 transition-all rounded-lg"
                  onClick={() => setShowResetModal(false)}
                >
                  아니요
                </motion.button>

                {/* 예 버튼 */}
                <motion.button
                  className="px-6 py-2 text-black text-sm font-semibold border border-red-500 bg-white hover:bg-gray-100 transition-all rounded-lg"
                  onClick={() => {
                    handleResetInviteCode();
                    setShowResetSnackbar(true);
                    setTimeout(() => setShowResetSnackbar(false), 2000);
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
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg text-black border border-gray-400 bg-white text-sm font-semibold"
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
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg text-black border border-blue-400 bg-white"
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
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg text-black border border-green-500 bg-white"
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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              className="relative bg-white p-8 rounded-lg border border-gray-400"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold text-black text-center mb-4">
                정말로 삭제하시겠습니까?
              </h2>

              {/* 버튼 컨테이너 */}
              <div className="flex justify-center gap-4">
                {/* 취소 버튼 */}
                <motion.button
                  className="px-6 py-2 text-black text-sm font-semibold border border-gray-400 bg-white hover:bg-gray-100 transition-all rounded-lg"
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
                  className="px-6 py-2 text-black text-sm font-semibold border border-red-500 bg-white hover:bg-gray-100 transition-all rounded-lg"
                  onClick={() => {
                    handleConfirmAction();
                    setShowDeleteSnackbar(true);
                    setTimeout(() => setShowDeleteSnackbar(false), 2000);
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
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg text-black border border-red-400 bg-white"
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
