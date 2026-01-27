/**
 * ErrorMessage Component
 *
 * Displays an error message with optional retry button.
 * Used for: API errors, network failures, etc.
 *
 * ACCESSIBILITY:
 * - role="alert" announces the error to screen readers
 */

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="
        flex flex-col items-center
        p-6
        bg-red-50
        border border-red-200
        rounded-lg
        max-w-md
      "
      role="alert"
    >
      {/* Error Icon */}
      <div className="text-4xl mb-3">
        ⚠️
      </div>

      {/* Error Message */}
      <p className="text-red-700 text-center mb-4">
        {message}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="
            px-4 py-2
            text-sm font-medium
            text-red-700
            bg-red-100
            rounded-lg
            hover:bg-red-200
            focus:outline-none
            focus:ring-2
            focus:ring-red-500
            transition-colors
          "
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
