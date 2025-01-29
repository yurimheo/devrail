import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaDocker, FaJenkins, FaUsers, FaTools, FaProjectDiagram, FaReact, FaNodeJs, FaGithub, FaGoogle, FaChartLine, FaNetworkWired } from "react-icons/fa";
import { SiTerraform, SiAnsible, SiArgo, SiKubernetes, SiPrometheus, SiGrafana } from "react-icons/si";

// 기술 스택 데이터
const techStack = [
  { name: "React", Icon: FaReact },
  { name: "Node.js", Icon: FaNodeJs },
  { name: "GitHub", Icon: FaGithub },
  { name: "GCP", Icon: FaGoogle },
  { name: "Terraform", Icon: SiTerraform },
  { name: "Jenkins", Icon: FaJenkins },
  { name: "Ansible", Icon: SiAnsible },
  { name: "ArgoCD", Icon: SiArgo },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "Docker", Icon: FaDocker },
  { name: "Prometheus", Icon: SiPrometheus },
  { name: "Grafana", Icon: SiGrafana },
  { name: "CI/CD 파이프라인", Icon: FaChartLine },
  { name: "네트워크 관리", Icon: FaNetworkWired },
];

// 팀원 데이터
const teamMembers = [
  { name: "강영규", role: "테라폼, 도커 스크립트 파일, 백엔드", bio: "실무 중심의 백엔드 전문가입니다." },
  { name: "김건", role: "쿠버네티스, 프론트엔드 & 백엔드", bio: "전체 시스템 통합 설계 및 구현 경험이 풍부합니다." },
  { name: "노을", role: "앤서블 스크립트 파일", bio: "자동화 및 배포 전문가로 다수 프로젝트 경험 보유." },
  { name: "남지민", role: "CI/CD, 스크립트 파일 작성", bio: "지속적 통합 및 배포 프로세스 구축 경험." },
  { name: "허유림", role: "모니터링, 깃허브 스크립트 파일", bio: "프론트엔드 설계 및 모니터링 시스템 전문." },
];

// 주요 기능 데이터
const features = [
  { title: "실전 프로젝트", description: "실제 기업 환경과 유사한 프로젝트로 실무 경험을 쌓아보세요.", Icon: FaProjectDiagram },
  { title: "전문가 멘토링", description: "업계 전문가들의 1:1 코칭으로 빠르게 성장하세요.", Icon: FaUsers },
  { title: "자동화 도구", description: "자동화 기술로 효율적인 워크플로우를 만드세요.", Icon: FaTools },
  { title: "DevOps 교육", description: "체계적이고 실용적인 교육으로 커리어를 시작하세요.", Icon: FaTools },
];

// 페이지 컴포넌트
export default function AboutPage() {
  return (
    <div className=" min-h-screen">
      <div className="w-full mx-auto pt-2 pb-16 flex justify-center bg-white">
      <div className="container p-8 bg-white ">
      <header className="py-5 text-center relative">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          DevRail 팀 소개
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          최고의 DevOps 학습 경험을 제공합니다.
        </motion.p>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* 프로젝트 소개 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            <Typewriter words={["프로젝트 소개"]} loop={1} cursor cursorStyle="_" typeSpeed={120} />
          </h2>
          <motion.p
            className="text-lg text-gray-700 text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            DevRail은 DevOps 기술을 학습할 수 있는 플랫폼으로, 개발자들이 실무에 필요한 기술을 체계적으로 배울 수 있도록 설계되었습니다.
          </motion.p>
        </section>

        {/* 주요 기능 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <feature.Icon className="text-4xl text-gray-800 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 mt-2">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 팀원 소개 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">우리 팀</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <div className="text-4xl mb-4 text-blue-500">
                  <FaUsers />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-700">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 사용 기술 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">사용 기술</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {techStack.map(({ name, Icon }, index) => (
              <motion.div
                key={name}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Icon className="text-4xl text-gray-800 mb-2" />
                <span className="text-sm text-gray-700">{name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
  <h2 className="text-3xl font-bold text-center mb-10">왜 DevRail 프로젝트를 진행했는가?</h2>
  <div className="bg-gray-100 rounded-lg p-8 shadow-lg space-y-6">
    {/* 1번: 실무 중심 학습의 필요성 */}
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="flex-shrink-0 w-16 h-16"
        style={{
          backgroundColor: "#9e2a2b",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        1
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">실무 중심 학습의 필요성</h3>
        <p className="text-gray-600">
          DevRail 프로젝트는 단순히 이론을 배우는 것을 넘어, 실제 DevOps 환경에서 사용하는 기술을 직접 경험하기 위해 시작되었습니다.
          실무에서 활용 가능한 기술을 익히는 것이 목표였습니다.
        </p>
      </div>
    </motion.div>

    {/* 2번: 팀워크와 협업 경험 */}
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex-shrink-0 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
        2
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">팀워크와 협업 경험</h3>
        <p className="text-gray-600">
          프로젝트를 진행하며 각 팀원이 맡은 역할에서 전문성을 쌓고, 협업을 통해 DevOps 환경에서의 팀워크와 문제 해결 능력을 배울 수 있었습니다.
        </p>
      </div>
    </motion.div>

    {/* 3번: 미래를 위한 기반 */}
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
        3
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">미래를 위한 기반</h3>
        <p className="text-gray-600">
          DevRail은 단순한 프로젝트를 넘어, 실제로 사용할 수 있는 기술을 익히며 미래 커리어를 위한 발판을 마련한 소중한 경험이 되었습니다.
        </p>
      </div>
    </motion.div>

    {/* 4번: 도전과 성장 */}
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex-shrink-0 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
        4
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">도전과 성장</h3>
        <p className="text-gray-600">
          프로젝트 과정에서 직면한 도전 과제를 해결하며 성장했고, 이를 통해 새로운 기술을 배우는 것에 대한 자신감을 얻게 되었습니다.
        </p>
      </div>
    </motion.div>
  </div>
</section>


      </main>
      </div>
      </div>
    </div>
  );
}
