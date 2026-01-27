/**
 * Pagination Component
 *
 * Navigation controls for paginated results.
 * Shows first, previous, page info, next, and last buttons.
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Shared button classes
  const buttonClasses = `
    px-4 py-2
    text-sm font-medium
    bg-white
    border border-gray-300
    rounded-lg
    hover:bg-gray-50
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:bg-white
    transition-colors
  `;

  return (
    <div className="flex items-center gap-2">
      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={!hasPrevious}
        className={buttonClasses}
        aria-label="First page"
      >
        «
      </button>

      {/* Previous Page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className={buttonClasses}
        aria-label="Previous page"
      >
        ‹ Prev
      </button>

      {/* Page Info */}
      <span className="px-4 py-2 text-sm text-gray-700">
        Page <span className="font-medium">{currentPage}</span> of{' '}
        <span className="font-medium">{totalPages}</span>
      </span>

      {/* Next Page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={buttonClasses}
        aria-label="Next page"
      >
        Next ›
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={!hasNext}
        className={buttonClasses}
        aria-label="Last page"
      >
        »
      </button>
    </div>
  );
}

export default Pagination;
