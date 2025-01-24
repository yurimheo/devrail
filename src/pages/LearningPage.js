"use client"

import { useState } from "react"
import CourseCarousel from '../components/Course-carousel';
import { CourseContent } from "../components/Course-content"

const courses = [
  {
    id: "docker",
    name: "Docker 마스터 클래스",
    icon: "docker",
    description:
      "Docker를 통한 컨테이너화의 모든 것. 기초부터 고급 기술까지 실전 중심으로 학습하며, 현업에서 바로 적용 가능한 스킬을 익힙니다.",
    duration: "15일 (총 45시간)",
    level: "Beginner",
    prerequisites: ["기본적인 Linux 명령어 이해", "간단한 애플리케이션 개발 경험"],
    outline: [
      { day: 1, title: "Docker 소개 및 설치", description: "Docker의 기본 개념과 설치 방법을 학습합니다." },
      { day: 2, title: "컨테이너 기본 개념", description: "컨테이너의 개념과 가상화와의 차이점을 이해합니다." },
      { day: 3, title: "Docker CLI 활용", description: "Docker 명령어를 실습을 통해 익힙니다." },
      { day: 4, title: "Dockerfile 작성", description: "Dockerfile을 작성하여 커스텀 이미지를 만듭니다." },
      { day: 5, title: "Docker 이미지 최적화", description: "효율적인 Docker 이미지 생성 방법을 학습합니다." },
      { day: 6, title: "Docker Compose 기초", description: "Docker Compose를 이용한 다중 컨테이너 앱 관리를 배웁니다." },
      { day: 7, title: "Docker Compose 심화", description: "복잡한 애플리케이션 구성을 Docker Compose로 관리합니다." },
      { day: 8, title: "Docker 네트워킹", description: "Docker 네트워크 구성과 관리 방법을 학습합니다." },
      { day: 9, title: "Docker 볼륨", description: "데이터 영속성을 위한 Docker 볼륨 사용법을 익힙니다." },
      { day: 10, title: "Docker Swarm 기초", description: "Docker Swarm을 이용한 컨테이너 오케스트레이션을 배웁니다." },
      { day: 11, title: "Docker Swarm 심화", description: "Swarm을 이용한 서비스 확장과 로드 밸런싱을 학습합니다." },
      { day: 12, title: "Docker 보안", description: "Docker 컨테이너와 이미지의 보안 강화 방법을 익힙니다." },
      { day: 13, title: "모니터링과 로깅", description: "Docker 컨테이너의 모니터링과 로그 관리 기법을 배웁니다." },
      { day: 14, title: "CI/CD 파이프라인 구축", description: "Docker를 이용한 지속적 통합/배포 파이프라인을 구축합니다." },
      { day: 15, title: "실전 프로젝트", description: "배운 내용을 총동원하여 실제 마이크로서비스 아키텍처를 구현합니다." },
    ],
    skills: [
      "컨테이너 기술 이해 및 활용",
      "Docker 이미지 최적화",
      "멀티 컨테이너 애플리케이션 관리",
      "Docker를 활용한 CI/CD 구현",
      "Docker Swarm을 이용한 컨테이너 오케스트레이션",
      "Docker 네트워킹 및 보안 관리",
    ],
    projects: [
      {
        title: "마이크로서비스 컨테이너화",
        description: "실제 마이크로서비스 아키텍처를 Docker를 이용해 구현하고 배포합니다.",
      },
      {
        title: "CI/CD 파이프라인 구축",
        description: "Docker를 활용한 지속적 통합 및 배포 파이프라인을 구축합니다.",
      },
    ],
  },
  {
    id: "kubernetes",
    name: "Kubernetes 완전정복",
    icon: "kubernetes",
    description:
      "Kubernetes로 대규모 컨테이너 오케스트레이션의 세계로. 클러스터 관리부터 자동 스케일링, 롤링 업데이트까지 완벽 마스터.",
    duration: "6주 (총 60시간)",
    level: "Intermediate",
    prerequisites: ["Docker 기본 지식", "기본적인 네트워킹 이해"],
    outline: [
      { day: 1, title: "Kubernetes 소개", description: "Kubernetes 아키텍처 이해" },
      { day: 2, title: "기본 개념", description: "Pod, ReplicaSet, Deployment 개념" },
      { day: 3, title: "네트워킹", description: "서비스와 네트워킹" },
      { day: 4, title: "스토리지", description: "스토리지 및 퍼시스턴트 볼륨" },
      { day: 5, title: "구성 관리", description: "ConfigMap과 Secret" },
      { day: 6, title: "패키지 관리", description: "Helm을 이용한 패키지 관리" },
      { day: 7, title: "보안", description: "Kubernetes 보안" },
      { day: 8, title: "모니터링", description: "클러스터 모니터링 및 로깅" },
      { day: 9, title: "CI/CD", description: "CI/CD와 Kubernetes 통합" },
      { day: 10, title: "고가용성", description: "고가용성 클러스터 구성" },
      { day: 11, title: "서비스 메시", description: "서비스 메시 (Istio) 소개" },
      { day: 12, title: "실전 프로젝트", description: "마이크로서비스 배포 및 관리" },
    ],
    skills: [
      "컨테이너 오케스트레이션",
      "Kubernetes 클러스터 관리",
      "마이크로서비스 아키텍처 구현",
      "클라우드 네이티브 애플리케이션 배포",
    ],
    projects: [
      {
        title: "마이크로서비스 클러스터 구축",
        description: "실제 마이크로서비스를 Kubernetes 클러스터에 배포하고 관리합니다.",
      },
      {
        title: "CI/CD 파이프라인과 Kubernetes 통합",
        description: "Kubernetes를 활용한 완전 자동화된 배포 파이프라인을 구축합니다.",
      },
    ],
  },
  {
    id: "ansible",
    name: "Ansible",
    icon: "ansible",
    description:
      "Ansible로 인프라를 코드로 관리하는 방법을 마스터. 복잡한 환경 설정과 애플리케이션 배포를 자동화하여 운영 효율성을 극대화합니다.",
    duration: "3주",
    level: "Intermediate",
    prerequisites: ["기본적인 Linux 시스템 관리 경험", "YAML 문법 이해"],
    outline: [
      { day: 1, title: "Ansible 소개", description: "Ansible 소개 및 설치" },
      { day: 2, title: "기본 개념", description: "인벤토리와 플레이북 기초" },
      { day: 3, title: "변수와 팩트", description: "변수, 팩트, 조건문" },
      { day: 4, title: "템플릿", description: "Jinja2 템플릿" },
      { day: 5, title: "역할", description: "역할(Role) 생성 및 사용" },
      { day: 6, title: "보안", description: "Ansible Vault로 민감 정보 관리" },
      { day: 7, title: "동적 인벤토리", description: "동적 인벤토리 구성 및 관리" },
      { day: 8, title: "멱등성", description: "멱등성과 멀티 플랫폼 지원" },
      { day: 9, title: "AWX", description: "AWX (Ansible Tower) 소개" },
      { day: 10, title: "실전 프로젝트", description: "멀티 티어 애플리케이션 배포 자동화" },
    ],
  },
  {
    id: "jenkins",
    name: "Jenkins",
    icon: "jenkins",
    description:
      "Jenkins를 활용한 강력한 CI/CD 파이프라인 구축. 자동화된 빌드, 테스트, 배포로 개발 생산성을 혁신적으로 향상시킵니다.",
    duration: "4주",
    level: "Intermediate",
    prerequisites: ["기본적인 프로그래밍 지식", "Git 사용 경험"],
    outline: [
      { day: 1, title: "Jenkins 소개", description: "Jenkins 소개 및 설치" },
      { day: 2, title: "잡 관리", description: "젠킨스 잡 생성 및 관리" },
      { day: 3, title: "파이프라인", description: "파이프라인 문법과 Jenkinsfile" },
      { day: 4, title: "소스 코드 관리", description: "소스 코드 관리 통합 (Git)" },
      { day: 5, title: "빌드 트리거", description: "빌드 트리거 및 스케줄링" },
      { day: 6, title: "테스트 자동화", description: "테스트 자동화 통합" },
      { day: 7, title: "아티팩트 관리", description: "아티팩트 관리" },
      { day: 8, title: "배포 자동화", description: "배포 자동화 및 롤백" },
      { day: 9, title: "보안 설정", description: "Jenkins 보안 설정" },
      { day: 10, title: "분산 빌드", description: "분산 빌드 환경 구성" },
      { day: 11, title: "Blue Ocean", description: "Blue Ocean 사용법" },
      { day: 12, title: "실전 프로젝트", description: "마이크로서비스 CI/CD 파이프라인 구축" },
    ],
  },
  {
    id: "argocd",
    name: "ArgoCD",
    icon: "argocd",
    description:
      "ArgoCD로 GitOps 기반의 배포 자동화를 실현. 선언적 방식의 지속적 배포로 애플리케이션 관리를 혁신합니다.",
    duration: "2주",
    level: "Advanced",
    prerequisites: ["Kubernetes 기본 지식", "Git 사용 경험", "CI/CD 개념 이해"],
    outline: [
      { day: 1, title: "ArgoCD 소개", description: "GitOps 및 ArgoCD 소개" },
      { day: 2, title: "설치 및 설정", description: "ArgoCD 설치 및 설정" },
      { day: 3, title: "배포 자동화", description: "애플리케이션 배포 자동화" },
      { day: 4, title: "Sync 정책", description: "Sync 정책 및 전략" },
      { day: 5, title: "Health 체크", description: "Health 체크 및 롤백" },
      { day: 6, title: "멀티 클러스터", description: "멀티 클러스터 관리" },
      { day: 7, title: "Helm 통합", description: "Helm 차트 통합" },
      { day: 8, title: "Kustomize", description: "Kustomize 활용" },
      { day: 9, title: "보안", description: "RBAC 및 SSO 설정" },
      { day: 10, title: "실전 프로젝트", description: "마이크로서비스 GitOps 파이프라인 구축" },
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring",
    icon: "monitoring",
    description:
      "현대적인 모니터링 스택으로 시스템 가시성 확보. Prometheus, Grafana, ELK 스택을 활용해 강력한 모니터링 시스템을 구축합니다.",
    duration: "5주",
    level: "Advanced",
    prerequisites: ["기본적인 시스템 관리 경험", "Docker 및 Kubernetes 기초 지식"],
    outline: [
      { day: 1, title: "모니터링 기초", description: "모니터링 기초 및 최신 트렌드" },
      { day: 2, title: "Prometheus", description: "Prometheus 아키텍처 및 설치" },
      { day: 3, title: "PromQL", description: "PromQL을 이용한 메트릭 쿼리" },
      { day: 4, title: "Alertmanager", description: "Alertmanager 설정 및 알림 규칙" },
      { day: 5, title: "Grafana", description: "Grafana 대시보드 구성" },
      { day: 6, title: "ELK 스택", description: "로그 수집을 위한 ELK 스택 구축" },
      { day: 7, title: "분산 트레이싱", description: "분산 트레이싱 (Jaeger) 소개" },
      { day: 8, title: "Kubernetes 모니터링", description: "Kubernetes 모니터링 특화 기술" },
      { day: 9, title: "클라우드 네이티브 도구", description: "클라우드 네이티브 모니터링 도구 통합" },
      { day: 10, title: "대규모 시스템", description: "대규모 시스템 모니터링 전략" },
      { day: 11, title: "실전 프로젝트", description: "종합 모니터링 시스템 구축" },
    ],
  },
]

const userState = {
  isLoggedIn: false,
  hasPaid: false,
}

export default function CoursePage() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id)
  const currentCourse = courses.find((course) => course.id === selectedCourse) || courses[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto py-12 px-4 space-y-12">
        <CourseCarousel
          courses={courses}
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
        />
        <CourseContent course={currentCourse} userState={userState} />
      </div>
    </div>
  )
}
