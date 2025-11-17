import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 기본 URL
  const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;

  // 정적 페이지 목록
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/dev`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/life`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ] as const;

  // 블로그 게시물 가져오기
  const { posts } = await getPublishedPosts({ pageSize: 100 });

  // 블로그 게시물 URL 생성 (카테고리별로 동적 경로 생성)
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/${post.category || 'blog'}/${post.slug}`,
    lastModified: post.modifiedDate ? new Date(post.modifiedDate) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 정적 페이지와 블로그 게시물 결합
  return [...staticPages, ...blogPosts];
}
