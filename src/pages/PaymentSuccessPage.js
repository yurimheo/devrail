import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 전달받은 state가 없을 경우 기본값 설정
  const { selectedPlan = "없음", billingPeriod = "월간", price = "0원" } = location.state || {};

  const planLabels = {
    free: "프리티어",
    personal: "개인",
    enterprise: "기업",
  };

  // state가 없을 때 홈으로 리다이렉트
  if (!location.state) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">잘못된 접근입니다.</h1>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => navigate("/")}
          >
            홈으로 이동
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-6">결제 완료</h2>

      {/* Ticket UI */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Ticket header */}
        <div className="bg-red-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">DevRail 승차권</h2>
          <span className="text-lg">#{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
        </div>

        {/* Ticket body */}
        <div className="p-6 flex">
          {/* Left side */}
          <div className="flex-1 border-r border-dashed border-gray-300 pr-6">
            <div className="mb-4">
              <span className="text-gray-600">요금제:</span>
              <p className="text-xl font-semibold">{planLabels[selectedPlan]}</p>
            </div>
            <div className="mb-4">
              <span className="text-gray-600">가격:</span>
              <p className="text-xl font-semibold">{price}</p>
            </div>
            <div>
              <span className="text-gray-600">결제 주기:</span>
              <p className="text-xl font-semibold">{billingPeriod}</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex-1 pl-6 flex flex-col justify-between">
            <div>
              <span className="text-gray-600">구매일:</span>
              <p className="text-xl font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-center">
              <img src="/qr-code.png" alt="QR Code" className="w-24 h-24 mx-auto" />
              <p className="text-sm text-gray-600 mt-2">승차권 확인 QR 코드</p>
            </div>
          </div>
        </div>

        {/* Ticket footer */}
        <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
          본 승차권은 DevRail의 모든 서비스에 대한 접근 권한을 제공합니다.
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        닫기
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
