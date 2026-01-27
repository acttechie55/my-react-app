import type { Supplement } from '../types/supplement';
import FavoriteButton from './FavoriteButton';

/**
 * SupplementCard Component
 *
 * Displays a single supplement as a card with image, name, brand, and preview info.
 * Clicking the card navigates to the detail page.
 * Clicking the heart toggles favorites without navigating.
 *
 * ANGULAR COMPARISON:
 * - e.stopPropagation() prevents the card click when clicking the favorite button
 * - This is like calling $event.stopPropagation() in Angular
 */

interface SupplementCardProps {
  supplement: Supplement;
  onFavoriteToggle: (id: string) => void;
  isFavorite: boolean;
  onClick?: () => void;
}

function SupplementCard({ supplement, onFavoriteToggle, isFavorite, onClick }: SupplementCardProps) {
  const handleCardClick = () => {
    if (onClick) onClick();
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    onFavoriteToggle(supplement.id);
  };

  // Get first 3 ingredients for preview
  const previewIngredients = supplement.ingredients.slice(0, 3).join(', ');
  const hasMoreIngredients = supplement.ingredients.length > 3;

  return (
    <div
      className="
        bg-white
        rounded-lg
        shadow-md
        overflow-hidden
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-lg
        hover:-translate-y-1
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* Card Image */}
      <div className="relative h-48 bg-gray-100">
        {supplement.imageUrl ? (
          <img
            src={supplement.imageUrl}
            alt={supplement.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">💊</span>
          </div>
        )}

        {/* Favorite Button - positioned in top right corner */}
        <div className="absolute top-2 right-2">
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={handleFavoriteClick}
            size="small"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
          {supplement.name}
        </h3>

        {/* Brand */}
        {supplement.brand && (
          <p className="text-sm text-gray-500 mb-2">
            {supplement.brand}
          </p>
        )}

        {/* Category Tag */}
        {supplement.categories.length > 0 && (
          <span className="
            inline-block
            px-2 py-1
            text-xs
            font-medium
            text-blue-700
            bg-blue-50
            rounded-full
            mb-2
          ">
            {supplement.categories[0]}
          </span>
        )}

        {/* Ingredients Preview */}
        {previewIngredients && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {previewIngredients}{hasMoreIngredients ? '...' : ''}
          </p>
        )}
      </div>
    </div>
  );
}

export default SupplementCard;
