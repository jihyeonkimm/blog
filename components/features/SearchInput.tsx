'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSearch } from '@/app/hooks/useSearch';
import { Spinner } from '../ui/spinner';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url: string;
}

interface SearchInputProps {
  placeholder?: string;
  results?: SearchResult[];
  className?: string;
}

export default function SearchInput({
  placeholder = '검색어를 입력해 주세요',
  className,
}: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { results, isLoading, error, search } = useSearch();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    search(value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn('flex items-center justify-center h-9 w-9 cursor-pointer', className)}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/20 backdrop-blur-sm" onClick={handleClose}>
          <div
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-background rounded-lg shadow-lg">
              <div className="flex items-center gap-2 px-4 py-2 border-b">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={handleInputChange}
                  autoFocus
                  className="border-0 shadow-none focus-visible:ring-0 px-0"
                />
                <button
                  onClick={handleClose}
                  className="flex-shrink-0 p-1 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {query.length > 0 && (
                <div className="max-h-[60vh] min-h-[90px] overflow-y-auto">
                  {error && (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                      {error}
                    </div>
                  )}
                  {!error && results.length > 0 && (
                    <div className="p-2">
                      {results.map((result) => (
                        <a
                          key={result.id}
                          href={`posts/${result.slug}`}
                          onClick={handleResultClick}
                          className="block rounded-md px-4 py-3 hover:bg-accent transition-colors"
                        >
                          <div className="font-medium text-sm">{result.title}</div>
                        </a>
                      ))}
                    </div>
                  )}
                  {!error && !isLoading && results.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                      검색 결과가 없습니다.
                    </div>
                  )}
                  {!error && isLoading && (
                    <div className="flex justify-center items-center px-4 py-8">
                      <Spinner />
                    </div>
                  )}
                </div>
              )}

              {query.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  검색어를 입력해주세요
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
