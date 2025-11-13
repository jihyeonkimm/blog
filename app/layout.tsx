import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'jhkim blog',
  description: 'jhkim blog',
  openGraph: {
    title: 'jhkim blog',
    description: 'jhkim blog',
    url: 'https://jhkim-work.com',
    siteName: 'jhkim blog',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blog preview image',
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
      </head>
      <body className="font-pretendard antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />

            {/* Main 영역 */}
            <main className="flex-1">{children}</main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
