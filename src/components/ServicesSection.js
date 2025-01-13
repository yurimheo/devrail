import React from 'react';

// Card 컴포넌트 정의
function Card({ children }) {
  return <div className="bg-white shadow-md rounded-lg p-4">{children}</div>;
}

function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

function CardTitle({ children }) {
  return <h3 className="text-lg font-bold">{children}</h3>;
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
function Button({ variant, children }) {
  const baseStyles = "px-4 py-2 font-semibold rounded";
  const variantStyles =
    variant === "outline"
      ? "border border-gray-500 text-gray-500"
      : "bg-primary text-white";

  return <button className={`${baseStyles} ${variantStyles}`}>{children}</button>;
}

// ServicesSection 컴포넌트 정의
const services = [
  { name: 'Docker', icon: '/services-icons/docker-icon.svg' },
  { name: 'Kubernetes', icon: '/services-icons/kubernetes-icon.svg' },
  { name: 'Jenkins', icon: '/services-icons/jenkins-icon.svg' },
  { name: 'ArgoCD', icon: '/services-icons/argocd-icon.svg' },
  { name: 'Ansible', icon: '/services-icons/ansible-icon.svg' },
  { name: 'MySQL', icon: '/services-icons/mysql-icon.svg' },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">DevRail에서 만나볼 수 있는 DevOps 기술</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.name}>
              <CardHeader>
                <img src={service.icon} alt={service.name} className="w-12 h-12 mb-2" />
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {service.name}의 기초부터 고급 기술까지 배워보세요.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline">자세히 보기</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
