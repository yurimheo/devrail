// 🧶 CTASection 컴포넌트
// ✔ DevOps 학습을 위한 CTA(Call-To-Action) 섹션
// ✔ 버튼 클릭 시 특정 페이지(`/pricing`, `/login`)로 이동

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useCallback } from 'react';

export default function CTASection() {
  const navigate = useNavigate();

  // 💠 페이지 이동 함수
  const handleButtonClick = useCallback(
    (route) => {
      navigate(route);
      window.scrollTo(0, 0);
    },
    [navigate],
  );

  // 💠 CTA 버튼 목록
  const ctaButtons = [
    { label: '승차권 보기', variant: 'secondary', route: '/pricing' },
    { label: '지금 승차하기', variant: 'outline', route: '/login' },
  ];

  return (
    // 📦 전체 컨테이너 🔽
    <section className="bg-gradient-to-b from-black via-gray-800 to-black text-white py-16">
      <div className="container mx-auto px-4 text-center">
        {/* 🎤 주요 메시지 */}
        <h2 className="text-3xl font-bold mb-4 animate-pulse">
          지금 DevOps 열차에 탑승하세요!
        </h2>
        <p className="text-xl mb-8">
          최신 DevOps 기술을 배우고 커리어를 성장시키세요.
        </p>

        {/* 🎯 CTA 버튼 그룹 */}
        <div className="flex justify-center space-x-4">
          {ctaButtons.map(({ label, variant, route }) => (
            <Button
              key={route}
              size="lg"
              variant={variant}
              onClick={() => handleButtonClick(route)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
    // 📦 전체 컨테이너 🔼
  );
}
