// 🧶 LearningPathSection 컴포넌트
// ✔ DevOps 학습 경로를 역(정거장) 컨셉으로 표현
// ✔ 활성화된 역을 따라 기차 애니메이션 적용
// ✔ 클릭 시 해당 역의 학습 페이지로 이동 (개발 중인 역은 알림 표시)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { toast } from 'react-toastify';

// 💠 학습 정거장 리스트
const DISABLED_STATIONS = ['terraform', 'monitoring', 'mysql'];

const learningPath = [
  { name: 'Docker역', description: '컨테이너화 기술 학습', route: 'docker' },
  {
    name: 'Kubernetes역',
    description: '컨테이너 오케스트레이션',
    route: 'kubernetes',
  },
  { name: 'Jenkins역', description: '지속적 통합 및 배포', route: 'jenkins' },
  { name: 'ArgoCD역', description: '지속적 배포 자동화', route: 'argocd' },
  { name: 'Ansible역', description: '구성 관리 및 자동화', route: 'ansible' },
  { name: 'Git역', description: '버전 관리 및 협업 툴', route: 'git' },
  { name: 'Terraform역', description: '인프라 자동화', route: 'terraform' },
  { name: 'Monitoring역', description: '시스템 모니터링', route: 'monitoring' },
  { name: 'Mysql역', description: '관계형 데이터베이스', route: 'mysql' },
].map((station) => ({
  ...station,
  isDisabled: DISABLED_STATIONS.includes(station.route),
}));

export default function LearningPathSection() {
  // 💠 활성화된 정거장 상태
  const [activeStation, setActiveStation] = useState(null);
  const navigate = useNavigate();

  // 📌 버튼 클릭 시 페이지 이동
  const handleButtonClick = (route, isDisabled) => {
    if (isDisabled) {
      toast.warn('현재 개발 중인 역입니다. 나중에 다시 시도해주세요.');
    } else {
      navigate(`/courses/${route}`);
      window.scrollTo(0, 0);
    }
  };

  // 💠 마지막 활성화된 역 찾기 (개발 중인 역 스킵)
  const lastActiveIndex = learningPath.findLastIndex(
    (station) => !station.isDisabled,
  );

  // 📌 마우스 호버 시 정거장 활성화
  const handleHover = (index, isDisabled) => {
    setActiveStation(isDisabled ? lastActiveIndex : index);
  };

  // 📌 마우스가 떠날 때 정거장 비활성화
  const handleLeave = () => {
    setActiveStation(null);
  };

  return (
    // 📦 전체 컨테이너 🔽
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* 🎤 섹션 제목 */}
        <h2 className="text-3xl font-bold text-center mb-12">
          DevOps 여정: 기술별 정거장
        </h2>

        {/* 🚆 기차 정거장 라인 🔽 */}
        <div className="relative">
          {/* 📏 중앙 라인 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black"></div>

          {/* 🚂 기차 애니메이션 */}
          <img
            src="/images/train.png"
            alt="Train"
            className="absolute left-1/2 transform -translate-x-1/2 translate-y-[-50%] w-12 h-auto transition-transform duration-500"
            style={{
              transform: `translateY(${activeStation !== null ? activeStation * 150 : 0}px) translateX(-50%)`,
            }}
          />

          {/* 🚉 정거장 리스트 🔽 */}
          {learningPath.map((station, index) => (
            <div
              key={station.name}
              className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              {/* 📃 정거장 정보 및 버튼 🔽 */}
              <div
                className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                onMouseEnter={() => handleHover(index, station.isDisabled)}
                onMouseLeave={handleLeave}
              >
                {/* 🚩 정거장 제목 */}
                <h3
                  className={`text-xl font-bold ${station.isDisabled ? 'text-gray-400' : 'text-black'}`}
                >
                  {station.name}
                  {station.isDisabled && (
                    <span className="text-xs text-gray-500 ml-2">
                      (현재 개발 중)
                    </span>
                  )}
                </h3>

                {/* 📃 정거장 설명 */}
                <p className="mb-4">{station.description}</p>

                {/* 🎯 탑승 버튼 */}
                <Button
                  variant="primary"
                  className={`${station.isDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-700'}`}
                  onClick={() =>
                    handleButtonClick(station.route, station.isDisabled)
                  }
                >
                  탑승하기
                </Button>
              </div>
              {/* 📃 정거장 정보 및 버튼 🔼 */}

              {/* 🚉 정거장 점 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>

              {/* 🚧 개발 중인 역 표시 */}
              {station.isDisabled && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-4 h-4 bg-gray-400 rounded-full">
                  <img
                    src="/images/under-construction.png"
                    alt="Under Construction"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
          {/* 🚉 정거장 리스트 🔼 */}
        </div>
        {/* 🚆 기차 정거장 라인 🔼 */}
      </div>
    </section>
    // 📦 전체 컨테이너 🔼
  );
}
