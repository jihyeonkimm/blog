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
    <div className="container py-8">
      <div className="grid lg:grid-cols-[200px_1fr_0px] gap-6">
        {/* 좌측 사이드바 */}
        <aside className="lg:order-1 order-2">
          <TagSection tags={tags} selectedTag={selectedTag} />
        </aside>
        <div className="lg:order-2 order-1 space-y-8">
          {/* 섹션 제목 */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
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
