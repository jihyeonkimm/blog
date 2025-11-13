# Personal Blog

Next.js와 Notion API를 활용한 개인 블로그입니다.

## ✨ 주요 기능

- **Notion CMS 연동**: Notion 데이터베이스를 콘텐츠 관리 시스템으로 활용
- **카테고리 분류**: Dev, Life 카테고리별로 게시글 관리
- **태그 필터링**: 태그별로 게시글 필터링 및 카운트 표시
- **정렬 기능**: 최신순/오래된순 정렬 지원
- **무한 스크롤**: React Query와 Intersection Observer를 활용한 무한 스크롤 구현
- **MDX 지원**: Markdown 렌더링 및 코드 하이라이팅 (Shiki)
- **댓글 기능**: Giscus를 활용한 GitHub 기반 댓글 시스템
- **반응형 디자인**: 모바일/태블릿/데스크톱 환경 대응
- **로딩 상태**: Skeleton UI를 활용한 부드러운 로딩 경험

## 🛠 기술 스택

### Core

- **Next.js 15.2** - React 프레임워크 (App Router)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성

### Styling

- **Tailwind CSS 4** - 유틸리티 우선 CSS 프레임워크
- **@tailwindcss/typography** - 프로즈 스타일링
- **Radix UI** - 접근성 높은 UI 컴포넌트

### Data & State

- **Notion API** - 콘텐츠 관리
- **@tanstack/react-query** - 서버 상태 관리
- **notion-to-md** - Notion 블록을 Markdown으로 변환

### Content

- **MDX** - Markdown with JSX
- **rehype-pretty-code** - 코드 하이라이팅
- **Shiki** - 구문 강조 엔진
- **remark-gfm** - GitHub Flavored Markdown

### Other

- **Giscus** - 댓글 시스템
- **date-fns** - 날짜 포맷팅
- **react-intersection-observer** - 무한 스크롤

## 프로젝트 구조

```
blog/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   └── posts/           # 게시글 API
│   ├── blog/[slug]/         # 블로그 상세 페이지
│   ├── dev/                 # Dev 카테고리 페이지
│   ├── life/                # Life 카테고리 페이지
│   └── _components/         # 페이지 컴포넌트
├── components/              # 공통 컴포넌트
│   ├── features/           # 기능별 컴포넌트
│   │   └── blog/          # 블로그 관련 컴포넌트
│   ├── layouts/           # 레이아웃 컴포넌트
│   └── ui/                # UI 기본 컴포넌트
├── lib/                    # 유틸리티 함수
│   └── notion.ts          # Notion API 통신
└── types/                  # TypeScript 타입 정의
```

## 주요 기능 설명

### 카테고리 필터링

- `/dev`: Dev 카테고리 게시글만 표시
- `/life`: Life 카테고리 게시글만 표시
- `/`: 모든 게시글 표시

### 무한 스크롤

React Query의 `useInfiniteQuery`와 Intersection Observer를 활용하여 스크롤 시 자동으로 다음 페이지를 로드합니다.

### 로딩 상태

Skeleton UI를 활용하여 데이터 로딩 중에도 레이아웃 시프트 없이 부드러운 사용자 경험을 제공합니다.

## 라이선스

이 프로젝트는 개인 프로젝트입니다.

---

**Built with ❤️ by Jihyeon Kim**
