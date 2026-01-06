interface DisclaimerBannerProps {
  onDismiss: () => void;
  isDismissed: boolean;
}

function DisclaimerBanner({ onDismiss, isDismissed }: DisclaimerBannerProps) {
  if (isDismissed) return null;

  return (
    <div className="disclaimer-banner" role="alert">
      <div className="disclaimer-content">
        <span className="disclaimer-icon" aria-hidden="true">⚠️</span>
        <p className="disclaimer-text">
          This information is for educational purposes only and not medical advice.
          Consult a healthcare professional before taking supplements.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="disclaimer-close"
        aria-label="Dismiss disclaimer"
      >
        ✕
      </button>
    </div>
  );
}

export default DisclaimerBanner;
