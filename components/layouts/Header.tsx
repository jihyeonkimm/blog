import Image from 'next/image';
import Link from 'next/link';
import SearchInput from '@/components/features/SearchInput';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-14 justify-between items-center px-4 gap-4">
        <Link href="/" className="text-xl font-semibold flex-shrink-0">
          <Image src="/assets/images/logo.png" alt="logo" width="30" height="30" />
        </Link>
        <SearchInput />
      </div>
    </header>
  );
}
