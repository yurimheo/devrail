import React from 'react';
import { useNavigate } from 'react-router-dom';

// 버튼
function Button({ size, variant, children, onClick }) {
  const baseStyles = "px-4 py-2 font-semibold rounded transition duration-300";
  const sizeStyles = size === "lg" ? "text-lg" : "text-base";
  const variantStyles =
    variant === "secondary"
      ? "bg-secondary text-black hover:bg-black hover:text-white hover:border hover:border-white"
      : variant === "outline"
      ? "border border-white text-white hover:bg-white hover:text-black"
      : "bg-primary text-white hover:bg-primary-dark";

  return (
    <button className={`${baseStyles} ${sizeStyles} ${variantStyles}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function CTASection() {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0); 
  };

  return (
    <section className="bg-gradient-to-b from-black via-gray-800 to-black text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 animate-pulse">지금 DevOps 열차에 탑승하세요!</h2>
        <p className="text-xl mb-8">최신 DevOps 기술을 배우고 커리어를 성장시키세요.</p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" variant="secondary" onClick={() => handleButtonClick("/pricing")}>
            승차권 보기
          </Button>
          <Button size="lg" variant="outline" onClick={() => handleButtonClick("/login")}>
            지금 승차하기
          </Button>
        </div>
      </div>
    </section>
  );
}
