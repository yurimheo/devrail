import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeftCircle,
  FiMenu,
  FiX,
  FiBook,
  FiCreditCard,
  FiBookOpen,
  FiTool,
  FiLogIn,
  FiLogOut,
} from 'react-icons/fi';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import CustomDropdown from './CustomDropdown';

export default function WorkspaceHeader({
  workspace_id,
  courseId,
  fileName,
  pdfFiles = [],
}) {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ 로그아웃
  const handleLogout = () => {
    logout();
    toast.success('로그아웃 되었습니다.');
    navigate('/');
  };

  const [selectedFile, setSelectedFile] = useState(
    fileName.replace('.pdf', ''),
  );

  // 드롭다운 선택 시 동작
  const handleFileChange = (selectedFile) => {
    setSelectedFile(selectedFile);
    navigate(
      `/workspaces/${workspace_id}/pdfs/${courseId}/${selectedFile}.pdf`,
      { state: { pdfFiles } },
    );
  };

  return (
    <header className="bg-gradient-to-b from-black via-gray-900 to-black text-white flex justify-between items-center px-6 py-4 shadow-lg">
      <div className="flex justify-start">
        {/* 🔙 뒤로 가기 */}
        <button
          onClick={() => navigate(`/workspaces/${workspace_id}`)}
          className="text-white text-2xl hover:text-blue-400 transition-transform hover:scale-110 pr-1"
        >
          <FiArrowLeftCircle />
        </button>

        {/* 🏠 로고 */}
        <motion.div
          className="flex items-center cursor-pointer hover:opacity-80 transition p-2 mr-2 shadow-md"
          onClick={() => navigate('/')}
        >
          <img
            src="/images/logo.png"
            alt="DEVRAIL Logo"
            className="h-10 invert hover:brightness-110 transition duration-200"
          />
        </motion.div>

        {/* 📃 파일 정보 표시 */}
        <div className="text-center flex items-center gap-3 bg-gray-900 border border-white/20 rounded-lg px-4 py-2 shadow-md">
          <FiBook className="text-blue-300 w-6 h-6" />
          <h2 className="text-lg font-bold text-blue-300">
            {workspace_id}님의 {courseId} 학습 |{' '}
            {fileName.replace(/\.pdf$/i, '')}
          </h2>
        </div>

        {/* 🔽 드롭다운 메뉴 */}
        <div className="pl-3 w-full sm:w-auto z-20 relative">
          <CustomDropdown
            workspace_id={workspace_id}
            courseId={courseId}
            pdfFiles={pdfFiles}
            selectedFile={selectedFile}
            onFileChange={handleFileChange}
          />
        </div>
      </div>

      {/* 🍔 메뉴 */}
      <div className="relative">
        <button
          className="text-white text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute right-0 mt-4 w-64 bg-gray-900/85 backdrop-blur-2xl border border-gray-700/40 hover:border-gray-500/70 rounded-xl shadow-lg hover:shadow-2xl py-6 px-7 z-50 divide-y divide-gray-700/50 transition-all transform translate-y-1 hover:translate-y-0 hover:scale-105 duration-300"
          >
            <ul className="text-white space-y-4">
              <li>
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 transition-all"
                >
                  <FiCreditCard className="w-5 h-5 text-yellow-400" /> 승차권
                  구매
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/courses')}
                  className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 transition-all"
                >
                  <FiBookOpen className="w-5 h-5 text-blue-400" /> 학습 소개
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/workspaces/${workspace_id}`)}
                  className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 transition-all"
                >
                  <FiTool className="w-5 h-5 text-green-400" /> 워크스페이스
                </button>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/30 hover:scale-105 transition-all"
                  >
                    <FiLogOut className="w-5 h-5" /> 로그아웃
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 hover:scale-105 transition-all"
                  >
                    <FiLogIn className="w-5 h-5 text-gray-400" /> 로그인
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
}
