'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TagFilterItem } from '@/types/blog';
import Link from 'next/link';
import { clsx } from 'clsx';

interface TagSectionProps {
  tags: TagFilterItem[];
  selectedTag?: string;
}

const TagSection = ({ tags, selectedTag }: TagSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {tags.map((tag) => (
            <Link href={`?tag=${tag.name}`} key={tag.name}>
              <div
                className={clsx(
                  'flex items-center justify-between rounded-md p-1.5 text-sm transition-colors',
                  selectedTag === tag.name
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted-foreground/10'
                )}
              >
                <span>{tag.name}</span>
                <span>{tag.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TagSection;
