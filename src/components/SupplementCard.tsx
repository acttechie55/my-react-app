import type { Supplement } from '../types/supplement';
import FavoriteButton from './FavoriteButton';

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
    <div className="supplement-card" onClick={handleCardClick} role="button" tabIndex={0}>
      <div className="card-image">
        {supplement.imageUrl ? (
          <img src={supplement.imageUrl} alt={supplement.name} />
        ) : (
          <div className="placeholder-image">No image</div>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{supplement.name}</h3>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={handleFavoriteClick}
            size="small"
          />
        </div>

        {supplement.brand && <p className="card-brand">{supplement.brand}</p>}

        {supplement.categories.length > 0 && (
          <p className="card-category">{supplement.categories[0]}</p>
        )}

        {previewIngredients && (
          <p className="card-ingredients">
            {previewIngredients}{hasMoreIngredients ? '...' : ''}
          </p>
        )}
      </div>
    </div>
  );
}

export default SupplementCard;
