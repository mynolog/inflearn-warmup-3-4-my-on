# 인프런 워밍업 클럽 3기 풀스택 4주차 과제 - MyOn

### 📌 프로젝트 개요

- 이 프로젝트는 **인프런 워밍업 클럽 3기 풀스택 4주차 과제**로 제출된 MyOn 앱입니다.

### ✨ 주요 기능

### 🛠️ 설치 방법

```bash
git clone https://github.com/mynolog/inflearn-warmup-3-4-my-on.git
cd ./inflearn-warmup-3-4-my-on
pnpm install
# .env.sample 참고하여 프로젝트 루트에 .env 생성
```

### ▶️ 실행 방법

```bash
pnpm run dev
```

### 🎥 데모 영상

<!-- #### 👉 [유튜브 링크](https://www.youtube.com/watch?v=o5BwgEixAbE)

[![유튜브 썸네일](https://img.youtube.com/vi/o5BwgEixAbE/0.jpg)](https://www.youtube.com/watch?v=o5BwgEixAbE) -->

### 🚀 배포 링크

### 🧳 기술 스택

<p style="display: flex; gap: 10px;">
  <a href="https://nextjs.org/">
    <img src="https://skillicons.dev/icons?i=nextjs" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" />
  </a>
  <a href="https://tanstack.com/query/v5/docs/framework/react/overview">
  <img
      src="https://go-skill-icons.vercel.app/api/icons?i=reactquery"
    />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://skillicons.dev/icons?i=tailwind" alt="TailwindCSS" />
  </a>
  <a href="https://supabase.com/">
    <img src="https://skillicons.dev/icons?i=supabase" alt="Supabase" />
  </a>
</p>

### 📊 ERD 다이어그램

<!-- ![ERD 다이어그램](https://gxzwdcgjtorzehmxxqar.supabase.co/storage/v1/object/public/inflearn//myreel_erd.png) -->

<!-- - 테이블
  | **컬럼명** | **설명**
  |-----------------|-----------------------------|
  | | | -->

### 📂 폴더 구조

```
/src
 ├── app               # Next.js App Router 기반 페이지 & 레이아웃
 ├── components        # UI 컴포넌트
 │   ├── layout        # 페이지 레이아웃 컴포넌트 (page.tsx에서 사용)
 │   ├── common        # 공통 UI 컴포넌트
 ├── constants         # 프로젝트 상수
 ├── dto               # API 요청/응답 데이터를 정의하는 타입 또는 인터페이스 모음
 ├── hooks             # 커스텀 훅
 ├── providers         # Next.js 전역 프로바이더
 ├── stores            # 전역 상태 관리 스토어
 ├── types             # TypeScript 타입 정의
 ├── utils             # 유틸 함수 (파일명 변환, 시간 포맷 등)
```

### 🛠 API 엔드포인트

<!-- - `GET /api/movies` → 전체 영화 목록 조회 -->

### 🎯 적용한 패턴

- `Container-Presentational Component 패턴`
  - Container Component
    - 상태 관리와 비즈니스 로직을 담당, 커스텀 훅으로 데이터 처리 담당
    - 예시) `MovieDetailContainer.tsx`, `MovieCardListContainer.tsx`
  - Presentational Component
    - UI를 렌더링하는 역할만 담당하며, 상태나 로직을 직접 처리하지 않고 props로 받아서 UI만 표시
    - 예시) `MovieDetail.tsx`, `MovieCardList.tsx`
  - 사용 이유
    - UI와 로직을 분리하여 컴포넌트 간 **재사용성**을 높이고, **유지보수**가 용이한 구조
    - 각 컴포넌트의 **책임**을 명확히 구분하여 **가독성** 향상

### ⚡ 트러블 슈팅

<!-- - [x]

| 항목          | 내용                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **문제 상황** |                   |
| **원인**      |                   |
| **해결 방향** |  |
 -->
