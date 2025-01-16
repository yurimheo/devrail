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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto pt-2 pb-16">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">결제 완료</h2>
        {/* Ticket UI */}
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Ticket header */}
          <div className="bg-red-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">DevRail 승차권</h2>
            <span className="text-lg">
              #{Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}
            </span>
          </div>
          {/* Ticket body */}
          <div className="p-6 grid grid-cols-2 gap-6">
            <div className="border-r border-dashed border-gray-300 pr-6">
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
            <div className="flex flex-col items-center">
              <span className="text-gray-600">구매일:</span>
              <p className="text-xl font-semibold mb-6">{new Date().toLocaleDateString()}</p>
              <img src="/qr-code.png" alt="QR Code" className="w-24 h-24" />
              <p className="text-sm text-gray-600 mt-2">승차권 확인 QR 코드</p>
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
          className="mt-8 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mx-auto block"
        >
          닫기
        </button>
      </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
