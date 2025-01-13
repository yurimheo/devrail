import React from 'react';
import Button from './Button'; // Button 컴포넌트를 제대로 구현해야 합니다.

const learningPath = [
  { name: 'Docker역', description: '컨테이너화 기술 학습' },
  { name: 'Kubernetes역', description: '컨테이너 오케스트레이션' },
  { name: 'Jenkins역', description: '지속적 통합 및 배포' },
  { name: 'ArgoCD역', description: '지속적 배포 자동화' },
  { name: 'Ansible역', description: '구성 관리 및 자동화' },
  { name: 'MySQL역', description: '데이터베이스 관리 및 운영' },
];

export default function LearningPathSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">DevOps 여정: 기술별 정거장</h2>
        <div className="relative">
          {/* 중앙 라인 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black"></div>
          {learningPath.map((station, index) => (
            <div
              key={station.name}
              className={`flex items-center mb-8 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* 텍스트와 버튼 */}
              <div
                className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
              >
                <h3 className="text-xl font-bold">{station.name}</h3>
                <p className="mb-4">{station.description}</p>
                <Button className="bg-black text-white">탑승하기</Button>
              </div>
              {/* 각 정거장 점 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
