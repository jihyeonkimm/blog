import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-1 min-h-auto flex-col ">
      <div className="flex flex-1 flex-col justify-center items-center my-auto">
        <Image src="/assets/images/not-found.png" alt="not found icon" width="100" height="100" />
        <h1 className="text-2xl font-bold text-center mt-8">포스트를 찾을 수 없습니다</h1>
        <Link href="/">
          <Button className="font-bold mt-6 cursor-pointer" size="lg">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
