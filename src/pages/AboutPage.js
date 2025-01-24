import React from 'react';
import { motion } from 'framer-motion'; // framer-motion을 이용한 애니메이션 추가
import { FaTools, FaProjectDiagram, FaUsers } from 'react-icons/fa'; // 아이콘 추가
import { Typewriter } from 'react-simple-typewriter'; // 타이핑 애니메이션

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto pt-2 pb-16">
        <motion.div
          className="w-full container mx-auto shadow-xl p-8 bg-white rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 프로젝트 소개 */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-semibold mb-4 text-gray-800"
            >
              <Typewriter
                words={['프로젝트 소개']}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={120}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              DevRail은 DevOps 기술을 마스터할 수 있는 종합 학습 플랫폼입니다. 이 플랫폼은 실제 DevOps 툴을 사용하여,
              개발자들이 실습을 통해 배우고 프로젝트를 경험할 수 있도록 설계되었습니다. 우리의 목표는 실무에서 바로
              활용할 수 있는 기술을 제공하고, 지속 가능한 DevOps 환경을 만들 수 있도록 돕는 것입니다.
            </motion.p>
            <motion.p
              className="text-lg text-gray-700 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              이 프로젝트는 DevOps 분야에서 필요한 다양한 기술을 학습할 수 있는 기회를 제공하며, 클라우드와
              컨테이너화된 환경에서의 애플리케이션 배포 및 관리에 필요한 지식을 쌓을 수 있게 합니다.
            </motion.p>
          </motion.section>

          {/* 팀원 소개 */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.h2
              className="text-3xl font-semibold mb-4 text-gray-800"
            >
              <Typewriter
                words={['팀원 소개']}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={120} // 타이핑 속도를 살짝 느리게 설정
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[ 
                { name: '강영규', role: '테라폼, 도커 스크립트 파일, 백엔드' },
                { name: '김건', role: '쿠버네티스, 쿠버네티스 스크립트 파일, 프론트엔드 & 백엔드' },
                { name: '노을', role: '앤서블, 앤서블 스크립트 파일' },
                { name: '남지민', role: 'CI/CD, CI/CD 스크립트 파일' },
                { name: '허유림', role: '모니터링, 깃허브 스크립트 파일, 프론트엔드' }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 border rounded-lg bg-white shadow-lg transform hover:scale-110 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 팀 비전 */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <motion.h2
              className="text-3xl font-semibold mb-4 text-gray-800"
            >
              <Typewriter
                words={['팀 비전']}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={120} // 타이핑 속도를 살짝 느리게 설정
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.5 }}
            >
              DevRail 팀은 각자의 전문 영역에서 뛰어난 능력을 발휘하며, DevOps 분야에서의 선도적인 기술과
              혁신적인 접근 방식을 통해 개발자들에게 더 나은 학습 경험을 제공하고 있습니다.
            </motion.p>
            <motion.p
              className="text-lg text-gray-700 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 4 }}
            >
              우리 팀은 효율적인 협업을 통해 혁신적인 DevOps 교육 환경을 구축하며, 최신 기술을 통한 빠른
              문제 해결 능력을 키워가고 있습니다.
            </motion.p>
          </motion.section>

          {/* 사용한 기술 스택 */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5 }}
          >
            <motion.h2
              className="text-3xl font-semibold mb-4 text-gray-800"
            >
              <Typewriter
                words={['사용한 기술 스택']}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={120} // 타이핑 속도를 살짝 느리게 설정
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[ 
                { name: 'Docker', icon: '/services-icons/docker-icon.svg', description: '컨테이너 기술로 애플리케이션을 빠르게 구축 및 배포.' },
                { name: 'Kubernetes', icon: '/services-icons/kubernetes-icon.svg', description: '컨테이너 오케스트레이션 및 클러스터 관리 도구.' },
                { name: 'Ansible', icon: '/services-icons/ansible-icon.svg', description: '자동화된 구성 관리 및 배포 도구.' },
                { name: 'Jenkins', icon: '/services-icons/jenkins-icon.svg', description: 'CI/CD 파이프라인 구축 및 자동화 도구.' },
                { name: 'ArgoCD', icon: '/services-icons/argocd-icon.svg', description: 'GitOps 기반의 지속적 배포 도구.' }
              ].map((tool, index) => (
                <motion.div
                  key={index}
                  className="p-6 border rounded-lg bg-white shadow-lg transform hover:scale-110 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                >
                  <div className="flex flex-col items-center">
                    <img src={tool.icon} alt={tool.name} className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800">{tool.name}</h3>
                    <p className="text-gray-600 text-center">{tool.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 우리가 배운 점 */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5.5 }}
          >
            <motion.h2
              className="text-3xl font-semibold mb-4 text-gray-800"
            >
               프로젝트를 통해서 배운 점
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[ 
                { icon: <FaTools className="text-blue-600 text-4xl mb-4" />, text: '자동화 도구를 사용하여 개발 프로세스를 효율화하는 법' },
                { icon: <FaProjectDiagram className="text-blue-600 text-4xl mb-4" />, text: 'CI/CD 파이프라인을 통해 빠른 배포와 안정적인 운영 환경 구축' },
                { icon: <FaUsers className="text-blue-600 text-4xl mb-4" />, text: '협업 툴 사용을 통해 팀 내 커뮤니케이션과 작업 효율 향상' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 border rounded-lg bg-white shadow-lg transform hover:scale-105 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <p className="text-lg text-gray-600">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
