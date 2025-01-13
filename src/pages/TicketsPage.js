import React, { useState, useEffect } from 'react';

// Simple Card Component
const Card = ({ children, className, onClick, style }) => (
  <div 
    className={`border rounded-lg p-6 shadow-md transition-all cursor-pointer ${className}`} 
    onClick={onClick}
    style={style}
  >
    {children}
  </div>
);

// Button Component
const Button = ({ children, onClick, className }) => (
  <button 
    className={`px-4 py-2 font-semibold rounded-md ${className}`} 
    onClick={onClick}
  >
    {children}
  </button>
);

// Accordion Component
const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg">
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggle(index)}
          >
            <div className="flex items-center space-x-2">
              <img src={item.icon} alt={`${item.title} icon`} className="h-6 w-6" />
              <span className="text-lg font-semibold text-gray-800">{item.title}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={openIndex === index ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          </div>
          {openIndex === index && (
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-600">{item.content}</p>
              <div className="mt-2 bg-gray-100 px-2 py-1 rounded-md inline-block text-sm text-gray-700">
                학습 단계: 1~5단계
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const devopsTools = [
  { name: 'Docker', description: '컨테이너화 플랫폼으로 애플리케이션을 빠르게 구축, 테스트 및 배포할 수 있습니다.', icon: '/services-icons/docker-icon.svg' },
  { name: 'Ansible', description: '자동화 도구로 인프라 구성, 애플리케이션 배포 및 작업 조정을 간소화합니다.', icon: '/services-icons/ansible-icon.svg' },
  { name: 'Kubernetes', description: '컨테이너화된 애플리케이션의 자동 배포, 스케일링 및 관리를 위한 오픈소스 플랫폼입니다.', icon: '/services-icons/kubernetes-icon.svg' },
  { name: 'Jenkins', description: '지속적 통합 및 지속적 배포(CI/CD)를 자동화하는 오픈 소스 자동화 서버입니다.', icon: '/services-icons/jenkins-icon.svg' },
  { name: 'ArgoCD', description: 'Kubernetes를 위한 선언적 GitOps 지속적 배포 도구입니다.', icon: '/services-icons/argocd-icon.svg' },
  { name: 'Monitoring', description: '시스템 및 애플리케이션 성능을 실시간으로 추적하고 분석하는 도구입니다.', icon: '/services-icons/mysql-icon.svg' },
];

const planFeatures = {
  free: [
    '3일 동안 하루 30분 무료 사용',
    '모든 DevOps 도구 학습 가능',
    '커뮤니티 지원'
  ],
  personal: [
    '모든 DevOps 도구 무제한 학습',
    '실습 환경 제공',
    '전문가 Q&A 지원'
  ],
  enterprise: [
    '모든 DevOps 도구 무제한 접근',
    '맞춤형 학습 경로',
    '전담 기술 지원'
  ]
};

function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [billingPeriod, setBillingPeriod] = useState('월간');
  const [enterpriseSeats, setEnterpriseSeats] = useState(1);

  const toggleBillingPeriod = (period) => {
    setBillingPeriod(period);
  };

  const calculatePrice = (plan) => {
    if (plan === 'free') return '3일 무료';

    const basePrice = plan === 'personal' ? 14900 : 13900;
    const multiplier = billingPeriod === '연간' ? 12 : 1;
    const discount = billingPeriod === '연간' ? 0.85 : 1;
    const total = Math.round(basePrice * multiplier * discount);

    return `${total.toLocaleString()}원/${billingPeriod}`;
  };

  const selectedPlanName = {
    free: '프리티어',
    personal: '개인',
    enterprise: '기업'
  }[selectedPlan] || '없음';

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pb-12">
      <div className="w-full max-w-5xl mx-auto shadow-lg mt-12 p-6 bg-white">
        <div className="flex justify-between items-center border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">DevRail 승차권</h1>
        </div>
        <div className="pt-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[{ name: '프리티어', value: 'free' }, { name: '개인', value: 'personal' }, { name: '기업', value: 'enterprise' }].map((plan) => (
              <Card 
                key={plan.value} 
                className={selectedPlan === plan.value ? 'border-red-500' : 'hover:border-red-500'} 
                onClick={() => setSelectedPlan(plan.value)}
                style={{ minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  {plan.name}
                </h2>
                <div className="flex flex-col items-center mb-4">
                  {plan.value !== 'free' && (
                    <>
                      <div className="flex bg-gray-200 rounded-full p-1">
                        <button
                          className={`px-3 py-1 text-sm rounded-full transition-all ${billingPeriod === '월간' ? 'bg-white text-black' : 'text-gray-500'}`}
                          onClick={() => toggleBillingPeriod('월간')}
                        >
                          월간
                        </button>
                        <button
                          className={`px-3 py-1 text-sm rounded-full transition-all ${billingPeriod === '연간' ? 'bg-white text-black' : 'text-gray-500'}`}
                          onClick={() => toggleBillingPeriod('연간')}
                        >
                          연간
                        </button>
                      </div>
                      <p className="text-center mt-2 text-xl font-bold text-gray-800">{calculatePrice(plan.value)}</p>
                    </>
                  )}
                  {plan.value === 'free' && (
                    <p className="text-center mt-2 text-xl font-bold text-gray-800">{calculatePrice(plan.value)}</p>
                  )}
                </div>
                <ul className="text-sm text-gray-600">
                  {planFeatures[plan.value].map((feature, index) => (
                    <li key={index} className="mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {selectedPlan && (
            <>
              {selectedPlan === 'enterprise' && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">기업 인원 선택</h3>
                  <div className="flex items-center space-x-4">
                    <Button className="bg-gray-200" onClick={() => setEnterpriseSeats(Math.max(1, enterpriseSeats - 1))}>-</Button>
                    <span>{enterpriseSeats}명</span>
                    <Button className="bg-gray-200" onClick={() => setEnterpriseSeats(enterpriseSeats + 1)}>+</Button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">데브옵스 학습 정보</h3>
                  <Accordion
                    items={devopsTools.map((tool) => ({
                      title: tool.name,
                      content: tool.description,
                      icon: tool.icon
                    }))}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">결제 정보</h3>
                  <div className="border p-4 rounded-lg bg-yellow-50">
                    <p className="text-sm text-yellow-800">현재 카카오페이로만 결제가 가능합니다.</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg">선택한 요금제: <span className="font-semibold">{selectedPlanName}</span></p>
                    <p className="text-2xl font-bold text-red-500 mt-2">최종 가격: {selectedPlan ? calculatePrice(selectedPlan) : '-'}</p>
                  </div>
                  <Button className={`w-full mt-6 ${selectedPlan === 'free' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'}`}>
                    {selectedPlan === 'free' ? '시작하기' : '카카오페이로 결제하기'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;