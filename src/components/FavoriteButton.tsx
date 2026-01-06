interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: 'small' | 'large';
}

function FavoriteButton({ isFavorite, onToggle, size = 'large' }: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`favorite-button favorite-button-${size}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}

export default FavoriteButton;
