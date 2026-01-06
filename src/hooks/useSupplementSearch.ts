import { useState, useEffect } from 'react';
import { SupplementSearchResults } from '../types/supplement';
import { searchSupplements } from '../services/api';

interface UseSupplementSearchOptions {
  query: string;
  page?: number;
  pageSize?: number;
}

export function useSupplementSearch({ query, page = 1, pageSize = 20 }: UseSupplementSearchOptions) {
  const [data, setData] = useState<SupplementSearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't search if query is empty
    if (!query.trim()) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await searchSupplements(query, page, pageSize);
        setData(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search supplements');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page, pageSize]);

  const retry = () => {
    if (query.trim()) {
      setError(null);
      setLoading(true);
      searchSupplements(query, page, pageSize)
        .then(setData)
        .catch(err => setError(err instanceof Error ? err.message : 'Failed to search supplements'))
        .finally(() => setLoading(false));
    }
  };

  return {
    data,
    loading,
    error,
    retry,
  };
}
