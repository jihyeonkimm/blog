# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 명령어

```bash
npm run dev          # 개발 서버 실행 (Turbopack)
npm run dev:webpack  # 개발 서버 실행 (Webpack 폴백)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 실행
npm run lint:fix     # lint 오류 자동 수정
npm run format       # Prettier로 코드 포맷
```

## 아키텍처

**Next.js 15 App Router** 기반 블로그로, **Notion을 CMS**로 사용합니다. 로컬 콘텐츠 파일은 없으며, 모든 포스트는 Notion 데이터베이스에서 가져옵니다.

### 콘텐츠 파이프라인

Notion 데이터베이스 → `lib/notion.ts` → Markdown (`notion-to-md` 사용) → MDX HTML (`next-mdx-remote` 사용) → 커스텀 컴포넌트로 렌더링

- `Status = "Published"` 인 포스트만 노출됨
- 포스트 슬러그는 Notion의 `Slug` 리치 텍스트 필드에서 가져옴
- 필수 환경 변수: `NOTION_TOKEN`, `NOTION_DATASOURCE_ID`, `NEXT_PUBLIC_SITE_URL`

### 주요 디렉토리

- `app/` — 페이지 및 서버 컴포넌트; `app/_components/`는 페이지 단위 기능 컴포넌트
- `app/api/posts`, `app/api/search` — 무한 스크롤 및 검색용 API 라우트
- `app/posts/[slug]/` — 동적 포스트 상세 페이지 (SSR)
- `components/features/blog/` — `PostCard`, `PostList` (무한 스크롤)
- `components/ui/` — shadcn/ui 기본 컴포넌트
- `lib/notion.ts` — Notion API 호출 및 데이터 변환 로직
- `types/blog.ts` — `Post` 타입 정의

### 렌더링 패턴

- **서버 컴포넌트**가 초기 데이터를 페칭하고, `PostList`는 서버에서 전달받은 Promise를 `use()`로 unwrap하는 클라이언트 컴포넌트
- **무한 스크롤**: React Query `useInfiniteQuery` + `react-intersection-observer` 뷰포트 센티널 조합
- **MDX 컴포넌트**: 이미지(Next.js `<Image>`), 링크(외부 링크 → 새 탭), 코드 블록(`rehype-pretty-code` + Shiki 구문 강조) 커스텀 오버라이드

### 스타일링

Tailwind CSS 4 + shadcn/ui (New York 스타일, neutral 기본 색상). 블로그 본문은 `@tailwindcss/typography` prose 클래스를 사용합니다.
