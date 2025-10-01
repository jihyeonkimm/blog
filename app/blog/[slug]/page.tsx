import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date';
import { getPostBySlug } from '@/lib/notion';
import { CalendarDays, User } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import Image, { ImageProps } from 'next/image';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { post, markdown } = await getPostBySlug(slug);

  return (
    <div className="container py-12">
      <div className="grid grid-cols-[240px_1fr_240px] gap-8">
        <aside />
        <section>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                {post.tags?.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold">{post.title}</h1>
            </div>

            {/* 메타 정보 */}
            <div className="text-muted-foreground flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>

            <div className="prose prose-sm">
              <MDXRemote
                source={markdown}
                components={{
                  p: ({ children }) => {
                    return <p className="not-prose relative leading-relaxed">{children}</p>;
                  },
                  br: () => <br className="my-2" />,
                  img: (props) => (
                    <Image
                      {...(props as ImageProps)}
                      width={1200}
                      height={600}
                      alt={props.alt || ''}
                      style={{ width: '100%', height: 'auto', position: 'relative' }}
                      className="my-6"
                    />
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/30 pl-4 italic bg-muted/30 py-2 my-4 rounded-r">
                      {children}
                    </blockquote>
                  ),
                }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSanitize, rehypePrettyCode, rehypeRaw],
                  },
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
