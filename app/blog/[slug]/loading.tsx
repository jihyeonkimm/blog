import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-12">
      <div className="max-w-[820px] mx-auto px-0 md:px-4">
        <section>
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex mb-4">
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-10 w-3/4" />
            </div>

            <div className="flex justify-center gap-2 mb-14">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="prose prose-sm prose-stone w-full max-w-full space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />

              <div className="my-6">
                <Skeleton className="h-64 w-full" />
              </div>

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
