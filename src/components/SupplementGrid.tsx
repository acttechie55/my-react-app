import type { Supplement } from '../types/supplement';
import SupplementCard from './SupplementCard';

interface SupplementGridProps {
  supplements: Supplement[];
  onFavoriteToggle: (id: string) => void;
  favorites: string[];
  onCardClick: (id: string) => void;
}

function SupplementGrid({ supplements, onFavoriteToggle, favorites, onCardClick }: SupplementGridProps) {
  return (
    <div className="supplement-grid">
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
