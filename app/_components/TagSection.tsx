'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TagFilterItem } from '@/types/blog';
import Link from 'next/link';
import { clsx } from 'clsx';

interface TagSectionProps {
  tags: TagFilterItem[];
  selectedTag?: string;
}

const TagSection = ({ tags, selectedTag }: TagSectionProps) => {
  const [tagSticky, setTagSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        setTagSticky(true);
      } else {
        setTagSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Card className="lg:pb-0 pb-2 rounded-none bg-transparent">
      <CardContent
        className={`lg:px-6 px-4 lg:py-0 py-3 flex lg:flex-col flex-row lg:items-start items-center gap-3 lg:gap-0 bg-white lg:shadow-none ${tagSticky ? 'shadow-sm' : 'shadow-none'}`}
      >
        <strong className="shrink-0 text-xs">Tag</strong>
        <div className="flex lg:flex-col flex-row gap-3 lg:w-full lg:mt-6 overflow-x-auto">
          {tags.map((tag) => (
            <Link href={`?tag=${tag.name}`} key={tag.name}>
              <div
                className={clsx(
                  'flex items-center justify-between rounded-md p-2 text-sm transition-colors',
                  selectedTag === tag.name
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted-foreground/10 bg-muted-foreground/5'
                )}
              >
                <span className="whitespace-nowrap font-bold">{tag.name}</span>
                <span className="lg:block hidden font-bold">{tag.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TagSection;
