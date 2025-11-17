import TagSection from '@/app/_components/TagSection';
import { getPublishedPosts, getTags } from '@/lib/notion';
import SortSelect from './_components/form/SortSelect';
import PostList from '@/components/features/blog/PostList';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';
  const postsPromise = getPublishedPosts({ tag: selectedTag, sort: selectedSort });
  const tags = await getTags();

  return (
    <div className="container lg:px-4 px-0! lg:py-8 py-4">
      <div className="relative grid lg:grid-cols-[220px_1fr_0px] gap-6">
        {/* 좌측 사이드바 */}
        <aside className="lg:static sticky lg:top-auto top-14.25 order-1 max-w-full overflow-x-hidden overflow-y-visible z-1">
          <TagSection tags={tags} selectedTag={selectedTag} />
        </aside>
        <div className="order-2 space-y-8 lg:px-0 px-4">
          {/* 섹션 제목 */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="lg:text-3xl text-2xl font-bold tracking-tight">
              {selectedTag ? selectedTag : '전체'}
            </h2>
            <SortSelect />
          </div>

          {/* 블로그 카드 그리드 */}
          <PostList postsPromise={postsPromise} />
        </div>
      </div>
    </div>
  );
}
