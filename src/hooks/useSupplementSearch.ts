import { useState, useEffect } from 'react';
import { searchSupplements } from '../api/supplements';
import { mapSearchResponse } from '../api/mapper';
import { ApiError } from '../api/client';
import type { SupplementSearchResults } from '../types/supplement';

/**
 * useSupplementSearch - Hook for searching supplements with loading and error states
 *
 * ANGULAR COMPARISON:
 * - In Angular, you'd inject a service and subscribe to an Observable
 * - In React, you call a hook that manages the async operation internally
 *
 * NEW CONCEPT: useEffect
 * - useEffect is THE hook for side effects (API calls, subscriptions, etc.)
 * - Runs after the component renders
 * - Can re-run when dependencies change (like ngOnChanges)
 * - Can return a cleanup function (like ngOnDestroy)
 *
 * @param query - Search query string
 * @param page - Page number for pagination
 * @returns Object with data, loading state, and error state
 */
export function useSupplementSearch(query: string, page: number = 1) {
  // STATE 1: The search results data
  const [data, setData] = useState<SupplementSearchResults | null>(null);

  // STATE 2: Loading indicator (true while fetching)
  const [loading, setLoading] = useState<boolean>(false);

  // STATE 3: Error message (null if no error)
  const [error, setError] = useState<string | null>(null);

  // EFFECT: Fetch data whenever query or page changes
  // ANGULAR EQUIVALENT: This is like ngOnInit + ngOnChanges combined
  useEffect(() => {
    // Don't search if query is empty
    if (!query.trim()) {
      setData(null); // Clear previous results
      setLoading(false);
      setError(null);
      return; // Exit early
    }

    // Define an async function inside useEffect
    // WHY? useEffect itself cannot be async, but you can call async functions inside it
    const fetchData = async () => {
      // STEP 1: Set loading state
      setLoading(true);
      setError(null); // Clear previous errors

      try {
        // STEP 2: Make the API call
        const apiResponse = await searchSupplements(query, page, 24);

        // STEP 3: Map API response to app types
        const mappedData = mapSearchResponse(apiResponse);

        // STEP 4: Update state with the data
        setData(mappedData);
      } catch (err) {
        // STEP 5: Handle errors
        if (err instanceof ApiError) {
          setError(`Failed to search: ${err.message}`);
        } else {
          setError('An unexpected error occurred');
        }
        setData(null); // Clear data on error
      } finally {
        // STEP 6: Always turn off loading (success or failure)
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();

    // CLEANUP FUNCTION (optional, but good practice)
    // This runs when:
    // 1. The component unmounts (like ngOnDestroy)
    // 2. Before the effect runs again (like before ngOnChanges fires again)
    //
    // We don't need cleanup here since fetch() doesn't need cancellation,
    // but I'm showing you the pattern for completeness
    return () => {
      // If you were using AbortController to cancel fetch, you'd do it here:
      // abortController.abort();
    };
  }, [query, page]); // DEPENDENCIES ARRAY
  // ^^^ This effect re-runs whenever query or page changes
  // ANGULAR EQUIVALENT: @Input() query; ngOnChanges watches this

  // Return the state for components to use
  return {
    data,       // SupplementSearchResults | null
    loading,    // boolean - true while fetching
    error,      // string | null - error message if failed
  };
}

/**
 * USAGE EXAMPLE:
 *
 * function SearchResultsPage() {
 *   const [searchQuery, setSearchQuery] = useState('protein');
 *   const [currentPage, setCurrentPage] = useState(1);
 *
 *   // Call the hook - it automatically fetches when query/page changes
 *   const { data, loading, error } = useSupplementSearch(searchQuery, currentPage);
 *
 *   // Render based on state
 *   if (loading) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   if (error) {
 *     return <div>Error: {error}</div>;
 *   }
 *
 *   if (!data) {
 *     return <div>No results</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Found {data.count} supplements</h1>
 *       {data.supplements.map(supplement => (
 *         <div key={supplement.id}>{supplement.name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 *
 * IMPORTANT BEHAVIOR:
 * - When searchQuery changes from "protein" to "creatine":
 *   1. useEffect detects the change (dependency changed)
 *   2. Runs cleanup function (if any)
 *   3. Runs the effect again with new query
 *   4. Component re-renders as loading/data/error states update
 *
 * - This is AUTOMATIC! You don't manually trigger it.
 *   ANGULAR EQUIVALENT: Like Observable subscriptions that auto-update
 */
