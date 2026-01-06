interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={!hasPrevious}
        className="pagination-button"
        aria-label="First page"
      >
        «
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="pagination-button"
        aria-label="Previous page"
      >
        ‹ Previous
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="pagination-button"
        aria-label="Next page"
      >
        Next ›
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={!hasNext}
        className="pagination-button"
        aria-label="Last page"
      >
        »
      </button>
    </div>
  );
}

export default Pagination;
