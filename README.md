# 🚂 DevRail: GCP 기반 DevOps 실습 플랫폼

> 브라우저에서 배우는 실전 DevOps, **DevRail**

![badge](https://img.shields.io/badge/Platform-GCP-blue) ![badge](https://img.shields.io/badge/Frontend-React-%2361DAFB) ![badge](https://img.shields.io/badge/Backend-Node.js-green) ![badge](https://img.shields.io/badge/CI/CD-ArgoCD-blueviolet) ![badge](https://img.shields.io/badge/Infra-Kubernetes-%23326CE5)

---

## 🧾 프로젝트 개요

- **프로젝트명**: DevRail - GCP 기반 온라인 개발 학습 플랫폼  
- **진행 기간**: 2025.01 ~ 2025.02  
- **팀 구성**: 5인  
- **주요 기술스택**: React, Node.js, Docker, Kubernetes, Jenkins, ArgoCD, GCP Monitoring, GCE  

---

## 🧩 프로젝트 소개

> **Katacoda**에서 영감을 받아 개발한 브라우저 기반 DevOps 실습 플랫폼입니다.

DevRail은 **개발자들이 실제 커맨드를 실행하면서 Docker, Kubernetes, Git 등의 도구를 체험할 수 있도록 구성된 온라인 학습 플랫폼**입니다. 단순한 프론트 UI 구현을 넘어, 실습 흐름부터 GCP 리소스까지 전체 아키텍처를 설계하고 구현했습니다.

---

## 📊 사용자 플로우 차트

> 사용자의 전체 이용 흐름을 직접 설계한 와이어프레임 및 흐름도입니다.

![flowchart](./images/devrail-flowchart.png)

### 주요 플로우

1. **탑승권 구매** (무료/유료 플랜 선택)
2. **기술 선택** (Docker, Kubernetes, Git 등)
3. **학습 콘텐츠 열람 및 개념 학습**
4. **실습 환경 생성 → GCE 인스턴스 연동**
5. **Shell 기반 실습 환경 접속**
6. **관리자 페이지(기관실)에서 실습 내역 확인/종료**

---

## 🧰 담당 역할 및 기여

### 🎨 Frontend (React)
- 전체 UI/UX 흐름 설계 및 구현 (홈, 실습 콘텐츠, 노선도, 워크스페이스 등)
- 페이지 구성뿐 아니라, 실습 흐름을 고려한 사용자 중심 구조 설계

### 🔌 Backend (Node.js)
- 실습 요청 흐름 설계 및 API 연동
- CORS 이슈 해결 및 비동기 처리 로직 구현

### 🧠 콘텐츠 설계
- Git 실습 콘텐츠 직접 설계 (`init → commit → branch → merge`)
- 개념 전달에 초점을 맞춘 **인터랙티브 학습 콘텐츠** 제작

### ☁️ GCP Monitoring
- GCE 인스턴스 모니터링 설정 (리소스 상태 조회 등)

### 📚 협업 및 문서화
- 전체 흐름 정리 및 플로우차트 설계
- 기술 문서화 및 회의 정리 담당

---

## 🚧 기술적 문제와 해결

| 문제 | 해결 방법 |
|------|------------|
| React 기반 실습 환경 흐름 구성 어려움 | 사용자 흐름을 플로우 차트로 시각화하여 구조 설계 |
| API 연동 중 CORS 오류 발생 | `proxy 설정`과 `status 기반 응답 처리`로 해결 |
| Git 실습 콘텐츠 흐름 구성 고민 | 실습 단계를 분해하여 개념별 학습 흐름 설계 |

---

## 🌱 회고 및 배운 점

단순한 웹 구현을 넘어서, **시스템 전체를 설계하는 관점**을 경험할 수 있었던 프로젝트였습니다.

Katacoda와 같은 브라우저 기반 실습 환경을 참고하여, 실제 GCP 리소스를 연동하는 구조를 설계하며 **클라우드 환경과 DevOps 흐름에 대한 이해도를 높일 수 있었습니다**.

---

## 📸 스크린샷

> - 홈 화면
> - 기술 노선도
> - 실습 콘텐츠 화면
> - Shell 실습 환경 접속

---

