export const courses = [
  {
    id: 'docker',
    name: 'Docker',
    icon: 'docker',
    description:
      'Docker를 통한 컨테이너화의 모든 것. 기초부터 고급 기술까지 실전 중심으로 학습하며, 현업에서 바로 적용 가능한 스킬을 익힙니다.',
    duration: '15일 (총 45시간)',
    level: 'Beginner',
    prerequisites: [
      '기본적인 Linux 명령어 이해',
      '간단한 애플리케이션 개발 경험',
    ],
    outline: [
      {
        day: 1,
        title: 'Docker 소개 및 설치',
        description: 'Docker의 기본 개념과 설치 방법을 학습합니다.',
      },
      {
        day: 2,
        title: 'Docker 기본 명령어',
        description: 'Docker의 기본적인 명령어 사용법을 익힙니다.',
      },
      {
        day: 3,
        title: 'Docker 이미지 이해',
        description: 'Docker 이미지를 만들고 관리하는 방법을 배웁니다.',
      },
      {
        day: 4,
        title: '컨테이너 실행과 관리',
        description:
          'Docker에서 컨테이너를 실행하고 관리하는 방법을 실습합니다.',
      },
      {
        day: 5,
        title: 'Dockerfile 작성',
        description:
          'Dockerfile을 사용하여 커스텀 이미지를 만드는 방법을 배웁니다.',
      },
      {
        day: 6,
        title: 'Docker Compose 기초',
        description:
          'Docker Compose를 사용하여 다중 컨테이너 환경을 구성합니다.',
      },
      {
        day: 7,
        title: 'Docker Compose 심화',
        description:
          '복잡한 다중 컨테이너 애플리케이션을 Docker Compose로 관리하는 방법을 배웁니다.',
      },
      {
        day: 8,
        title: 'Docker 네트워킹 기초',
        description: 'Docker 네트워크의 기본 개념과 구성 방법을 학습합니다.',
      },
      {
        day: 9,
        title: 'Docker 네트워킹 심화',
        description:
          'Docker 네트워크 연결과 다양한 네트워크 모드의 활용법을 배웁니다.',
      },
      {
        day: 10,
        title: 'Docker 볼륨',
        description:
          'Docker 볼륨을 사용하여 데이터를 영속적으로 관리하는 방법을 익힙니다.',
      },
      {
        day: 11,
        title: 'Docker 보안 기초',
        description: 'Docker 이미지와 컨테이너 보안의 기본 개념을 학습합니다.',
      },
      {
        day: 12,
        title: 'Docker 보안 실습',
        description: 'Docker의 보안을 강화하는 방법과 실습을 진행합니다.',
      },
      {
        day: 13,
        title: 'Docker 이미지 최적화',
        description:
          'Docker 이미지를 효율적으로 만들고 최적화하는 방법을 배웁니다.',
      },
      {
        day: 14,
        title: 'Docker Compose 활용 사례',
        description:
          'Docker Compose를 활용하여 실제 환경에서 다중 컨테이너를 관리합니다.',
      },
      {
        day: 15,
        title: '실전 프로젝트',
        description:
          '실제 마이크로서비스 아키텍처를 Docker를 이용해 구축하고 배포하는 프로젝트입니다.',
      },
    ],
    skills: [
      'Docker 기본 명령어 사용',
      'Docker 이미지 및 컨테이너 관리',
      'Docker Compose로 다중 컨테이너 환경 구성',
      'Docker 네트워크 및 볼륨 활용',
      'Docker 보안 및 최적화',
      '실전 프로젝트 구현',
    ],
    how_it_works: {
      environment: '환경에 대해서 알아서..',
      usage_limit: '하루 최대 8시간 사용 가능, 데이터는 저장되지 않음',
      steps: ['실습 방식에 대해 알아서..', '더 늘려서 쓰던가..'],
    },
    isDisabled: false,
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: 'kubernetes',
    description:
      'Kubernetes로 대규모 컨테이너 오케스트레이션의 세계로. 클러스터 관리부터 자동 스케일링, 롤링 업데이트까지 완벽 마스터.',
    duration: '15일 (총 45시간)',
    level: 'Intermediate',
    prerequisites: ['Docker 기본 지식', '기본적인 네트워킹 이해'],
    outline: [
      {
        day: 1,
        title: 'Kubernetes 소개',
        description: 'Kubernetes 아키텍처와 기본 개념을 이해합니다.',
      },
      {
        day: 2,
        title: 'Kubernetes 설치',
        description:
          '로컬 및 클라우드 환경에서 Kubernetes 클러스터를 설치하고 구성합니다.',
      },
      {
        day: 3,
        title: 'Pod와 컨테이너',
        description: 'Kubernetes의 기본 단위인 Pod와 컨테이너를 다룹니다.',
      },
      {
        day: 4,
        title: 'ReplicaSet과 Deployment',
        description:
          'ReplicaSet과 Deployment의 개념 및 활용법을 배우고 실습합니다.',
      },
      {
        day: 5,
        title: '서비스 디스커버리',
        description:
          '서비스 디스커버리와 Kubernetes 서비스 객체에 대해 배웁니다.',
      },
      {
        day: 6,
        title: '네트워킹 개요',
        description:
          'Kubernetes 클러스터 내에서의 네트워킹 구조와 서비스를 연결하는 방법을 배웁니다.',
      },
      {
        day: 7,
        title: 'ConfigMap과 Secret',
        description:
          '애플리케이션 설정과 민감한 데이터를 Kubernetes 환경에서 안전하게 관리하는 방법을 배웁니다.',
      },
      {
        day: 8,
        title: 'Storage와 Volume',
        description:
          'Pod에 지속적인 저장소를 제공하는 방법과 Kubernetes Volume 사용법을 다룹니다.',
      },
      {
        day: 9,
        title: 'Health Check',
        description:
          'Pod와 컨테이너의 상태 확인 및 자동 복구를 위한 Health Check 설정 방법을 배웁니다.',
      },
      {
        day: 10,
        title: '자동 스케일링',
        description:
          'Kubernetes의 Horizontal Pod Autoscaler를 사용하여 애플리케이션을 자동으로 스케일링합니다.',
      },
      {
        day: 11,
        title: '롤링 업데이트',
        description:
          '무중단 배포를 위한 롤링 업데이트와 버전 관리를 실습합니다.',
      },
      {
        day: 12,
        title: '클러스터 관리',
        description:
          'Kubernetes 클러스터의 관리, 모니터링, 로그 수집 및 문제 해결 방법을 배웁니다.',
      },
      {
        day: 13,
        title: 'Helm',
        description:
          'Helm을 사용하여 Kubernetes 애플리케이션 배포를 자동화하고 효율적으로 관리합니다.',
      },
      {
        day: 14,
        title: 'CI/CD와 Kubernetes',
        description:
          'Kubernetes 환경에서 CI/CD 파이프라인을 구축하고 자동화하는 방법을 배우고 실습합니다.',
      },
      {
        day: 15,
        title: '실전 프로젝트',
        description:
          '실제 환경에서 Kubernetes를 활용하여 마이크로서비스 아키텍처를 구축하고 배포합니다.',
      },
    ],
    skills: [
      '컨테이너 오케스트레이션',
      'Kubernetes 클러스터 관리',
      '마이크로서비스 아키텍처 구현',
      '배포 자동화 및 CI/CD 파이프라인 구축',
      '클라우드 네이티브 애플리케이션 설계',
    ],
    how_it_works: {
      environment: '환경에 대해서 알아서..',
      usage_limit: '하루 최대 8시간 사용 가능, 데이터는 저장되지 않음',
      steps: ['실습 방식에 대해 알아서..', '더 늘려서 쓰던가..'],
    },
    isDisabled: false,
  },
  {
    id: 'ansible',
    name: 'Ansible',
    icon: 'ansible',
    description:
      'Ansible로 인프라를 코드로 관리하는 방법을 마스터. 복잡한 환경 설정과 애플리케이션 배포를 자동화하여 운영 효율성을 극대화합니다.',
    duration: '15일',
    level: 'Intermediate',
    prerequisites: ['기본적인 Linux 시스템 관리 경험', 'YAML 문법 이해'],
    outline: [
      { day: 1, title: 'Ansible 소개', description: 'Ansible 소개 및 설치' },
      { day: 2, title: '기본 개념', description: '인벤토리와 플레이북 기초' },
      {
        day: 3,
        title: 'Ansible 변수',
        description: 'Ansible 변수와 템플릿 사용법',
      },
      {
        day: 4,
        title: '플레이북 작성',
        description: '플레이북 작성 및 구조 이해',
      },
      {
        day: 5,
        title: '핸드북과 모듈',
        description: '핸드북 작성 및 모듈 사용법',
      },
      {
        day: 6,
        title: 'Ansible Galaxy',
        description: 'Ansible Galaxy로 역할을 가져오는 방법',
      },
      {
        day: 7,
        title: 'Ansible에서 조건문과 루프 사용',
        description: '조건문 및 루프를 활용한 자동화',
      },
      {
        day: 8,
        title: '핸드북 리팩토링',
        description: 'Ansible 플레이북 리팩토링 기법',
      },
      {
        day: 9,
        title: 'Ansible 관리 도구',
        description: 'Ansible Tower 및 AWX 사용법',
      },
      {
        day: 10,
        title: 'Ansible에서 역할 관리',
        description: 'Ansible 역할(Role)을 관리하는 방법',
      },
      {
        day: 11,
        title: '고급 플레이북 기법',
        description: '고급 플레이북 작성 및 실행',
      },
      {
        day: 12,
        title: 'Ansible Vault',
        description: '민감 정보 암호화를 위한 Ansible Vault 사용법',
      },
      {
        day: 13,
        title: 'Ansible을 통한 클라우드 자동화',
        description: '클라우드 환경에 Ansible 적용',
      },
      {
        day: 14,
        title: 'Ansible 테스트',
        description: 'Ansible 플레이북 테스트 및 디버깅 기법',
      },
      {
        day: 15,
        title: '인프라 자동화 프로젝트',
        description: '실제 인프라를 자동으로 배포하는 프로젝트',
      },
    ],
    skills: [
      '자동화된 배포',
      'YAML을 이용한 구성 관리',
      'Ansible Playbook 작성',
      'Ansible Galaxy 사용',
      'Ansible Vault 활용',
      'Ansible Tower 및 AWX 관리',
    ],
    how_it_works: {
      environment: '환경에 대해서 알아서..',
      usage_limit: '하루 최대 8시간 사용 가능, 데이터는 저장되지 않음',
      steps: ['실습 방식에 대해 알아서..', '더 늘려서 쓰던가..'],
    },
    isDisabled: false,
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    icon: 'jenkins',
    description:
      'Jenkins를 활용한 강력한 CI/CD 파이프라인 구축. 자동화된 빌드, 테스트, 배포로 개발 생산성을 혁신적으로 향상시킵니다.',
    duration: '15일',
    level: 'Intermediate',
    prerequisites: ['기본적인 프로그래밍 지식', 'Git 사용 경험'],
    outline: [
      {
        day: 1,
        title: 'Jenkins 소개 및 설치',
        description: 'Jenkins 소개 및 설치',
      },
      { day: 2, title: '잡 관리', description: '젠킨스 잡 생성 및 관리' },
      {
        day: 3,
        title: 'Jenkinsfile 작성에 대한 이해 및 활용',
        description: 'Jenkinsfile 작성 및 이해',
      },
      {
        day: 4,
        title: '빌드 자동화',
        description: 'Jenkins를 통한 빌드 자동화 구현',
      },
      {
        day: 5,
        title: '테스트 자동화',
        description: '자동화된 테스트 환경 설정',
      },
      {
        day: 6,
        title: '배포 자동화',
        description: 'Jenkins를 통한 배포 자동화 구현',
      },
      {
        day: 7,
        title: 'Jenkins 플러그인 활용',
        description: 'Jenkins 플러그인 설치 및 활용법',
      },
      {
        day: 8,
        title: 'CI 파이프라인 설계',
        description: '효율적인 CI 파이프라인 설계',
      },
      {
        day: 9,
        title: 'CD 파이프라인 설계',
        description: '지속적 배포 파이프라인 설계',
      },
      {
        day: 10,
        title: 'Jenkins 보안 설정',
        description: 'Jenkins의 보안 설정 및 관리',
      },
      {
        day: 11,
        title: 'Jenkins와 GitHub 통합',
        description: 'Jenkins와 GitHub 연동 설정',
      },
      {
        day: 12,
        title: 'Jenkins 대시보드 설정',
        description: '대시보드 구성 및 모니터링 설정',
      },
      {
        day: 13,
        title: 'Jenkins 고급 기능',
        description: '고급 기능 활용 및 최적화',
      },
      {
        day: 14,
        title: '파이프라인 성능 최적화',
        description: 'Jenkins 파이프라인 성능 최적화',
      },
      {
        day: 15,
        title: 'CI/CD 파이프라인 구축',
        description: '실제 프로젝트로 CI/CD 파이프라인 구축',
      },
    ],
    skills: [
      'CI/CD 파이프라인 설계',
      '테스트 자동화 통합',
      'Jenkinsfile 작성 및 관리',
      '배포 자동화',
      'Jenkins 플러그인 활용',
      '보안 설정 및 최적화',
    ],
    how_it_works: {
      environment: '환경에 대해서 알아서..',
      usage_limit: '하루 최대 8시간 사용 가능, 데이터는 저장되지 않음',
      steps: ['실습 방식에 대해 알아서..', '더 늘려서 쓰던가..'],
    },
  },
  {
    id: 'argocd',
    name: 'ArgoCD',
    icon: 'argocd',
    description:
      'ArgoCD로 GitOps 기반의 배포 자동화를 실현. 선언적 방식의 지속적 배포로 애플리케이션 관리를 혁신합니다.',
    duration: '15일',
    level: 'Advanced',
    prerequisites: ['Kubernetes 기본 지식', 'Git 사용 경험', 'CI/CD 개념 이해'],
    outline: [
      { day: 1, title: 'ArgoCD 소개', description: 'GitOps 및 ArgoCD 소개' },
      { day: 2, title: '설치 및 설정', description: 'ArgoCD 설치 및 설정' },
      {
        day: 3,
        title: 'GitOps 원리 이해',
        description: 'GitOps의 원리 및 사용법',
      },
      {
        day: 4,
        title: 'Kubernetes와 통합',
        description: 'Kubernetes 환경과 ArgoCD 통합',
      },
      {
        day: 5,
        title: '배포 자동화',
        description: 'ArgoCD를 사용한 자동화된 배포',
      },
      { day: 6, title: 'ArgoCD UI 사용법', description: 'ArgoCD 웹 UI 사용법' },
      {
        day: 7,
        title: '배포 설정 관리',
        description: '배포 설정 및 리소스 관리',
      },
      {
        day: 8,
        title: 'Sync 정책 이해',
        description: 'ArgoCD Sync 정책 설정 및 관리',
      },
      {
        day: 9,
        title: 'GitOps 파이프라인 구축',
        description: 'GitOps 기반 파이프라인 구축',
      },
      {
        day: 10,
        title: '롤백 및 복구',
        description: '배포 실패 시 롤백 및 복구 방법',
      },
      {
        day: 11,
        title: 'ArgoCD 대시보드 사용법',
        description: 'ArgoCD 대시보드에서 모니터링',
      },
      {
        day: 12,
        title: '모니터링 및 로그',
        description: 'ArgoCD의 모니터링 및 로그 설정',
      },
      {
        day: 13,
        title: 'CI/CD와 통합',
        description: 'CI/CD 도구와 ArgoCD 통합',
      },
      {
        day: 14,
        title: '보안 설정',
        description: 'ArgoCD의 보안 설정 및 관리',
      },
      {
        day: 15,
        title: 'GitOps 프로젝트 구축',
        description: 'GitOps 파이프라인을 통해 프로젝트 구현',
      },
    ],
    skills: [
      'GitOps 기반의 배포',
      'ArgoCD의 Sync 정책 설정',
      'Kubernetes와 ArgoCD 통합',
      '자동화된 배포',
      '배포 설정 및 관리',
      'CI/CD 파이프라인 통합',
    ],
    how_it_works: {
      environment: '환경에 대해서 알아서..',
      usage_limit: '하루 최대 8시간 사용 가능, 데이터는 저장되지 않음',
      steps: ['실습 방식에 대해 알아서..', '더 늘려서 쓰던가..'],
    },
  },
  {
    id: 'git',
    name: 'Git',
    icon: 'git',
    description:
      'Git **CLI(Command Line Interface)** 를 활용하여 **Git의 핵심 개념**을 익히고, 실전에서 활용할 수 있도록 구성되어 있습니다. \n\n단순히 명령어를 배우는 것이 아니라, **Git을 실제로 활용**하는 방법과 **협업 과정에서의 최적화된 사용법**을 학습하는 것을 목표로 합니다.',
    duration: '15일',
    level: 'Beginner',
    prerequisites: [
      '기본적인 명령줄 인터페이스(CLI) 사용법',
      '기본적인 프로그래밍 경험',
      'GitHub 계정',
    ],
    outline: [
      {
        day: 1,
        title: 'Git 기본',
        description:
          'Git의 개념과 CLI 기본 사용법, 저장소 초기화 및 첫 커밋 실습',
      },
      {
        day: 2,
        title: 'GitHub 소개 및 원격 저장소',
        description:
          'GitHub 계정 생성, SSH 키 설정, 원격 저장소 연결 및 push/pull 실습',
      },
      {
        day: 3,
        title: '브랜치와 협업 기초',
        description: 'Git 브랜치 개념과 기본적인 브랜치 생성 및 병합',
      },
      {
        day: 4,
        title: '브랜치 충돌 해결',
        description: 'Git 충돌 발생 원리와 해결 방법',
      },
      {
        day: 5,
        title: 'Git 로그와 히스토리 관리',
        description: 'Git 로그 조회 및 reset/revert를 활용한 기록 관리',
      },
      {
        day: 6,
        title: 'GitHub Fork & Pull Request',
        description: 'GitHub에서 Fork 및 Pull Request(PR) 활용 방법',
      },
      {
        day: 7,
        title: '원격 저장소와 협업',
        description: 'Git fetch, pull, push 명령어와 협업 워크플로우',
      },
      {
        day: 8,
        title: 'Git Stash와 작업 관리',
        description: 'Stash를 활용한 임시 변경 사항 저장 및 복원',
      },
      {
        day: 9,
        title: 'Git Rebase 활용',
        description: 'Rebase의 개념과 사용법, interactive rebase 실습',
      },
      {
        day: 10,
        title: 'Git Cherry-pick & Bisect',
        description: '특정 커밋을 선택적으로 적용하고, 오류 추적 방법 학습',
      },
      {
        day: 11,
        title: 'Git 서브모듈 및 대형 프로젝트 관리',
        description: 'Git 서브모듈 활용 및 대형 프로젝트에서의 Git 전략',
      },
      {
        day: 12,
        title: 'Git 태그와 배포 전략',
        description: 'Git 태그(tag)와 버전 관리 방식',
      },
      {
        day: 13,
        title: 'Git Hooks & 자동화',
        description: 'Git Hooks를 활용한 자동화 및 CI/CD 파이프라인 개념',
      },
      {
        day: 14,
        title: 'Git 문제 해결 및 복구',
        description: 'Git에서 실수한 커밋을 되돌리는 방법과 문제 해결 기법',
      },
      {
        day: 15,
        title: 'Git 활용 최적화',
        description: 'Git의 고급 사용법 및 CLI 생산성 향상 기법',
      },
    ],
    skills: [
      'Git 기본 개념 및 CLI 사용 능력',
      '로컬 저장소 및 Git 히스토리 관리',
      '브랜치와 협업을 위한 Git 활용',
      '원격 저장소(GitHub) 연동 및 협업 능력',
      '고급 Git 기능 활용',
      'Git 실전 문제 해결 능력',
      'Git Hooks 및 자동화 경험',
    ],
    how_it_works: {
      environment: '웹 기반 PDF 학습 + xterm.js 터미널 실습 환경',
      usage_limit: '하루 최대 8시간 사용 가능, 데이터는 저장되지 않음',
      steps: [
        '각 일차별 PDF를 읽고 개념 학습',
        '쉘 스크립트(dayX.sh)를 실행하여 환경 설정',
        '터미널에서 Git 명령어 실습',
        '브랜치 관리 및 협업 실습 진행',
      ],
    },
  },
  // 비활성화된 과목 추가
  {
    id: 'terraform',
    name: 'Terraform',
    icon: 'terraform',
    description: '인프라를 코드로 관리하고 자동화하는 도구입니다.',
    duration: '15일',
    level: 'Intermediate',
    isDisabled: true,
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    icon: 'monitoring',
    description: '시스템과 애플리케이션 성능을 모니터링하는 도구입니다.',
    duration: '15일',
    level: 'Intermediate',
    isDisabled: true,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: 'mysql',
    description: '관계형 데이터베이스 관리 시스템(RDBMS)입니다.',
    duration: '15일',
    level: 'Beginner',
    isDisabled: true,
  },
];
