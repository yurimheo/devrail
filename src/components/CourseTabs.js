import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function CourseTabs({ course }) {
  const [activeTab, setActiveTab] = useState('overview');

  // 과목(course)이 변경될 때 탭을 초기화
  useEffect(() => {
    setActiveTab('overview');
  }, [course]);

  const tabs = [
    { id: 'overview', label: '과정 개요' },
    { id: 'skills', label: '습득 기술' },
    { id: 'how_it_works', label: '학습 방식' },
  ];

  return (
    <div className="mt-8">
      {/* 탭 버튼 */}
      <div className="relative flex border-b border-gray-200">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 text-center py-2 cursor-pointer ${
              activeTab === tab.id ? 'text-blue-600 font-bold' : 'text-gray-600'
            }`}
          >
            {tab.label}

            {/* 선택된 탭 하단 슬라이딩 바 */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="bg-white rounded-2xl">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-4">
              사전 요구사항
            </h3>
            <ul className="space-y-3">
              {course.prerequisites.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                >
                  <span className="text-blue-500 font-semibold">✔</span>
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-md"
          >
            <h3 className="text-2xl font-bold text-gray-900 pb-4 text-left tracking-tight">
              습득할 수 있는 기술
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {course.skills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-5 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-transform duration-300 hover:scale-105"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FiCheckCircle className="text-blue-500" size={28} />
                  <span className="text-gray-900 font-semibold">{skill}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {activeTab === 'how_it_works' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl"
          >
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
              학습 방식
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 학습 환경 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-100 rounded-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-lg">
                  <FiBookOpen size={24} />
                </div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">학습 환경:</strong>{' '}
                  {course.how_it_works.environment}
                </p>
              </motion.div>

              {/* 사용 시간 제한 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-100 rounded-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-lg">
                  <FiClock size={24} />
                </div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">사용 시간:</strong>{' '}
                  {course.how_it_works.usage_limit}
                </p>
              </motion.div>
            </div>

            {/* 학습 단계 */}
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              학습 진행 단계
            </h3>
            <ul className="mt-4 space-y-3">
              {course.how_it_works.steps.map((step, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FiCheckCircle className="text-blue-500" size={20} />
                  <span className="text-gray-800">{step}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
