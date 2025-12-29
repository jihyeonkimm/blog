import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Providers from './providers';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    template: '%s | Jihyeon Kim Blog',
    default: 'Jihyeon Kim Blog',
  },
  description:
    '프론트엔드 개발자의 기술 블로그입니다. 웹 개발, 자바스크립트, 리액트, Next.js 등에 관한 다양한 주제를 다룹니다.',
  keywords: [
    '프론트엔드',
    '웹개발',
    '개발블로그',
    '리액트',
    'React',
    'Next.js',
    'JavaScript',
    'React Native',
    'TypeScript',
  ],
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Jihyeon Kim Blog',
    description: 'Jihyeon Kim Blog',
    url: 'https://jhkim-work.com',
    siteName: 'Jihyeon Kim Blog',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blog OpenGraph Image',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <meta
          name="google-site-verification"
          content="do9CEedZghuSy8YKHX_YRJeC35sEnmCsKKcZe2-fYL0"
        />
      </head>
      <body className="font-pretendard antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />

            {/* Main 영역 */}
            <main className="flex flex-1">{children}</main>

            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
