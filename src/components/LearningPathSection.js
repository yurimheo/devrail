import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const learningPath = [
  {
    name: 'Docker역',
    description: '컨테이너화 기술 학습',
    route: 'docker',
    isDisabled: false,
  },
  {
    name: 'Kubernetes역',
    description: '컨테이너 오케스트레이션',
    route: 'kubernetes',
    isDisabled: false,
  },
  {
    name: 'Jenkins역',
    description: '지속적 통합 및 배포',
    route: 'jenkins',
    isDisabled: false,
  },
  {
    name: 'ArgoCD역',
    description: '지속적 배포 자동화',
    route: 'argocd',
    isDisabled: false,
  },
  {
    name: 'Ansible역',
    description: '구성 관리 및 자동화',
    route: 'ansible',
    isDisabled: false,
  },
  {
    name: 'Git역',
    description: '버전 관리 및 협업 툴',
    route: 'git',
    isDisabled: false,
  },
  {
    name: 'Terraform역',
    description: '인프라 자동화',
    route: 'terraform',
    isDisabled: true,
  },
  {
    name: 'Monitoring역',
    description: '시스템 모니터링',
    route: 'monitoring',
    isDisabled: true,
  },
  {
    name: 'Mysql역',
    description: '관계형 데이터베이스',
    route: 'mysql',
    isDisabled: true,
  },
];

export default function LearningPathSection() {
  const [activeStation, setActiveStation] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (route, isDisabled) => {
    if (isDisabled) {
      alert('현재 개발 중인 역입니다. 나중에 다시 시도해주세요.');
    } else {
      navigate(`/courses/${route}`);
      window.scrollTo(0, 0);
    }
  };

  const lastActiveIndex = learningPath.findLastIndex(
    (station) => !station.isDisabled,
  );

  const handleHover = (index, isDisabled) => {
    if (isDisabled) {
      setActiveStation(lastActiveIndex); // 개발 중인 역이면 Git 역에서 멈춤
    } else {
      setActiveStation(index);
    }
  };

  const handleLeave = () => {
    setActiveStation(null);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          DevOps 여정: 기술별 정거장
        </h2>
        <div className="relative">
          {/* 중앙 라인 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black"></div>

          {/* 기차 애니메이션 */}
          <img
            src="/images/train.png"
            alt="Train"
            className="absolute left-1/2 transform -translate-x-1/2 translate-y-[-50%] w-12 h-auto transition-transform duration-500"
            style={{
              transform: `translateY(${activeStation !== null ? activeStation * 150 : 0}px) translateX(-50%)`,
            }}
          />

          {learningPath.map((station, index) => (
            <div
              key={station.name}
              className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              {/* 텍스트와 버튼 */}
              <div
                className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                onMouseEnter={() => handleHover(index, station.isDisabled)}
                onMouseLeave={handleLeave}
              >
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
                <p className="mb-4">{station.description}</p>
                <Button
                  className={`bg-black text-white ${station.isDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-700'}`}
                  onClick={() =>
                    handleButtonClick(station.route, station.isDisabled)
                  }
                >
                  탑승하기
                </Button>
              </div>

              {/* 각 정거장 점 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>

              {/* 개발 중인 역 */}
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
        </div>
      </div>
    </section>
  );
}
