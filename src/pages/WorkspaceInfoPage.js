import {
  FiCheckCircle,
  FiUsers,
  FiFileText,
  FiTerminal,
  FiBriefcase,
  FiBookOpen,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function WorkspaceInfoPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        {/* 헤더 섹션 */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            DevOps 학습을 위한 워크스페이스
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            팀을 위한 맞춤형 학습 환경을 만들어보세요.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition shadow-md"
            onClick={() => navigate('/workspaces/create')}
          >
            지금 시작하기
          </button>
        </section>

        {/* 워크스페이스 개요 */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-semibold mb-4">워크스페이스란?</h2>
            <p className="text-gray-600 mb-4">
              워크스페이스는 기업 사용자를 위한 맞춤형 학습 공간입니다. 팀원들과
              함께 DevOps 기술을 익히고 실무에 적용할 수 있습니다.
            </p>
            <ul className="space-y-2">
              {[
                '맞춤형 학습 환경 구축',
                '팀원 초대 및 관리',
                'PDF 자료 업로드',
                'Shell 실습 환경 제공',
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/images/workspace-placeholder.png"
              alt="워크스페이스"
              className="rounded-lg shadow-lg w-[800px] h-[300px]"
            />
          </div>
        </section>

        {/* 활용 사례 */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            워크스페이스 활용 사례
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '기업 교육',
                description:
                  '신입사원 교육과 팀 역량 강화를 위한 맞춤형 학습 환경.',
                icon: FiBriefcase,
              },
              {
                title: '강의 진행',
                description:
                  '강사가 학생들을 초대하여 효과적인 온라인 강의 진행 가능.',
                icon: FiBookOpen,
              },
              {
                title: '팀 프로젝트',
                description:
                  '팀원들과 함께 실제 프로젝트를 진행하며 실무 경험을 쌓을 수 있음.',
                icon: FiUsers,
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg text-center"
              >
                <useCase.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold">{useCase.title}</h3>
                <p className="text-gray-600 mt-2">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 주요 기능 */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '사용자 관리',
                description: '팀원을 초대하고 권한을 관리할 수 있습니다.',
                icon: FiUsers,
              },
              {
                title: 'PDF 업로드',
                description: '학습 자료를 쉽게 업로드하고 공유할 수 있습니다.',
                icon: FiFileText,
              },
              {
                title: 'Shell 학습',
                description: '실제 환경과 유사한 Shell 실습 환경을 제공합니다.',
                icon: FiTerminal,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg text-center"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            DevOps 학습의 미래를 경험하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            지금 바로 워크스페이스를 만들고 팀의 DevOps 역량을 강화하세요.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition shadow-md"
            onClick={() => navigate('/workspaces/create')}
          >
            무료로 시작하기
          </button>
        </section>
      </main>
    </div>
  );
}
