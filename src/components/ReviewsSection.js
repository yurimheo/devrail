import React from 'react';

// 카드 컴포넌트
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
  return <div>{children}</div>;
}

// 사용후기 데이터
const testimonials = [
  {
    name: '강영규',
    role: 'Junior DevOps Engineer',
    content: 'DevRail 덕분에 Docker를 마스터하고 첫 DevOps 프로젝트를 성공적으로 완료했습니다!',
    avatar: '/images/avatar1.png',
  },
  {
    name: '김건',
    role: 'Senior Software Developer',
    content: 'Kubernetes 학습이 어려웠는데, DevRail의 실습 중심 커리큘럼으로 쉽게 익힐 수 있었어요.',
    avatar: '/images/avatar2.png',
  },
  {
    name: '노을',
    role: 'DevOps Team Lead',
    content: '우리 팀 전체가 DevRail로 학습했고, 생산성이 50% 이상 향상되었습니다.',
    avatar: '/images/avatar3.png',
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">DevRail과 함께 성공한 이야기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
