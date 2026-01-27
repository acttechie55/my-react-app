import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecentSearches } from '../hooks';
import SearchBar from '../components/SearchBar';
import RecentSearches from '../components/RecentSearches';

/**
 * SearchPage - The home page of the app where users start their search
 *
 * ANGULAR COMPARISON:
 * - This is like a "smart" or "container" component in Angular
 * - It manages state and passes data down to "dumb" presentational components
 * - In Angular, you might inject Router and services; here we use hooks
 *
 * REACT PATTERNS USED:
 * 1. useState - Local state for the search input
 * 2. useNavigate - React Router's hook for programmatic navigation
 * 3. useRecentSearches - Our custom hook for recent search history
 *
 * DATA FLOW:
 * SearchPage (state + hooks)
 *   ↓ passes props
 *   ├── SearchBar (receives value, onChange, onSubmit)
 *   └── RecentSearches (receives searches, handlers)
 */
function SearchPage() {
  // LOCAL STATE: The current value in the search input
  // This is "controlled component" pattern - React controls the input value
  // ANGULAR EQUIVALENT: [(ngModel)]="searchQuery" (two-way binding)
  const [searchQuery, setSearchQuery] = useState('');

  // NAVIGATION HOOK: Allows programmatic navigation
  // ANGULAR EQUIVALENT: constructor(private router: Router) then this.router.navigate([...])
  const navigate = useNavigate();

  // OUR CUSTOM HOOK: Recent searches with localStorage persistence
  // Returns everything we need to manage recent searches
  // ANGULAR EQUIVALENT: Injecting a RecentSearchesService
  const {
    recentSearches,      // string[] - The list of recent searches
    addRecentSearch,     // (query: string) => void - Add a search to history
    clearRecentSearches, // () => void - Clear all history
  } = useRecentSearches();

  /**
   * Handle search submission
   * Called when user clicks Search button or presses Enter
   */
  const handleSearch = () => {
    // Don't search empty strings
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    // Add to recent searches (our hook handles duplicates and limiting)
    addRecentSearch(trimmedQuery);

    // Navigate to search results page with query parameter
    // ANGULAR EQUIVALENT: this.router.navigate(['/search'], { queryParams: { q: trimmedQuery } })
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  /**
   * Handle clicking on a recent search chip
   * Immediately navigates to results for that search term
   */
  const handleRecentSearchClick = (search: string) => {
    // Update the input field to show what was clicked
    setSearchQuery(search);

    // Add to recent searches (moves it to the top of the list)
    addRecentSearch(search);

    // Navigate to results
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Supplement Explorer
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          Search for supplements, vitamins, and ingredients to view detailed
          nutritional information.
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="w-full max-w-xl mb-8">
        {/*
          PRESENTATIONAL COMPONENT PATTERN:
          SearchBar doesn't manage its own state - it receives everything via props.
          This makes it reusable and testable.

          ANGULAR EQUIVALENT:
          <app-search-bar
            [value]="searchQuery"
            (valueChange)="searchQuery = $event"
            (submit)="handleSearch()"
          ></app-search-bar>
        */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearch}
        />
      </div>

      {/* Recent Searches Section */}
      <div className="w-full max-w-xl">
        {/*
          CONDITIONAL RENDERING:
          RecentSearches component returns null internally if searches is empty,
          but we could also conditionally render it here:
          {recentSearches.length > 0 && <RecentSearches ... />}
        */}
        <RecentSearches
          searches={recentSearches}
          onSearchClick={handleRecentSearchClick}
          onClearAll={clearRecentSearches}
        />
      </div>

      {/* Disclaimer */}
      <p className="mt-12 text-sm text-gray-500 text-center max-w-md">
        Data provided by Open Food Facts. Always consult a healthcare
        professional before starting any supplement regimen.
      </p>
    </div>
  );
}

export default SearchPage;

/**
 * RECAP - What This Page Demonstrates:
 *
 * 1. HOOKS USAGE:
 *    - useState for local form state
 *    - useNavigate for routing (from react-router-dom)
 *    - useRecentSearches for business logic (our custom hook)
 *
 * 2. COMPONENT COMPOSITION:
 *    - SearchPage (container) composes SearchBar + RecentSearches (presentational)
 *    - Data flows DOWN via props
 *    - Events flow UP via callback props (onChange, onSubmit, etc.)
 *
 * 3. CONTROLLED COMPONENTS:
 *    - The input value is controlled by React state
 *    - Every keystroke updates state, which updates the input
 *    - This is similar to Angular's [(ngModel)] but more explicit
 *
 * 4. PROGRAMMATIC NAVIGATION:
 *    - useNavigate returns a function to navigate
 *    - Similar to Angular's Router.navigate()
 */
