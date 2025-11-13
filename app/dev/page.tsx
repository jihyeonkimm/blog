import PostList from '@/components/features/blog/PostList';
import SortSelect from '../_components/form/SortSelect';
import { getPublishedPosts } from '@/lib/notion';

interface DevPostPageProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function DevPostPage({ searchParams }: DevPostPageProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';
  const postsPromise = getPublishedPosts({
    tag: selectedTag,
    sort: selectedSort,
    category: 'dev',
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dev</h2>
          <SortSelect />
        </div>
      </div>
      <PostList postsPromise={postsPromise} category="dev" />
    </div>
  );
}
