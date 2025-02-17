// 🧶 HeroSection 컴포넌트
// ✔ 메인 화면에서 DevOps 플랫폼을 소개하는 히어로 섹션
// ✔ CTA(Call-To-Action) 버튼을 통해 사용자 유입 유도
// ✔ 애니메이션 효과 적용 (`animate.css` 사용)

import React from 'react';
import 'animate.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function HeroSection() {
  // 💠 페이지 이동을 위한 네비게이션 훅
  const navigate = useNavigate();

  return (
    // 📦 전체 컨테이너 🔽
    <section className="bg-gradient-to-r from-black to-white text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* 📃 텍스트 콘텐츠 섹션 🔽 */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          {/* 🎤 메인 헤드라인 */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate__animated animate__fadeIn">
            DevOps 열차에 올라타세요.
          </h1>

          {/* 🚩 서브 헤드라인 */}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-1s">
            모든 정거장에서 배움이 기다립니다!
          </h2>

          {/* 📃 설명 텍스트 */}
          <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
            Docker부터 Kubernetes까지, DevOps의 모든 여정을 함께합니다.
          </p>

          {/* 🎯 CTA 버튼 그룹 🔽 */}
          <div className="flex space-x-4">
            <Button
              size="lg"
              variant="hero"
              onClick={() => navigate('/pricing')}
            >
              탑승권 보기
            </Button>
            <Button
              size="lg"
              variant="hero2"
              onClick={() => navigate('/login')}
            >
              지금 승차하기
            </Button>
          </div>
          {/* 🎯 CTA 버튼 그룹 🔼 */}
        </div>
        {/* 📃 텍스트 콘텐츠 섹션 🔼 */}
      </div>
    </section>
    // 📦 전체 컨테이너 🔼
  );
}
