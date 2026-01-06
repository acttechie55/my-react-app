interface RecentSearchesProps {
  searches: string[];
  onSearchClick: (search: string) => void;
  onClearAll: () => void;
}

function RecentSearches({ searches, onSearchClick, onClearAll }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="recent-searches">
      <div className="recent-searches-header">
        <h3>Recent Searches</h3>
        <button onClick={onClearAll} className="clear-all-button">
          Clear all
        </button>
      </div>

      <div className="search-chips">
        {searches.map((search, index) => (
          <button
            key={`${search}-${index}`}
            onClick={() => onSearchClick(search)}
            className="search-chip"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;
