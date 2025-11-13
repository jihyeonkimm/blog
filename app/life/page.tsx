import PostList from '@/components/features/blog/PostList';
import SortSelect from '../_components/form/SortSelect';
import { getPublishedPosts } from '@/lib/notion';

interface LifePostPageProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function LifePostPage({ searchParams }: LifePostPageProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';
  const postsData = await getPublishedPosts({
    tag: selectedTag,
    sort: selectedSort,
    category: 'life',
  });

  const postsPromise = Promise.resolve(postsData);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Life</h2>
          {postsData.posts.length > 0 && <SortSelect />}
        </div>
      </div>
      <PostList postsPromise={postsPromise} category="life" />
    </div>
  );
}
