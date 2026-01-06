function SkeletonSupplementDetail() {
  return (
    <div className="supplement-detail skeleton">
      <div className="skeleton-header">
        <div className="skeleton-line skeleton-back-button"></div>
      </div>

      <div className="skeleton-hero-image"></div>

      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-brand"></div>
        <div className="skeleton-line skeleton-tags"></div>

        <div className="skeleton-section">
          <div className="skeleton-line skeleton-heading"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>

        <div className="skeleton-section">
          <div className="skeleton-line skeleton-heading"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonSupplementDetail;
