/**
 * FavoriteButton Component
 *
 * A heart button that toggles favorite state.
 * Uses emoji for simplicity (could be replaced with SVG icons).
 *
 * SIZE VARIANTS:
 * - small: For use inside cards
 * - large: For use on detail pages
 */

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: 'small' | 'large';
}

function FavoriteButton({ isFavorite, onToggle, size = 'large' }: FavoriteButtonProps) {
  // Size-specific classes
  const sizeClasses = size === 'small'
    ? 'p-1.5 text-xs'
    : 'p-2 text-2xl';

  return (
    <button
      onClick={onToggle}
      className={`
        ${sizeClasses}
        bg-white
        rounded-full
        shadow-md
        hover:shadow-lg
        hover:scale-110
        focus:outline-none
        focus:ring-2
        focus:ring-pink-300
        transition-all
        duration-200
      `}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}

export default FavoriteButton;
