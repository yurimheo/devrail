import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">서비스 안내</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/pricing"
                  className="relative group text-white"
                >
                  요금
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9e2a2b] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/courses"
                  className="relative group text-white"
                >
                  학습 소개
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9e2a2b] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/practice"
                  className="relative group text-white"
                >
                  실습실
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9e2a2b] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">회원 서비스</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/login"
                  className="relative group text-white"
                >
                  로그인
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1e6091] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/signup"
                  className="relative group text-white"
                >
                  회원가입
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1e6091] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/mypage"
                  className="relative group text-white"
                >
                  마이페이지
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1e6091] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">고객 지원</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/contact"
                  className="relative group text-white"
                >
                  문의하기
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#c8a755] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/faq"
                  className="relative group text-white"
                >
                  자주 묻는 질문
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#c8a755] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/help"
                  className="relative group text-white"
                >
                  도움말
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#c8a755] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">회사 정보</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/about"
                  className="relative group text-white"
                >
                  회사 소개
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#006400] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/privacy"
                  className="relative group text-white"
                >
                  개인정보 처리방침
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#006400] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/terms"
                  className="relative group text-white"
                >
                  이용약관
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#006400] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="mt-4">&copy; 2025 DevRail. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
