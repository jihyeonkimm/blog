'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { formatDate } from '@/lib/date';

interface PostCardProps {
  post: Post;
  isFirst?: boolean;
}

export function PostCard({ post, isFirst }: PostCardProps) {
  return (
    <Card
      className={`group bg-card/50 overflow-hidden backdrop-blur-sm transition-all duration-300 flex-row justify-between items-center rounded-none ${isFirst ? 'border-none' : 'border-t'}`}
    >
      <CardContent className="px-0 pt-6 pb-3 grow">
        <div className="mb-2 md:mb-4 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h2 className="group-hover:text-primary mb-2 text-md md:text-xl font-bold tracking-tight transition-colors">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-muted-foreground mt-2 text-xs md:text-base line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        )}
        <div className="text-muted-foreground mt-3 md:mt-6 flex items-center gap-x-4 text-sm">
          {/* {post.author && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )} */}
          {post.date && (
            <div className="flex items-center gap-1.5">
              {/* <Calendar className="h-4 w-4" /> */}
              <time className="text-xs">{formatDate(post.date)}</time>
            </div>
          )}
        </div>
      </CardContent>
      {post.coverImage && (
        <div className="relative shrink-0 md:w-40 w-30 overflow-hidden rounded-md aspect-3/2">
          <div className="from-background/20 absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isFirst}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </Card>
  );
}
