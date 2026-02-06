'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 min-h-auto flex-col ">
      <div className="flex flex-1 flex-col justify-center items-center my-auto">
        <Image src="/assets/images/error.png" alt="not found icon" width="100" height="100" />
        <h1 className="text-2xl font-bold text-center mt-8">오류가 발생했습니다</h1>
        <Button className="font-bold mt-6 cursor-pointer" size="lg" onClick={() => reset()}>
          다시 시도
        </Button>
      </div>
    </div>
  );
}
