import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSupplementSearch, useFavorites } from '../hooks';
import SearchBar from '../components/SearchBar';
import SupplementGrid from '../components/SupplementGrid';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import SkeletonSupplementCard from '../components/SkeletonSupplementCard';

/**
 * SearchResultsPage - Displays search results from the API
 *
 * ANGULAR COMPARISON:
 * - This is a "routed component" that reads query params from the URL
 * - In Angular, you'd inject ActivatedRoute and subscribe to queryParams
 * - In React, we use the useSearchParams hook from react-router-dom
 *
 * HOOKS USED:
 * 1. useSearchParams - Read/write URL query parameters (react-router-dom)
 * 2. useNavigate - Programmatic navigation
 * 3. useState - Local state for search input
 * 4. useSupplementSearch - Our custom API hook (fetches data automatically)
 * 5. useFavorites - Our custom favorites hook
 *
 * DATA FLOW:
 * URL (?q=protein&page=1)
 *   ↓ useSearchParams reads
 * query, page state
 *   ↓ passed to useSupplementSearch
 * API call happens automatically
 *   ↓ hook returns { data, loading, error }
 * UI renders based on state
 */
function SearchResultsPage() {
  // URL QUERY PARAMS: Read the 'q' and 'page' parameters from the URL
  // ANGULAR EQUIVALENT: this.route.queryParams.subscribe(params => ...)
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract query and page from URL (with defaults)
  const urlQuery = searchParams.get('q') || '';
  const urlPage = parseInt(searchParams.get('page') || '1', 10);

  // LOCAL STATE: For the search input (allows typing before submitting)
  const [searchInput, setSearchInput] = useState(urlQuery);

  // NAVIGATION: For navigating to supplement detail pages
  const navigate = useNavigate();

  // API HOOK: Fetches search results automatically when urlQuery or urlPage changes
  // This is the "magic" - useEffect inside this hook triggers the API call
  // ANGULAR EQUIVALENT: A service method that returns Observable, subscribed in ngOnInit
  const { data, loading, error } = useSupplementSearch(urlQuery, urlPage);

  // FAVORITES HOOK: For managing favorites state
  const { favorites, toggleFavorite } = useFavorites();

  /**
   * Handle new search submission
   * Updates the URL which triggers a new API call via useSupplementSearch
   */
  const handleSearch = () => {
    const trimmedQuery = searchInput.trim();
    if (!trimmedQuery) return;

    // Update URL params - this triggers useSupplementSearch to fetch new data
    // ANGULAR EQUIVALENT: this.router.navigate([], { queryParams: { q: trimmedQuery, page: 1 } })
    setSearchParams({ q: trimmedQuery, page: '1' });
  };

  /**
   * Handle page change
   * Updates the URL which triggers a new API call
   */
  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: urlQuery, page: newPage.toString() });
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handle clicking on a supplement card
   * Navigate to the detail page
   */
  const handleCardClick = (supplementId: string) => {
    navigate(`/supplement/${supplementId}`);
  };

  /**
   * Handle retry after error
   * Re-triggers the search by updating URL params
   */
  const handleRetry = () => {
    // Force a re-fetch by setting params again
    setSearchParams({ q: urlQuery, page: urlPage.toString() });
  };

  // Calculate total pages for pagination
  const pageSize = 24;
  const totalPages = data ? Math.ceil(data.count / pageSize) : 0;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar at top of results */}
        <div className="mb-8 max-w-xl mx-auto">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleSearch}
          />
        </div>

        {/* Results Header - shows what was searched and result count */}
        {urlQuery && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {loading ? (
                'Searching...'
              ) : data ? (
                <>Results for "{urlQuery}" ({data.count} found)</>
              ) : (
                `Results for "${urlQuery}"`
              )}
            </h1>
          </div>
        )}

        {/* CONDITIONAL RENDERING: Show different UI based on state */}
        {/*
          ANGULAR EQUIVALENT:
          <ng-container *ngIf="loading">...</ng-container>
          <ng-container *ngIf="error">...</ng-container>
          <ng-container *ngIf="data && data.length === 0">...</ng-container>
          <ng-container *ngIf="data && data.length > 0">...</ng-container>

          In React, we use JavaScript expressions directly in JSX
        */}

        {/* LOADING STATE: Show skeleton cards while fetching */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Create 8 skeleton cards */}
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonSupplementCard key={index} />
            ))}
          </div>
        )}

        {/* ERROR STATE: Show error message with retry button */}
        {!loading && error && (
          <div className="flex justify-center py-12">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}

        {/* EMPTY STATE: No results found */}
        {!loading && !error && data && data.supplements.length === 0 && (
          <EmptyState
            icon="🔍"
            title="No supplements found"
            message={`We couldn't find any supplements matching "${urlQuery}". Try a different search term.`}
            actionLabel="Clear Search"
            onAction={() => navigate('/')}
          />
        )}

        {/* SUCCESS STATE: Show results grid */}
        {!loading && !error && data && data.supplements.length > 0 && (
          <>
            <SupplementGrid
              supplements={data.supplements}
              onFavoriteToggle={toggleFavorite}
              favorites={favorites}
              onCardClick={handleCardClick}
            />

            {/* Pagination - only show if more than one page */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={urlPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}

        {/* NO QUERY: User landed on page without a search */}
        {!urlQuery && (
          <EmptyState
            icon="🔎"
            title="Start searching"
            message="Enter a search term above to find supplements."
          />
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;

/**
 * RECAP - Key Concepts in This Page:
 *
 * 1. URL AS STATE (useSearchParams):
 *    - The URL is the "source of truth" for what to search
 *    - Changing URL params triggers new API calls
 *    - User can bookmark/share search results
 *    - ANGULAR EQUIVALENT: ActivatedRoute.queryParams
 *
 * 2. AUTOMATIC DATA FETCHING (useSupplementSearch):
 *    - Pass query and page to the hook
 *    - Hook uses useEffect internally to fetch when values change
 *    - Returns { data, loading, error } - standard React pattern
 *
 * 3. CONDITIONAL RENDERING:
 *    - Different UI for: loading, error, empty, success states
 *    - Use JavaScript expressions in JSX (ternary, &&, etc.)
 *    - ANGULAR EQUIVALENT: *ngIf, *ngSwitch
 *
 * 4. EVENT HANDLING:
 *    - Callback props flow up (onFavoriteToggle, onCardClick)
 *    - Parent handles the logic, children are presentational
 */
