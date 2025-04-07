 # 🚂 DevRail: GCP 기반 DevOps 실습 플랫폼

> 브라우저에서 배우는 실전 DevOps, **DevRail**

![badge](https://img.shields.io/badge/Platform-GCP-blue)
![badge](https://img.shields.io/badge/Infra-Kubernetes-%23326CE5)
![badge](https://img.shields.io/badge/Frontend-React-%2361DAFB)
![badge](https://img.shields.io/badge/Backend-Node.js-green)
![badge](https://img.shields.io/badge/CI/CD-ArgoCD-blueviolet)

---

## 🧾 프로젝트 개요

- **이름**: DevRail - GCP 기반 온라인 개발 학습 플랫폼  
- **기간**: 2025.01 ~ 2025.02  
- **팀원**: 5명  
- **기술스택**: React, Node.js, Docker, Kubernetes, Jenkins, ArgoCD, GCP Monitoring, GCE  

---

## 🧩 프로젝트 소개

> **Katacoda에서 영감을 받아 개발한, GCP 기반 DevOps 실습 플랫폼입니다.**

DevRail은 개발자가 **웹 브라우저만으로 DevOps 도구(Docker, Kubernetes, Git 등)를 실습할 수 있도록 설계된 온라인 학습 환경**입니다.  
단순 UI를 넘어서, 실습 흐름 설계 → 콘텐츠 구성 → GCP 인프라 연동까지 **전체 시스템 아키텍처를 직접 기획하고 구현**한 프로젝트입니다.

---

## 📊 사용자 플로우 차트

> 사용자의 전체 이용 흐름을 직접 설계한 플로우차트입니다:

![DevRail 플로우차트](https://i.ibb.co/PzFWVss4/Dev-Rail-Flowchart-drawio-2.png)

### 🧭 주요 플로우

1. 🎫 **탑승권 구매** (무료/유료 플랜 선택)
2. 🛤️ **기술 선택** (Docker, Kubernetes, Git 등)
3. 📚 **학습 콘텐츠 열람 및 개념 학습**
4. 🖥️ **실습 환경 생성 → GCE 인스턴스 연동**
5. 💻 **Shell 기반 실습 환경 접속**
6. 🧑‍🏫 **관리자 페이지(기관실)에서 실습 내역 확인/종료**

---

## 🧰 주요 기여 및 역할

### 🎨 UI/UX (React)
- 전체 사용자 흐름 기획 및 페이지 구현 (홈, 노선도, 콘텐츠, 실습 공간 등)
- 단순 뷰 렌더링이 아닌, **실습 흐름과 상태 중심의 기능 구조 설계**

### 🔌 백엔드 연동 (Node.js)
- 실습 요청 API 흐름 설계 및 비동기 응답 처리
- `CORS` 이슈 해결 및 사용자 요청 흐름 최적화

### 📘 Git 콘텐츠 설계
- `init → commit → branch → merge` 흐름을 실습 가능한 형태로 재구성
- 코드 입력 기반의 **인터랙티브 학습 콘텐츠** 직접 작성

### ☁️ 인프라/모니터링
- GCE 인스턴스 생성 후, **GCP Monitoring 연동**
- 실습 중 리소스 상태 조회/확인 기능 설계 참여

### 📚 팀워크 & 문서화
- 기획 구조 문서화, 흐름도 설계, 회의 기록 총괄

---

## 🚧 기술적 이슈와 해결

| 문제 | 해결 방법 |
|------|------------|
| React로 실습 흐름 구조 잡는 데 어려움 | 사용자 플로우를 플로우차트로 설계 → 상태 설계에 반영 |
| CORS 에러 및 비동기 처리 문제 | `proxy 설정`, `응답 코드 기반 처리`, `async/await` 적용 |
| Git 개념 전달 방식 고민 | 실습 → 피드백 → 다음 단계 흐름으로 콘텐츠 UX 개선 |

---

## 🌱 회고 및 성장

이번 프로젝트는 단순한 웹 제작이 아닌, **실제 사용자가 기술을 체득할 수 있는 시스템 설계의 경험**이었습니다.

> 단순한 UI가 아닌  
> **클라우드 인프라 + 실습 흐름 + 사용자 학습 구조**까지 직접 설계하고 연결한 프로젝트

Katacoda와 같은 실습 플랫폼을 참고하여,  
**브라우저 안에서 실습이 가능한 DevOps 환경을 클라우드 위에 구성한 경험**은  
DevOps와 시스템 아키텍처에 대한 시야를 넓힐 수 있는 중요한 계기가 되었습니다.

---

## 📸 스크린샷

> 아래는 DevRail 플랫폼의 주요 UI입니다.

- 🏠 홈 화면  
- 🗺️ 기술 노선도  
- 📘 실습 콘텐츠  
- 💻 Shell 실습 환경

### ▶️ 홈 화면 미리보기

![DevRail 홈화면](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmYxZzgyMGxhcGhvOWNpMHcwNGt0ZXc0ZGF2MmtocGdlNGZ1dGF6MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KmNC3wlkhAEBpzLL8a/giphy.gif)
