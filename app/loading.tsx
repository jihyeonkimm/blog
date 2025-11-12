import { Skeleton } from '../components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="grid lg:grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside className="lg:order-1 order-2">
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </aside>

        <div className="lg:order-2 order-1 space-y-8">
          {/* 섹션 제목 */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-32" />
          </div>

          {/* 블로그 카드 그리드 */}
          <div className="grid gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-row justify-between items-center">
                <div className="py-3 grow">
                  <div className="mb-2 md:mb-4">
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-4 md:h-6 w-full mb-2" />
                  <Skeleton className="h-3 md:h-4 w-full mb-2" />
                  <Skeleton className="h-3 md:h-4 w-16 mt-3 md:mt-6" />
                </div>
                <Skeleton className="shrink-0 w-30 md:w-40 h-20 md:h-24 rounded-md ml-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
