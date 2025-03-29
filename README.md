# 인프런 워밍업 클럽 3기 풀스택 4주차 과제 - MyOn

### 📌 프로젝트 개요

- 이 프로젝트는 **인프런 워밍업 클럽 3기 풀스택 4주차 과제**로 제출된 MyOn 앱입니다.

### ✨ 주요 기능

| 기능                         | 설명                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| ✅ 로그인 / 회원가입         | 이메일 + 비밀번호 또는 카카오 OAuth 로그인 / 회원가입 기능 구현            |
| ✅ 채팅방 생성               | 상대 유저 클릭 시 `roomId` 생성 및 DB에 저장 (중복 생성 방지)              |
| ✅ 메시지 전송               | 채팅방 내에서 텍스트 메시지 전송 가능                                      |
| ✅ 메시지 삭제               | 본인이 보낸 메시지에 한해 soft delete (삭제된 메시지로 UI 표시)            |
| ✅ 메시지 실시간 수신        | Supabase Realtime으로 실시간 메시지 수신 및 UI 갱신                        |
| ✅ 잘못된 접근 차단          | 존재하지 않는 방, 임의 URL 접근 시 리다이렉트 및 에러 토스트 처리          |
| ✅ 접근 권한 검증            | URL `roomId` 검증 로직 도입 → 인증된 사용자 + 올바른 상대 유저 조합만 허용 |
| ✅ 로그아웃 처리             | 로그아웃 시 상태 초기화 및 리다이렉트 처리                                 |
| ✅ 에러 핸들링 / 토스트 알림 | 주요 동작 실패 시 토스트 메시지로 피드백 제공                              |

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

![ERD 다이어그램](https://gxzwdcgjtorzehmxxqar.supabase.co/storage/v1/object/public/myon//myon_erd.png)

### 📂 폴더 구조

```
/src
 ├── app                # Next.js App Router 기반 페이지 & 레이아웃
 │   ├── api            # 서버 사이드 API Route 핸들러 (RESTful API)
 ├── assets             # 정적 자산 (이미지, 아이콘 등)
 ├── components         # UI 컴포넌트
 │   ├── auth           # 로그인, 회원가입 등 인증 관련 컴포넌트
 │   ├── common         # 공통 UI 컴포넌트
 │   ├── direct-message # 다이렉트 메시지 관련 UI 컴포넌트
 │   ├── layout         # 페이지 레이아웃 컴포넌트
 │   ├── transition     # 페이지 전환 애니메이션 관련 컴포넌트
 ├── constants          # 프로젝트 전역에서 사용하는 상수
 ├── hooks              # 재사용 가능한 커스텀 훅
 ├── providers          # Next.js 전역 프로바이더
 ├── schemas            # Zod 스키마
 ├── stores             # Zustand 전역 상태 관리 스토어
 ├── types              # TypeScript 타입 정의
 │   ├── dto            # API 요청/응답 데이터를 정의하는 타입 또는 인터페이스 모음
 ├── utils              # 유틸 함수
```

### 🛠 API 엔드포인트

- `PATCH /api/message/[messageId]` → 메시지 수정(Soft delete) 요청

- `GET /api/messages/[roomId]` → 메시지 조회

- `POST /api/messages` → 메시지 생성 요청

- `GET /api/rooms/[roomId]` → roomId가 유효한지 조회

- `GET /api/rooms` → 두 사용자 간의 기존 채팅방 존재 여부 조회
- `POST /api/rooms` → 채팅방 생성 요청

- `POST /api/user/email/register` → users 테이블 내 유저 생성 요청(email 가입 유저)
- `POST /api/user/oauth/register` → users 테이블 내 유저 생성 요청(oauth 가입 유저)
- `GET /api/user/me` → 로그인 상태 유저 정보 조회

- `GET /api/users` → 로그인한 유저 제외 모든 유저 조회

### 🎯 설계 패턴

- **Container-Presentational Component 패턴**을 고려했으나,
  채팅방 기능은 상태 흐름과 조건 분기가 복잡하여 본 MVP 단계에서는 적용하지 못함
- 추후 상태 관리와 로직 정리가 완료되면, 컨테이너 분리를 통해 관심사의 분리를 시도해볼 예정

### ⚡ 트러블 슈팅

| 이슈/버그                                                                   | 원인                                                                         | 해결 방법                                                                                             |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| ✅ 임의의 `roomId`로 접근 시 메시지 전송 가능                               | `targetUserId`가 zustand에 남아 있어서 유효하지 않은 접근도 통과됨           | `roomId` 검증 로직 추가 및 초기 진입 시 상태 초기화 훅 작성 (`useClearDirectMessageStore`)            |
| ✅ 존재하지 않는 `roomId` 접근 시 방 생성되지 않음                          | `GET /rooms/:roomId`에서 404 응답 발생 후 `catch` 블록에서 바로 리다이렉트됨 | 404 발생 시 유효한 유저인지 검증 후 `POST`로 방 생성 분기 추가                                        |
| ✅ 메시지 전송 시 무단 방 생성/등록 문제                                    | 메시지 테이블과 방 테이블 간 외래키 미설정                                   | `messages.room_id` → `rooms.id` 외래키 설정으로 유효하지 않은 방 ID 차단                              |
| ✅ 로그인 상태 변경 시 라우팅 반영 안됨                                     | 동적 라우트(`/direct-message/:roomId`)에 대한 `router.refresh()` 미동작      | `usePathname`으로 경로 패턴 체크하여 safe path 포함되도록 처리                                        |
| ✅ 직접 URL 접근 시 `searchParams` 누락으로 방 진입 허용됨                  | 클라이언트 `searchParams` 누락 시 서버에서 검증 불가                         | 서버에서 `currentUsername`, `targetUsername` 기반 `roomId` 검증 로직 추가                             |
| ✅ Supabase Realtime 메시지 구독이 임의 방에서도 작동                       | `useEffect`에서 roomId만 체크하고 유효성 검증 안함                           | `generateRoomId` 기반 비교하여 유효하지 않으면 구독 차단                                              |
| ✅ `/direct-message/:roomId` 접근 시 로그아웃 리다이렉트 미동작             | 미들웨어 `matcher` 설정 누락                                                 | `matcher: '/direct-message/:path*'`로 설정 수정                                                       |
| ✅ 배포 후 카카오 로그인 시 `http:localhost:3000/`으로 리다이렉트 되는 문제 | Supabase Redirect URLs에 배포 주소 누락                                      | `Supabase - Authentication - URL Configuration` 내 `Site URL` 변경 및 `Redirect URLs`에 배포 URL 추가 |

### 📌 Backlog

- [ ] API 응답 구조 통일
- [ ] Room 접근 검증 로직 개선
- [ ] 메시지 알림 로직 개선 (다른 방에 있을 때도 알림 활성화)
- [ ] Supabase RLS 정책 개선
