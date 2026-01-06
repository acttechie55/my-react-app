function SkeletonSupplementCard() {
  return (
    <div className="supplement-card skeleton">
      <div className="card-image skeleton-image"></div>
      <div className="card-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-brand"></div>
        <div className="skeleton-line skeleton-category"></div>
        <div className="skeleton-line skeleton-ingredients"></div>
      </div>
    </div>
  );
}

export default SkeletonSupplementCard;
