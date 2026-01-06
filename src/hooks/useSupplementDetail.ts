import { useState, useEffect } from 'react';
import { Supplement } from '../types/supplement';
import { getSupplementById } from '../services/api';

export function useSupplementDetail(id: string) {
  const [data, setData] = useState<Supplement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      setError('No supplement ID provided');
      return;
    }

    const fetchSupplement = async () => {
      setLoading(true);
      setError(null);

      try {
        const supplement = await getSupplementById(id);
        if (supplement) {
          setData(supplement);
        } else {
          setError('Supplement not found');
          setData(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load supplement details');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplement();
  }, [id]);

  const retry = () => {
    if (id) {
      setError(null);
      setLoading(true);
      getSupplementById(id)
        .then(supplement => {
          if (supplement) {
            setData(supplement);
          } else {
            setError('Supplement not found');
            setData(null);
          }
        })
        .catch(err => setError(err instanceof Error ? err.message : 'Failed to load supplement details'))
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
