import React from 'react';
import { useNavigate } from 'react-router-dom';

// Card 컴포넌트 정의
function Card({ children, isDisabled }) {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 transition-transform duration-300 hover:scale-105 ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

function CardTitle({ children, isDisabled }) {
  return (
    <h3 className={`text-lg font-bold ${isDisabled ? 'text-gray-400' : 'text-black'}`}>
      {children}
    </h3>
  );
}

function CardContent({ children }) {
  return <div className="mb-4">{children}</div>;
}

function CardDescription({ children }) {
  return <p className="text-gray-600">{children}</p>;
}

function CardFooter({ children }) {
  return <div>{children}</div>;
}

// Button 컴포넌트 정의
function Button({ variant, children, onClick, isDisabled }) {
  const baseStyles = "px-4 py-2 font-semibold rounded transition duration-300";
  const variantStyles =
    variant === "secondary"
      ? "bg-secondary text-black"
      : variant === "outline"
      ? "border border-gray text-gray-500 hover:bg-black hover:text-white"
      : "bg-primary text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${isDisabled ? 'cursor-not-allowed' : ''}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

// ServicesSection 컴포넌트 정의
const services = [
  { name: 'Docker', icon: '/services-icons/docker-icon.svg', route: 'docker' },
  { name: 'Kubernetes', icon: '/services-icons/kubernetes-icon.svg', route: 'kubernetes' },
  { name: 'Jenkins', icon: '/services-icons/jenkins-icon.svg', route: 'jenkins' },
  { name: 'ArgoCD', icon: '/services-icons/argocd-icon.svg', route: 'argocd' },
  { name: 'Ansible', icon: '/services-icons/ansible-icon.svg', route: 'ansible' },
  { name: 'GitHub', icon: '/services-icons/github-icon.svg', route: 'github' },
  { name: 'Terraform', icon: '/services-icons/terraform-icon.svg', route: 'terraform', isDisabled: true },
  { name: 'Monitoring', icon: '/services-icons/monitoring-icon.svg', route: 'monitoring', isDisabled: true },
  { name: 'Mysql', icon: '/services-icons/mysql-icon.svg', route: 'mysql', isDisabled: true },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(`/courses/${route}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">DevRail에서 만나볼 수 있는 DevOps 기술</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.name} isDisabled={service.isDisabled}>
              <CardHeader>
                <img src={service.icon} alt={service.name} className="w-12 h-12 mb-2" />
                <CardTitle isDisabled={service.isDisabled}>
                  {service.name}
                  {service.isDisabled && <span className="text-xs text-gray-500 ml-2">업데이트 예정</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {service.isDisabled ? `이 과목은 현재 준비 중입니다. 잠시만 기다려 주세요. ( •̀ ω •́ )✧` : `${service.name}의 기초부터 고급 기술까지 배워보세요.`}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={() => handleButtonClick(service.route)}
                  isDisabled={service.isDisabled}
                >
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
