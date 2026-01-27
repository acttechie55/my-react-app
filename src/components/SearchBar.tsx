/**
 * SearchBar Component
 *
 * A presentational component that displays a search input with submit button.
 * It doesn't manage its own state - all state is passed via props.
 *
 * ANGULAR COMPARISON:
 * - This is like a "dumb" or "presentational" component
 * - Uses @Input() for data and @Output() for events
 * - In React, we use props for both inputs and callbacks
 */

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search supplements, vitamins, ingredients..."
}: SearchBarProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full"
    >
      {/* Input Container - allows positioning the clear button inside */}
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full
            px-4 py-3
            text-gray-900
            bg-white
            border border-gray-300
            rounded-lg
            shadow-sm
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition-colors
          "
        />

        {/* Clear button - only shows when there's text */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-gray-600
              focus:outline-none
              transition-colors
            "
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          px-6 py-3
          bg-blue-600
          text-white
          font-medium
          rounded-lg
          shadow-sm
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
          transition-colors
          whitespace-nowrap">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
