import React from 'react';
import Button from './Button'; // Button 컴포넌트를 직접 구현하거나 라이브러리에서 가져오기

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">탑승 안내</h3>
            <ul className="space-y-2">
              <li><a href="/pricing">탑승권</a></li>
              <li><a href="/courses">노선도</a></li>
              <li><a href="/practice">승차하기</a></li>
              <li><a href="/enterprise">기관실</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">회원 서비스</h3>
            <ul className="space-y-2">
              <li><a href="/login">탑승</a></li>
              <li><a href="/signup">출발</a></li>
              <li><a href="/mypage">마이페이지</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">고객 지원</h3>
            <ul className="space-y-2">
              <li><a href="/contact">문의하기</a></li>
              <li><a href="/faq">자주 묻는 질문</a></li>
              <li><a href="/help">도움말</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">회사 정보</h3>
            <ul className="space-y-2">
              <li><a href="/about">회사 소개</a></li>
              <li><a href="/privacy">개인정보 처리방침</a></li>
              <li><a href="/terms">이용약관</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <Button variant="secondary" className="text-black">무료로 시작하기</Button>
          <p className="mt-4">&copy; 2025 DevRail. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
