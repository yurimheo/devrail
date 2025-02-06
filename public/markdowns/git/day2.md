# Day 2: GitHub 소개 및 원격 저장소 🚀

Git을 사용하면 **로컬에서 코드 변경 이력을 관리**할 수 있습니다.  
하지만, 다른 개발자들과 협업하려면 **GitHub 같은 원격 저장소**가 필요합니다.

> 💡 **GitHub는 어떤 역할을 할까요?**
>
> - **백업 및 공유**: 로컬 저장소를 원격에 올려 언제든 접근 가능.
> - **협업 지원**: 여러 개발자가 같은 프로젝트를 관리할 수 있음.
> - **버전 관리**: 변경 이력을 추적하고, 과거 버전으로 되돌릴 수 있음.

## 🛠️ 오늘 학습 목표

1. **GitHub 계정을 생성하고 SSH 키를 설정할 수 있다.**
2. **원격 저장소를 로컬 저장소와 연결할 수 있다.**
3. **GitHub에 코드를 업로드하고, 최신 변경 사항을 가져올 수 있다.**

---

## 🔹 1. GitHub 계정 생성하기 🌍

GitHub를 사용하려면 먼저 계정을 만들어야 합니다.

### 📌 GitHub 계정 생성 방법

1. [GitHub](https://github.com)에 접속하고 **Sign Up** 버튼을 클릭합니다.
2. 사용자명, 이메일 주소, 비밀번호를 입력한 후 계정을 생성합니다.
3. 이메일 인증을 완료하면 GitHub 계정을 사용할 수 있습니다.

---

## 🔹 2. SSH 키 설정하기 🔑

GitHub에서 코드를 업로드할 때 **HTTPS 방식**과 **SSH 방식**이 있습니다.  
SSH 방식을 사용하면 **매번 로그인하지 않아도 되어** 더 편리합니다.

### **📌 SSH 키 생성**

1. 로컬 컴퓨터에서 SSH 키를 생성하려면 다음 명령어를 실행합니다.

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

2. 키를 저장할 경로를 물어보면 기본값(Enter 키)을 입력합니다.
3. 생성된 키는 `~/.ssh/id_rsa.pub` 파일에 저장됩니다.

### **📌 SSH 키를 GitHub에 등록**

1. **공개 키를 확인하고 복사합니다.**

   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

2. GitHub에 로그인하고, **Settings → SSH and GPG keys**로 이동합니다.
3. **"New SSH Key"** 버튼을 클릭하고, 복사한 키를 붙여넣습니다.
4. **"Add SSH Key"** 버튼을 클릭하여 등록을 완료합니다.

> 💡 **SSH 키가 정상적으로 작동하는지 확인**
>
> ```bash
> ssh -T git@github.com
> ```
>
> 위 명령어를 실행했을 때 `"Hi [username]! You've successfully authenticated"` 메시지가 나오면 성공입니다.

---

## 🔹 3. GitHub 원격 저장소 생성 및 연결하기 🌍

로컬 Git 저장소를 GitHub 원격 저장소와 연결하려면, 먼저 **GitHub에서 새로운 저장소**를 만들어야 합니다.

### **📌 GitHub 저장소 생성**

1. GitHub에 로그인하고, 우측 상단의 **+ 버튼 → New repository**를 클릭합니다.
2. 저장소 이름을 입력하고 **"Create repository"** 버튼을 클릭합니다.
3. 원격 저장소 주소(HTTPS 또는 SSH)를 확인합니다.

---

## 🔹 4. 로컬 저장소와 원격 저장소 연결하기 🔗

GitHub에서 만든 원격 저장소를 로컬 저장소와 연결하려면 다음 명령어를 실행합니다.

### **📌 원격 저장소 연결**

```bash
git remote add origin git@github.com:your-username/your-repository.git
```

> **🔹 `origin`이란?**
>
> - `origin`은 **원격 저장소의 기본 이름**입니다.
> - `git remote -v` 명령어를 실행하면 연결된 원격 저장소를 확인할 수 있습니다.

### **📌 연결 확인**

```bash
git remote -v
```

위 명령어를 실행하면 **origin**이 올바르게 설정되었는지 확인할 수 있습니다.

---

## 🔹 5. GitHub에 코드 업로드하기 🚀

로컬 Git 저장소에서 작업한 내용을 GitHub 원격 저장소에 업로드하려면 `git push` 명령어를 사용합니다.

### **📌 원격 저장소에 코드 올리기**

1. **파일을 Git에 추가하고 커밋합니다.**

   ```bash
   git add .
   ```

   ```bash
   git commit -m "첫 번째 커밋"
   ```

2. **GitHub로 푸시 (업로드)**

   ```bash
   git push -u origin main
   ```

> 💡 **주의! `main` 브랜치가 없을 수도 있습니다.**
>
> - `main` 브랜치가 없는 경우 먼저 생성해야 합니다.
>
>   ```bash
>   git branch -M main
>   ```

---

## 🔹 6. 원격 저장소에서 변경 사항 가져오기 🔄

다른 개발자가 작업한 최신 코드를 가져오려면 **`git pull`** 명령어를 사용합니다.

### **📌 원격 저장소에서 최신 코드 가져오기**

```bash
git pull origin main
```

> **📌 `git pull` vs `git fetch`**
>
> - `git pull`: 원격 저장소에서 변경 사항을 가져오고 **자동으로 병합**합니다.
> - `git fetch`: 원격 저장소에서 변경 사항을 가져오지만 **자동 병합은 하지 않음**.

---

## 🎯 실습 목표: Day 2 학습 목표 달성하기

- GitHub 계정을 생성합니다.
- SSH 키를 생성하고 GitHub에 등록합니다.
- GitHub에서 원격 저장소를 만듭니다.
- 로컬 저장소와 원격 저장소를 연결합니다.
- `git push`를 사용하여 원격 저장소에 코드를 업로드합니다.
- `git pull`을 사용하여 원격 변경 사항을 가져옵니다.

---

## 🛠️ **오류 해결법**

### ❌ **GitHub에서 "Permission denied (publickey)" 오류 발생**

**해결:** SSH 키가 제대로 등록되지 않았을 가능성이 있습니다.

1. SSH 키를 다시 생성하고 등록합니다.
2. SSH 키가 올바르게 추가되었는지 확인합니다.

```bash
   ssh -T git@github.com
```

3. `~/.ssh/config` 파일을 열어 다음과 같이 설정합니다.

Host github.com User git IdentityFile ~/.ssh/id_rsa

---

## 🎉 축하합니다!

Day 2 학습이 완료되었습니다!
이제 **GitHub 원격 저장소를 생성하고, SSH 키를 설정하고, 로컬 저장소와 연결하는 방법을 익혔습니다.** 🎯

> 🚀 **다음 단계:** > **브랜치 관리 및 협업을 위한 Git 명령어**를 학습해 보세요!
