// 🧶 Footer 컴포넌트
// ✔ 웹사이트 하단 정보 제공 (서비스 안내, 회원 서비스, 고객 지원, 회사 정보)

import React from 'react';

export default function Footer() {
  return (
    // 📦 전체 컨테이너 🔽
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* 📟 네비게이션 그룹 🔽 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* 📠 서비스 안내 */}
          <div>
            <h3 className="font-bold mb-4">서비스 안내</h3>
            <ul className="space-y-2">
              <FooterLink href="/pricing" label="요금" color="#9e2a2b" />
              <FooterLink href="/courses" label="학습 소개" color="#9e2a2b" />
              <FooterLink href="/practice" label="실습실" color="#9e2a2b" />
            </ul>
          </div>

          {/* 🔑 회원 서비스 */}
          <div>
            <h3 className="font-bold mb-4">회원 서비스</h3>
            <ul className="space-y-2">
              <FooterLink href="/login" label="로그인" color="#1e6091" />
              <FooterLink href="/signup" label="회원가입" color="#1e6091" />
              <FooterLink href="/mypage" label="마이페이지" color="#1e6091" />
            </ul>
          </div>

          {/* 📞 고객 지원 */}
          <div>
            <h3 className="font-bold mb-4">고객 지원</h3>
            <ul className="space-y-2">
              <FooterLink href="/contact" label="문의하기" color="#c8a755" />
              <FooterLink href="/faq" label="자주 묻는 질문" color="#c8a755" />
              <FooterLink href="/help" label="도움말" color="#c8a755" />
            </ul>
          </div>

          {/* 🏢 회사 정보 */}
          <div>
            <h3 className="font-bold mb-4">회사 정보</h3>
            <ul className="space-y-2">
              <FooterLink href="/about" label="회사 소개" color="#006400" />
              <FooterLink
                href="/privacy"
                label="개인정보 처리방침"
                color="#006400"
              />
              <FooterLink href="/terms" label="이용약관" color="#006400" />
            </ul>
          </div>
        </div>
        {/* 📟 네비게이션 그룹 🔼 */}

        {/* 📃 저작권 정보 */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="mt-4">&copy; 2025 DevRail. All rights reserved.</p>
        </div>
      </div>
    </footer>
    // 📦 전체 컨테이너 🔼
  );
}

// 🧶 FooterLink 컴포넌트
// ✔ `href`: 이동할 링크
// ✔ `label`: 링크 텍스트
// ✔ `color`: 밑줄 색상
function FooterLink({ href, label, color }) {
  return (
    <li>
      <a href={href} className="relative group text-white">
        {label}
        <span
          className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: color }}
        ></span>
      </a>
    </li>
  );
}
