import type { Supplement } from '../types/supplement';
import SupplementCard from './SupplementCard';

/**
 * SupplementGrid Component
 *
 * Displays a responsive grid of supplement cards.
 */

interface SupplementGridProps {
  supplements: Supplement[];
  onFavoriteToggle: (id: string) => void;
  favorites: string[];
  onCardClick: (id: string) => void;
}

function SupplementGrid({ supplements, onFavoriteToggle, favorites, onCardClick }: SupplementGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {supplements.map((supplement) => (
        <SupplementCard
          key={supplement.id}
          supplement={supplement}
          onFavoriteToggle={onFavoriteToggle}
          isFavorite={favorites.includes(supplement.id)}
          onClick={() => onCardClick(supplement.id)}
        />
      ))}
    </div>
  );
}

export default SupplementGrid;
