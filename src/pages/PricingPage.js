import React, { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import PricingAccordion from "../components/PricingAccordion";
import PricingButton from "../components/PricingButton";
import PricingCard from "../components/PricingCard";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const devopsTools = [
  { name: "Docker", description: "컨테이너화 플랫폼으로 애플리케이션을 빠르게 구축, 테스트 및 배포할 수 있습니다.", icon: "/services-icons/docker-icon.svg", learningPeriod: "15일 ~ 20일" },
  { name: "Ansible", description: "자동화 도구로 인프라 구성, 애플리케이션 배포 및 작업 조정을 간소화합니다.", icon: "/services-icons/ansible-icon.svg", learningPeriod: "10일 ~ 15일" },
  { name: "Kubernetes", description: "컨테이너화된 애플리케이션의 자동 배포, 스케일링 및 관리를 위한 오픈소스 플랫폼입니다.", icon: "/services-icons/kubernetes-icon.svg", learningPeriod: "20일 ~ 25일" },
  { name: "Jenkins", description: "지속적 통합 및 지속적 배포(CI/CD)를 자동화하는 오픈 소스 자동화 서버입니다.", icon: "/services-icons/jenkins-icon.svg", learningPeriod: "10일 ~ 12일" },
  { name: "ArgoCD", description: "Kubernetes를 위한 선언적 GitOps 지속적 배포 도구입니다.", icon: "/services-icons/argocd-icon.svg", learningPeriod: "7일 ~ 10일" },
  { name: "Monitoring", description: "시스템 및 애플리케이션 성능을 실시간으로 추적하고 분석하는 도구입니다.", icon: "/services-icons/mysql-icon.svg", learningPeriod: "5일 ~ 8일" },
];

const planFeatures = {
  free: ["3일 동안 하루 30분 무료 사용", "모든 DevOps 도구 학습 가능", "커뮤니티 지원"],
  personal: ["모든 DevOps 도구 무제한 학습", "실습 환경 제공", "전문가 Q&A 지원"],
  enterprise: ["모든 DevOps 도구 무제한 접근", "워크스페이스 지원 (최대 100명)", "사용한 만큼 지불 (고객센터 문의)"],
};

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(""); // 선택한 요금제
  const [billingPeriod, setBillingPeriod] = useState("월간");
  const [showQRCode, setShowQRCode] = useState(false); // QR 코드 표시 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === "월간" ? "연간" : "월간");
  };

  const calculatePrice = (plan) => {
    if (plan === "free") return "3일 무료";

    const basePrice = plan === "personal" ? 14900 : 19900; // 기본 가격
    const multiplier = billingPeriod === "연간" ? 12 : 1; // 연간 결제는 12개월
    const discount = billingPeriod === "연간" ? 0.85 : 1; // 연간 결제는 15% 할인

    return `${Math.round(basePrice * multiplier * discount).toLocaleString()}원/${billingPeriod}`;
  };

  const handlePayment = () => {
    setShowQRCode(true);
  };

  const handlePaymentCompletion = () => {
    setIsLoading(true); // 로딩 시작
    setTimeout(() => {
      setIsLoading(false); // 로딩 종료
      navigate("/payment-success", {
        state: { selectedPlan, billingPeriod, price: calculatePrice(selectedPlan) },
      });
    }, 3000); // 3초 후에 결제 완료 페이지로 이동
  };

  const planLabels = {
    free: { korean: "프리티어", english: "free-tier" },
    personal: { korean: "개인", english: "personal" },
    enterprise: { korean: "기업", english: "enterprise" },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto pt-2 pb-16">
      <div className="w-full container mx-auto shadow-xl p-8 bg-white rounded-2xl">
        {showQRCode ? (
          <motion.div
          className={`flex flex-col items-center justify-center p-6 rounded-lg w-full max-w-md mx-auto ${
            isLoading ? "bg-white" : "bg-yellow-400 shadow-lg"
          }`}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <CircularProgress color="primary" />
                <p className="mt-4 text-lg font-semibold text-black">결제 완료 페이지로 이동 중...</p>
              </div>
            ) : (
              <>
                <img
                  src="/images/kakao-lion.png"
                  alt="카카오페이 라이언"
                  className="w-48 h-30"
                />
                <QRCodeCanvas
                  value="http://localhost:3000/payment-success"
                  size={200}
                  includeMargin={true}
                />
                <p className="mt-4 text-lg font-semibold text-black">카카오페이로 결제하세요</p>
                <motion.button
                  onClick={handlePaymentCompletion}
                  className="mt-6 bg-[#6F4E37] text-white px-4 py-2 rounded-lg shadow hover:bg-[#5C3E2E]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  결제 완료
                </motion.button>
              </>
            )}
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center border-b border-gray-200 pb-6"
            >
              <h1 className="text-4xl font-bold text-gray-900">DevRail 승차권</h1>
              <div className="flex items-center space-x-4">
                <span className={billingPeriod === "월간" ? "font-bold text-black" : "text-gray-500"}>월 결제</span>
                <div className="relative inline-block w-16 h-8">
                  <input
                    type="checkbox"
                    id="billingToggle"
                    className="hidden"
                    checked={billingPeriod === "연간"}
                    onChange={toggleBillingPeriod}
                  />
                  <label
                    htmlFor="billingToggle"
                    className="block bg-gray-200 w-full h-full rounded-full cursor-pointer transition-all relative"
                  >
                    <motion.span
                      className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md"
                      animate={{ x: billingPeriod === "연간" ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    ></motion.span>
                  </label>
                </div>
                <span className={billingPeriod === "연간" ? "font-bold text-black" : "text-gray-500"}>연 결제</span>
              </div>
            </motion.div>

            <div className="pt-8">
              <motion.div className="grid md:grid-cols-3 gap-6 mb-12">
                {Object.keys(planLabels).map((planKey) => (
                  <motion.div
                  key={planKey}
                  whileHover={{ scale: 1.05 }}
                  className={`cursor-pointer transition-all border-2 rounded-lg ${
                    selectedPlan === planKey ? "border-red-500" : "border-transparent"
                  } ${selectedPlan === planKey ? "shadow-lg" : "hover:shadow-md"}`}
                  onClick={() => setSelectedPlan(planKey)}
                >
                  <PricingCard>
                    <div className="flex items-center">
                      <h2 className="text-xl font-bold">{planLabels[planKey].korean}</h2>
                      <span className="text-sm text-gray-500 ml-2">| {planLabels[planKey].english}</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{calculatePrice(planKey)}</p>
                    <ul className="text-sm text-gray-600 space-y-2 mt-4">
                      {planFeatures[planKey].map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </PricingCard>
                </motion.div>
                
                ))}
              </motion.div>

              {selectedPlan && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-4">데브옵스 학습 정보</h3>
                    <PricingAccordion
                      items={devopsTools.map((tool) => ({
                        title: tool.name,
                        content: tool.description,
                        icon: tool.icon,
                        learningPeriod: tool.learningPeriod,
                      }))}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">결제 정보</h3>
                    <div className="border p-4 rounded-lg bg-yellow-50 mb-4">
                      <p className="text-sm text-yellow-800">현재 카카오페이로만 결제가 가능합니다.</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <p className="text-lg mb-2">
                        선택한 요금제: <span className="font-semibold">{planLabels[selectedPlan].korean}</span>
                      </p>
                      <p className="text-2xl font-bold text-red-500">최종 가격: {calculatePrice(selectedPlan)}</p>
                    </div>
                    <PricingButton
                      className={`w-full mt-6 py-3 text-lg font-semibold ${
                        selectedPlan === "free" ? "bg-red-500 hover:bg-red-600 text-white" : "bg-yellow-400 hover:bg-yellow-500 text-black"
                      }`}
                      onClick={handlePayment}
                    >
                      {selectedPlan === "free" ? "시작하기" : "카카오페이로 결제하기"}
                    </PricingButton>
                  </div>
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default PricingPage;
