import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="text-xl font-semibold">
          <span className="font-bold">jhkim-blog</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {/* <Link href="#" className="hover:text-primary font-medium">
            홈
          </Link> */}
          <Link href="/dev" className="hover:text-primary font-medium">
            dev
          </Link>
          <Link href="/life" className="hover:text-primary font-medium">
            life
          </Link>
        </nav>
      </div>
    </header>
  );
}
