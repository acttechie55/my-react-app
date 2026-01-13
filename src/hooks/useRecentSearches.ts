import { useLocalStorage } from './useLocalStorage';

/**
 * useRecentSearches - A custom hook for managing recent search queries
 *
 * ANGULAR COMPARISON:
 * - Similar to useFavorites, but with different business logic
 * - In Angular, this would be a RecentSearchesService
 *
 * BUSINESS LOGIC:
 * - Store the last 10 search queries
 * - Most recent searches appear first
 * - No duplicates (if you search "protein" again, move it to the top)
 * - Automatically trim the list to max length
 *
 * @returns Object with recent searches array and helper functions
 */
export function useRecentSearches() {
  // Maximum number of recent searches to keep
  const MAX_RECENT_SEARCHES = 10;

  // Use our useLocalStorage hook to persist recent searches
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    'supplement-recent-searches',
    []
  );

  /**
   * Add a search query to recent searches
   *
   * LOGIC:
   * 1. Remove the query if it already exists (to avoid duplicates)
   * 2. Add it to the beginning of the array (most recent first)
   * 3. Trim the array to MAX_RECENT_SEARCHES
   *
   * @param query - The search query to add
   */
  const addRecentSearch = (query: string) => {
    // Trim whitespace and ignore empty strings
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return; // Don't add empty searches
    }

    setRecentSearches((prevSearches) => {
      // Remove the query if it already exists (prevents duplicates)
      const withoutCurrent = prevSearches.filter(
        (search) => search.toLowerCase() !== trimmedQuery.toLowerCase()
      );

      // Add the new query to the front and limit to MAX length
      // [new query, ...old queries] = most recent first
      const updated = [trimmedQuery, ...withoutCurrent];

      // Keep only the first MAX_RECENT_SEARCHES items
      // .slice(0, 10) gets items from index 0 to 9 (first 10 items)
      return updated.slice(0, MAX_RECENT_SEARCHES);
    });
  };

  /**
   * Remove a specific search query from recent searches
   * Useful for "X" delete buttons next to each recent search
   */
  const removeRecentSearch = (query: string) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((search) => search !== query)
    );
  };

  /**
   * Clear all recent searches
   * Useful for a "Clear history" button
   */
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  /**
   * Get the count of recent searches
   */
  const recentSearchesCount = recentSearches.length;

  // Return an object with all the data and functions
  return {
    recentSearches,        // Array of recent search queries (most recent first)
    addRecentSearch,       // Function to add a new search
    removeRecentSearch,    // Function to remove a specific search
    clearRecentSearches,   // Function to clear all searches
    recentSearchesCount,   // Number of recent searches
  };
}

/**
 * USAGE EXAMPLE:
 *
 * function SearchBar() {
 *   const [query, setQuery] = useState('');
 *   const { addRecentSearch, recentSearches } = useRecentSearches();
 *
 *   const handleSearch = () => {
 *     // When user searches, add it to recent searches
 *     addRecentSearch(query);
 *     // Then perform the actual search...
 *   };
 *
 *   return (
 *     <div>
 *       <input
 *         value={query}
 *         onChange={(e) => setQuery(e.target.value)}
 *         onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
 *       />
 *       <button onClick={handleSearch}>Search</button>
 *
 *       {recentSearches.length > 0 && (
 *         <div>
 *           <h4>Recent Searches:</h4>
 *           {recentSearches.map((search) => (
 *             <button key={search} onClick={() => setQuery(search)}>
 *               {search}
 *             </button>
 *           ))}
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 *
 * function SearchPage() {
 *   const { clearRecentSearches, recentSearchesCount } = useRecentSearches();
 *
 *   return (
 *     <div>
 *       <p>You have {recentSearchesCount} recent searches</p>
 *       <button onClick={clearRecentSearches}>Clear History</button>
 *     </div>
 *   );
 * }
 */
