import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import LearningPathSection from './components/LearningPathSection';
import ReviewsSection from './components/ReviewsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import PricingPage from './pages/PricingPage';
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import CoursePage from "./pages/CoursePage";
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage'; 
import PracticePage from "./pages/PracticePage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* 학습 소개 페이지 */}
            <Route path="/courses/:courseId?" element={<CoursePage />} />
            {/* 실습실 페이지 */}
            <Route path="/practice/:courseId?" element={<PracticePage />} />
            {/* 팀 소개 페이지 */}
            <Route path="/about" element={<AboutPage />} /> 
            {/* 문의하기 페이지 */}
            <Route path="/contact" element={<ContactPage />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
