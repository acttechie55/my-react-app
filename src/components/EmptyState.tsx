/**
 * EmptyState Component
 *
 * Displays a centered message when there's no content to show.
 * Used for: no search results, empty favorites, initial states, etc.
 *
 * OPTIONAL FEATURES:
 * - icon: An emoji or icon to display
 * - actionLabel + onAction: A button to perform an action (e.g., "Go back")
 */

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyState({ icon, title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      {icon && (
        <div className="text-6xl mb-4">
          {icon}
        </div>
      )}

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h2>

      {/* Message */}
      <p className="text-gray-600 max-w-md mb-6">
        {message}
      </p>

      {/* Optional Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="
            px-6 py-2
            text-sm font-medium
            text-blue-600
            bg-blue-50
            rounded-lg
            hover:bg-blue-100
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            transition-colors
          "
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
