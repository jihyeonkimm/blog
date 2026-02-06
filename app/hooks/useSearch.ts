import { Post } from '@/types/blog';
import { useCallback, useRef, useState } from 'react';

interface UseSearchProps {
  results: Post[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => void;
}

export const useSearch = (): UseSearchProps => {
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const search = useCallback((query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error('검색에 실패했습니다.');
        }

        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        setError(error instanceof Error ? error.message : '검색 중 오류가 발생했습니다.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  return { results, isLoading, error, search };
};
