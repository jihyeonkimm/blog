import { Client } from '@notionhq/client';
import { Post, TagFilterItem } from '@/types/blog';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import { notFound } from 'next/navigation';

interface getPublishedPostParams {
  tag?: string;
  sort?: string;
  pageSize?: number;
  startCursor?: string;
  category?: string;
}

export interface getPublishedPostResponse {
  posts: Post[];
  hasMore: boolean;
  nextCursor: string | null;
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: {
    parseChildPages: false,
    convertImagesToBase64: false,
  },
});

export const getPostMetadata = (page: PageObjectResponse): Post => {
  const { properties } = page;

  const getCoverImage = (cover: PageObjectResponse['cover']) => {
    if (!cover) return '';

    switch (cover.type) {
      case 'external':
        return cover.external.url;
      case 'file':
        return cover.file.url;
      default:
        return '';
    }
  };

  return {
    id: page.id,
    title: properties.Title.type === 'title' ? properties.Title.title[0].plain_text : '',
    description:
      properties.Description.type === 'rich_text'
        ? properties.Description.rich_text[0]?.plain_text
        : '',
    coverImage: getCoverImage(page.cover),
    tags:
      properties.Tags.type === 'multi_select'
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    author:
      properties.Author.type === 'people' && properties.Author.people.length > 0
        ? ((
            properties.Author.people[0] as {
              name?: string;
            }
          )?.name ?? '')
        : '',
    date: properties.Date.type === 'date' ? properties.Date.date?.start : '',
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug.type === 'rich_text'
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
    category:
      properties.Category?.type === 'select' && properties.Category.select
        ? properties.Category.select.name
        : '',
  };
};

export const getPostBySlug = async (slug: string): Promise<{ markdown: string; post: Post }> => {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATASOURCE_ID!,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
  });

  if (!response.results[0]) {
    notFound();
  }

  const mdBlocks = await n2m.pageToMarkdown(response.results[0].id);
  const { parent } = n2m.toMarkdownString(mdBlocks);

  // 코드 블록 외부의 중괄호만 이스케이프 처리
  const escapedMarkdown = parent
    .split(/(```[\s\S]*?```|`[^`]+`)/g) // 코드 블록과 인라인 코드를 분리
    .map((part, index) => {
      // 홀수 인덱스는 코드 블록/인라인 코드이므로 이스케이프하지 않음
      if (index % 2 === 1) return part;
      // 짝수 인덱스는 일반 텍스트이므로 중괄호 이스케이프
      return part.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
    })
    .join('');

  return {
    markdown: escapedMarkdown,
    post: getPostMetadata(response.results[0] as PageObjectResponse),
  };
};

export const getPublishedPosts = async ({
  tag = '전체',
  sort = 'latest',
  pageSize = 8,
  startCursor,
  category,
}: getPublishedPostParams = {}): Promise<getPublishedPostResponse> => {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATASOURCE_ID!,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
      and: [
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
        ...(tag && tag !== '전체'
          ? [
              {
                property: 'Tags',
                multi_select: {
                  contains: tag,
                },
              },
            ]
          : []),
        ...(category
          ? [
              {
                property: 'Category',
                select: {
                  equals: category,
                },
              },
            ]
          : []),
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: sort === 'latest' ? 'descending' : 'ascending',
      },
    ],
    page_size: pageSize,
    start_cursor: startCursor,
  });

  const posts = response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getPostMetadata);

  return {
    posts,
    hasMore: response.has_more,
    nextCursor: response.next_cursor,
  };
};

export const getTags = async (): Promise<TagFilterItem[]> => {
  const { posts } = await getPublishedPosts({ pageSize: 100 });

  const tagCounts = posts.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => (acc[tag] = (acc[tag] || 0) + 1));
      return acc;
    },
    {} as Record<string, number>
  );

  const tags: TagFilterItem[] = Object.entries(tagCounts).map(([name, count]) => ({
    id: name,
    name,
    count,
  }));

  return [{ id: 'all', name: '전체', count: posts.length }, ...tags];
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  const response = await notion.search({
    query: query,
    filter: {
      property: 'object',
      value: 'page',
    },
    sort: {
      direction: 'descending',
      timestamp: 'last_edited_time',
    },
  });

  const posts = response.results
    .filter((page): page is PageObjectResponse => {
      if (page.object !== 'page' || !('properties' in page)) return false;

      const properties = page.properties;

      if (properties.Status?.type === 'select' && properties.Status.select?.name === 'Published') {
        return true;
      }
      return false;
    })
    .map(getPostMetadata);

  return posts;
};
