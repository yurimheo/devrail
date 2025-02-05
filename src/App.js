import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import LearningPathSection from './components/LearningPathSection';
import ReviewsSection from './components/ReviewsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import PricingPage from './pages/PricingPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import CoursePage from './pages/CoursePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PracticePage from './pages/PracticePage';
import PracticeShellPage from './pages/PracticeShellPage';
import WorkspaceInfoPage from './pages/WorkspaceInfoPage';
import WorkspacePage from './pages/WorkspacePage';
import WorkspaceSettingsPage from './pages/WorkspaceSettingsPage';
import { UserProvider, useUser } from './context/UserContext'; // ✅ UserContext 추가

function Layout() {
  const location = useLocation();
  const { user } = useUser(); // ✅ 전역 상태에서 user 가져오기

  // ✅ PracticeShellPage에서 Header와 Footer 숨기기
  const isPracticeShellPage = /^\/practice\/[^/]+\/[^/]+$/.test(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ PracticeShellPage가 아닐 경우에만 Header 렌더링 */}
      {!isPracticeShellPage && <Header />} {/* ✅ `user`를 props로 전달할 필요 없음 */}
      <main className="flex-grow">
        <Routes>
          {/* 메인 페이지 */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ServicesSection />
                <LearningPathSection />
                <ReviewsSection />
                <CTASection />
              </>
            }
          />
          {/* 승차권 페이지 */}
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          {/* 로그인 및 회원가입 페이지 */}
          <Route path="/login" element={<Login />} /> {/* ✅ `setUser` props 제거 */}
          <Route path="/register" element={<RegisterPage />} />
          {/* 학습 소개 페이지 */}
          <Route path="/courses/:courseId?" element={<CoursePage />} />
          {/* 💚 실습실 💚 */}
          {/* 실습실 페이지 */}
          <Route path="/practice/:courseId?" element={<PracticePage />} />
          {/* 실습실 - 쉘 페이지 */}
          <Route
            path="/practice/:subject_id/:subject_course_id"
            element={<PracticeShellPage />}
          />
          {/* 팀 소개 페이지 */}
          <Route path="/about" element={<AboutPage />} />
          {/* 문의하기 페이지 */}
          <Route path="/contact" element={<ContactPage />} />

          {/* 💚 워크스페이스 💚 */}
          {/* 워크스페이스 소개 페이지 */}
          <Route path="/workspaces/info" element={<WorkspaceInfoPage />} />
          {/* 워크스페이스 페이지 */}
          <Route path="/workspaces/:workspace_id" element={<WorkspacePage />} />
          {/* 워크스페이스 관리자 페이지 */}
          <Route
            path="/workspaces/:workspace_id/settings"
            element={<WorkspaceSettingsPage />}
          />
        </Routes>
      </main>
      {/* ✅ PracticeShellPage가 아닐 경우에만 Footer 렌더링 */}
      {!isPracticeShellPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <UserProvider> {/* ✅ `UserProvider` 추가해서 전역 상태 관리 */}
      <Router>
        <Layout />
      </Router>
    </UserProvider>
  );
}
