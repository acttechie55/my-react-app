import { useState, useEffect } from 'react';

const RECENT_SEARCHES_KEY = 'supplement-recent-searches';
const MAX_RECENT_SEARCHES = 10;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentSearches(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Failed to parse recent searches from localStorage:', error);
        setRecentSearches([]);
      }
    }
  }, []);

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addSearch = (search: string) => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;

    setRecentSearches(prev => {
      // Remove duplicates and add to front
      const filtered = prev.filter(s => s.toLowerCase() !== trimmedSearch.toLowerCase());
      const updated = [trimmedSearch, ...filtered];

      // Keep only the most recent MAX_RECENT_SEARCHES
      return updated.slice(0, MAX_RECENT_SEARCHES);
    });
  };

  const clearAll = () => {
    setRecentSearches([]);
  };

  return {
    recentSearches,
    addSearch,
    clearAll,
  };
}
