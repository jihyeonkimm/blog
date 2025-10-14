import { PostCard } from '@/components/features/blog/PostCard';
import TagSection from '@/app/_components/TagSection';
import Link from 'next/link';
import { getPublishedPosts, getTags } from '@/lib/notion';
import SortSelect from './_components/form/SortSelect';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';
  const posts = await getPublishedPosts(selectedTag, selectedSort);
  const tags = await getTags();

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside>
          <TagSection tags={tags} selectedTag={selectedTag} />
        </aside>
        <div className="space-y-8">
          {/* 섹션 제목 */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              {selectedTag ? selectedTag : '전체'}
            </h2>
            <SortSelect />
          </div>

          {/* 블로그 카드 그리드 */}
          <div className="grid gap-4">
            {posts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <PostCard post={post} isFirst={index === 0} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
