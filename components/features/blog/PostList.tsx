'use client';

import Link from 'next/link';
import { PostCard } from './PostCard';
import { getPublishedPostResponse } from '@/lib/notion';
import { use, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

interface PostListProps {
  postsPromise: Promise<getPublishedPostResponse>;
  category?: string;
}

export default function PostList({ postsPromise, category }: PostListProps) {
  const initialData = use(postsPromise);
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort');

  // 포스트 데이터 가져오기
  // pageParam은 리액트 쿼리가 자동으로 전달하는 매개변수 이름. queryFn으로 전달되는 함수는 객체를 받는데, 그 객체의 pageParam 속성에 현재 페이지 파라미터가 들어옴
  const fetchPosts = async ({ pageParam }: { pageParam: string | undefined }) => {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (sort) params.set('sort', sort);
    if (category) params.set('category', category);
    if (pageParam) params.set('startCursor', pageParam);

    const response = await fetch(`/api/posts?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts', tag, sort, category], // 쿼리를 고유하게 식별하는 키. tag, sort, category가 변경되면 새로운 쿼리로 인식하여 데이터를 다시 fetch
    queryFn: fetchPosts, // 실제 데이터를 가져오는 함수
    initialPageParam: undefined, // 첫 페이지를 fetch할 때 사용할 pageParam. undefined면 첫 페이지부터 시작
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: {
      pages: [initialData],
      pageParams: [undefined],
    },
  });

  // const handleLoadMore = () => {
  //   if (hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // };

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {allPosts.length > 0 ? (
          allPosts.map((post, index) => (
            <Link href={`/${post.category || 'blog'}/${post.slug}`} key={post.id}>
              <PostCard post={post} isFirst={index === 0} />
            </Link>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center my-30">
            <p className="text-lg tracking-tight">아직 등록된 글이 없어요 😇</p>
          </div>
        )}
      </div>
      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-4" />}
      {isFetchingNextPage && (
        <div className="flex justify-center">
          <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
        </div>
      )}
      {/* {hasNextPage && (
        <div>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? '로딩중' : '더보기'}
          </button>
        </div>
      )} */}
    </div>
  );
}
