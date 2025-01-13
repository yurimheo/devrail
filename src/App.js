import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import LearningPathSection from './components/LearningPathSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import TicketsPage from './pages/TicketsPage';

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
                  <TestimonialsSection />
                  <CTASection />
                </>
              }
            />
            {/* 승차권 페이지 */}
            <Route path="/pricing" element={<TicketsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
