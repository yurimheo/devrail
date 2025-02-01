import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClipboard, FiRefreshCcw, FiUpload, FiUsers } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom'; // ⬅️ useNavigate 추가

export default function WorkspaceSettingsPage() {
  const navigate = useNavigate();
  const { workspace_id } = useParams(); // 워크스페이스 ID 가져오기

  const [inviteCode, setInviteCode] = useState(generateInviteCode());
  const [selectedTab, setSelectedTab] = useState('users'); // "users" | "pdfs"
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
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

  const [invitedUsers, setInvitedUsers] = useState([
    { id: 1, name: '김유림', email: 'yurim@example.com', selected: false },
    { id: 2, name: '박건우', email: 'gunwoo@example.com', selected: false },
    { id: 3, name: '이서준', email: 'seojun@example.com', selected: false },
  ]);
  const [uploadedPDFs, setUploadedPDFs] = useState([
    { id: 1, name: 'Docker 기초.pdf', selected: false },
    { id: 2, name: 'Kubernetes 심화.pdf', selected: false },
  ]);

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
    }
  }

  function handleCopyInviteCode() {
    navigator.clipboard.writeText(inviteCode);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 2000);
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

    setShowConfirmModal({ show: false, type: '', targetIds: [] });
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
        {/* 📌 초대 코드 섹션 */}
        <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
          <span className="text-lg font-bold">초대 코드: {inviteCode}</span>
          <div className="flex gap-2">
            {/* 🔙 뒤로가기 버튼 */}
            <button
              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={() => navigate(`/workspaces/${workspace_id}`)}
            >
              ⬅️ 뒤로가기
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={handleCopyInviteCode}
            >
              <FiClipboard /> 복사
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={() => setShowResetModal(true)}
            >
              <FiRefreshCcw /> 초기화
            </button>
            <label className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              <FiUpload /> PDF 업로드
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
        {/* 🔽 슬라이드바 */}
        <div className="flex mt-6">
          <button
            className={`flex-1 py-3 text-center rounded-t-lg ${selectedTab === 'users' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setSelectedTab('users')}
          >
            <FiUsers className="inline-block mr-2" /> 초대된 사용자
          </button>
          <button
            className={`flex-1 py-3 text-center rounded-t-lg ${selectedTab === 'pdfs' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setSelectedTab('pdfs')}
          >
            <FiUpload className="inline-block mr-2" /> 업로드된 PDF
          </button>
        </div>
        {/* 🔽 선택된 섹션 표시 */}
        <AnimatePresence mode="wait">
          {selectedTab === 'users' ? (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-6 bg-gray-800 rounded-b-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  워크스페이스 초대된 사용자 목록
                </h3>
                <div className="flex gap-2">
                  {/* 전체 선택 / 해제 버튼 */}
                  <button
                    className="bg-gray-500 px-3 py-2 rounded-md"
                    onClick={() =>
                      handleSelectAll(invitedUsers, setInvitedUsers)
                    }
                  >
                    전체 선택 / 해제
                  </button>
                  {/* 선택 추방 버튼 */}
                  <button
                    className="bg-yellow-500 px-3 py-2 rounded-md"
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
                    선택 추방
                  </button>
                  {/* 전체 추방 버튼 */}
                  <button
                    className="bg-gray-500 px-3 py-2 rounded-md"
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removeAllUsers',
                      })
                    }
                  >
                    전체 추방
                  </button>
                </div>
              </div>
              {invitedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border-b border-gray-600"
                >
                  {/* 개별 체크박스 */}
                  <input
                    type="checkbox"
                    checked={user.selected}
                    onChange={() =>
                      handleToggleSelect(user.id, invitedUsers, setInvitedUsers)
                    }
                    className="mr-3"
                  />
                  <span>
                    {user.name} | {user.email}
                  </span>
                  <button
                    className="bg-red-500 px-3 py-1 rounded-md"
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removeUser',
                        targetId: user.id,
                      })
                    }
                  >
                    추방
                  </button>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="pdfs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-6 bg-gray-800 rounded-b-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">업로드된 PDF 목록</h3>
                {/* 전체 선택/해제 버튼 */}
                <button
                  className="bg-gray-500 px-3 py-2 rounded-md"
                  onClick={() => handleSelectAll(uploadedPDFs, setUploadedPDFs)}
                >
                  전체 선택 / 해제
                </button>
                {/* 선택 삭제 버튼 */}
                <button
                  className="bg-yellow-500 px-3 py-2 rounded-md"
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
                  선택 삭제
                </button>

                <button
                  className="bg-red-500 px-3 py-2 rounded-md"
                  onClick={() =>
                    setShowConfirmModal({ show: true, type: 'removeAllPDFs' })
                  }
                >
                  전체 삭제
                </button>
              </div>
              {uploadedPDFs.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border-b border-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={file.selected}
                    onChange={() =>
                      handleToggleSelect(file.id, uploadedPDFs, setUploadedPDFs)
                    }
                    className="mr-3"
                  />
                  <span>{file.name}</span>
                  <button
                    className="bg-red-500 px-3 py-1 rounded-md"
                    onClick={() =>
                      setShowConfirmModal({
                        show: true,
                        type: 'removePDF',
                        targetId: file.id,
                      })
                    }
                  >
                    삭제
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {/* ✅ 초기화 확인 모달 */}
        {showResetModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-4">초대 코드를 초기화하시겠습니까?</p>
              <button
                className="bg-red-500 px-4 py-2 mr-2"
                onClick={handleResetInviteCode}
              >
                예
              </button>
              <button
                className="bg-gray-500 px-4 py-2"
                onClick={() => setShowResetModal(false)}
              >
                아니요
              </button>
            </div>
          </div>
        )}
        {/* ✅ 스낵바 메시지 */}
        {showSnackbar && (
          <motion.div
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            초대 코드가 복사되었습니다!
          </motion.div>
        )}
        {/* ✅ 삭제/추방 확인 모달 */}
        {showConfirmModal.show && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-white text-lg mb-4">
                정말로 삭제하시겠습니까?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-500 rounded-md"
                  onClick={() =>
                    setShowConfirmModal({
                      show: false,
                      type: '',
                      targetId: null,
                    })
                  }
                >
                  취소
                </button>
                <button
                  className="px-4 py-2 bg-red-500 rounded-md"
                  onClick={handleConfirmAction}
                >
                  확인
                </button>
              </div>
            </div>
          </motion.div>
        )}{' '}
      </div>
    </div>
  );
}
