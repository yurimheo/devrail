import React from 'react';
import { useNavigate } from 'react-router-dom';

function Button({ size, variant, children, onClick }) {
  const baseStyles = "px-6 py-2 rounded font-semibold";
  const sizeStyles = size === "lg" ? "text-lg" : "text-base";
  const variantStyles =
    variant === "secondary"
      ? "bg-secondary text-black"
      : "bg-primary text-white";

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles}`}
      onClick={onClick} 
    >
      {children}
    </button>
  );
}


export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-black to-white text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            DevOps 열차에 올라타세요.
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
          모든 정거장에서 배움이 기다립니다!
          </h1>
          <p className="text-xl mb-6">
            Docker부터 Kubernetes까지, DevOps의 모든 여정을 함께합니다.
          </p>
          <div className="flex space-x-4">
            <Button size="lg" variant="secondary" onClick={() => navigate("/pricing")}>탑승권 보기</Button>
            <Button size="lg" onClick={() => navigate("/login")}>지금 승차하기</Button>
          </div>
        </div>

      </div>
    </section>
  );
}
