import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CourseTabs({ course }) {
  const [activeTab, setActiveTab] = useState('overview');

  // 과목(course)이 변경될 때 탭을 초기화
  useEffect(() => {
    setActiveTab('overview');
  }, [course]);

  const tabs = [
    { id: 'overview', label: '과정 개요' },
    { id: 'skills', label: '습득 기술' },
    { id: 'projects', label: '프로젝트' },
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
          <div>
            <h3 className="font-bold text-lg mb-4">사전 요구사항</h3>
            <ul className="list-disc list-inside text-gray-700">
              {course.prerequisites.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'skills' && (
          <ul className="grid grid-cols-2 gap-4">
            {course.skills.map((skill, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-gray-700"
              >
                <svg
                  className="w-5 h-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'projects' && (
          <ul className="list-disc list-inside space-y-2">
            {course.projects.map((project, index) => (
              <li key={index}>
                <strong>{project.title}</strong>: {project.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
