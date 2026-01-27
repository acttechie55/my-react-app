/**
 * RecentSearches Component
 *
 * Displays a list of recent search terms as clickable chips.
 * This is a presentational component - it receives all data via props.
 *
 * ANGULAR COMPARISON:
 * - Similar to a component that displays a list with *ngFor
 * - In React, we use .map() to render lists
 * - The key prop is like trackBy in Angular
 *
 * CONDITIONAL RENDERING:
 * - Returns null if no searches (component doesn't render anything)
 * - This is a common React pattern for conditional rendering
 * - ANGULAR EQUIVALENT: *ngIf="searches.length > 0"
 */

interface RecentSearchesProps {
  searches: string[];
  onSearchClick: (search: string) => void;
  onClearAll: () => void;
}

function RecentSearches({ searches, onSearchClick, onClearAll }: RecentSearchesProps) {
  // CONDITIONAL RENDERING: Return null to render nothing
  // This is cleaner than wrapping everything in a conditional
  if (searches.length === 0) return null;

  return (
    <div className="w-full">
      {/* Header with title and clear button */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">
          Recent Searches
        </h3>
        <button
          onClick={onClearAll}
          className="
            text-sm
            text-gray-500
            hover:text-gray-700
            focus:outline-none
            focus:underline
            transition-colors
          "
        >
          Clear all
        </button>
      </div>

      {/* Search chips container */}
      <div className="flex flex-wrap gap-2">
        {/*
          RENDERING LISTS IN REACT:
          - Use .map() to transform array into JSX elements
          - Each item needs a unique "key" prop for React's reconciliation
          - ANGULAR EQUIVALENT: *ngFor="let search of searches; trackBy: trackByFn"

          WHY KEY IS IMPORTANT:
          - Helps React identify which items changed/added/removed
          - Improves performance by avoiding unnecessary re-renders
          - Should be a unique identifier (here we use search + index as fallback)
        */}
        {searches.map((search, index) => (
          <button
            key={`${search}-${index}`}
            onClick={() => onSearchClick(search)}
            className="
              px-3 py-1.5
              text-sm
              text-gray-700
              bg-gray-100
              rounded-full
              hover:bg-gray-200
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300
              transition-colors
            ">
            {search}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;
