import React from 'react';

function Button({ size, variant, children }) {
  const baseStyles = "px-4 py-2 font-semibold rounded";
  const sizeStyles = size === "lg" ? "text-lg" : "text-base";
  const variantStyles =
    variant === "secondary"
      ? "bg-secondary text-black"
      : variant === "outline"
      ? "border border-white text-white"
      : "bg-primary text-white";

  return <button className={`${baseStyles} ${sizeStyles} ${variantStyles}`}>{children}</button>;
}

export default function CTASection() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">지금 DevOps 열차에 탑승하세요!</h2>
        <p className="text-xl mb-8">최신 DevOps 기술을 배우고 커리어를 성장시키세요.</p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" variant="secondary">탑승권 보기</Button>
          <Button size="lg" variant="outline">무료로 시작하기</Button>
        </div>
      </div>
    </section>
  );
}
