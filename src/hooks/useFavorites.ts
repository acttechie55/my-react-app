import { useLocalStorage } from './useLocalStorage';

/**
 * useFavorites - A custom hook for managing favorite supplements
 *
 * ANGULAR COMPARISON:
 * - In Angular, this would be a FavoritesService with methods to add/remove/check favorites
 * - In React, it's a hook that composes useLocalStorage and adds domain-specific logic
 *
 * COMPOSITION PATTERN:
 * - This hook USES another hook (useLocalStorage)
 * - Hooks can call other hooks (like services can inject other services in Angular)
 * - This is how you build complex logic from simple building blocks
 *
 * @returns Object with favorites array and helper functions
 */
export function useFavorites() {
  // STEP 1: Use our useLocalStorage hook to manage favorites
  // This gives us reactive state that persists in localStorage
  const [favorites, setFavorites] = useLocalStorage<string[]>('supplement-favorites', []);

  // STEP 2: Create helper functions for common operations
  // These are convenience methods that wrap the state updates
  // ANGULAR EQUIVALENT: These are like methods on a service class

  /**
   * Add a supplement ID to favorites
   * Uses functional update to avoid stale state issues
   */
  const addFavorite = (supplementId: string) => {
    setFavorites((prevFavorites) => {
      // Prevent duplicates - only add if not already in the list
      if (prevFavorites.includes(supplementId)) {
        return prevFavorites; // No change needed
      }
      // Return new array with the new ID added
      // REACT PATTERN: Always create NEW arrays/objects, don't mutate existing ones
      return [...prevFavorites, supplementId];
    });
  };

  /**
   * Remove a supplement ID from favorites
   */
  const removeFavorite = (supplementId: string) => {
    setFavorites((prevFavorites) =>
      // Filter out the ID we want to remove
      prevFavorites.filter((id) => id !== supplementId)
    );
  };

  /**
   * Toggle a favorite - add if not present, remove if present
   * Useful for heart/star buttons that toggle on/off
   */
  const toggleFavorite = (supplementId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(supplementId)) {
        // Already favorited, so remove it
        return prevFavorites.filter((id) => id !== supplementId);
      } else {
        // Not favorited, so add it
        return [...prevFavorites, supplementId];
      }
    });
  };

  /**
   * Check if a supplement is in favorites
   * Useful for conditional rendering (show filled vs empty heart icon)
   */
  const isFavorite = (supplementId: string): boolean => {
    return favorites.includes(supplementId);
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  /**
   * Get the count of favorites
   * Could also just use favorites.length directly, but this is more semantic
   */
  const favoritesCount = favorites.length;

  // STEP 3: Return an object with all the data and functions
  // PATTERN DIFFERENCE:
  // - useLocalStorage returns a TUPLE [value, setter]
  // - useFavorites returns an OBJECT { favorites, addFavorite, ... }
  //
  // WHY THE DIFFERENCE?
  // - useLocalStorage: Generic utility, tuple lets you name things flexibly
  // - useFavorites: Domain-specific, object gives clear named methods
  //
  // Both patterns are valid! Choose based on your use case.
  return {
    favorites,           // The array of favorite IDs
    addFavorite,         // Function to add a favorite
    removeFavorite,      // Function to remove a favorite
    toggleFavorite,      // Function to toggle a favorite
    isFavorite,          // Function to check if something is favorited
    clearFavorites,      // Function to clear all favorites
    favoritesCount,      // Number of favorites (convenience)
  };
}

/**
 * USAGE EXAMPLE:
 *
 * function SupplementCard({ supplement }) {
 *   // Call the hook - get back an object with everything we need
 *   const { isFavorite, toggleFavorite } = useFavorites();
 *
 *   const handleToggle = () => {
 *     toggleFavorite(supplement.id);
 *   };
 *
 *   return (
 *     <div>
 *       <h3>{supplement.name}</h3>
 *       <button onClick={handleToggle}>
 *         {isFavorite(supplement.id) ? '❤️ Favorited' : '🤍 Favorite'}
 *       </button>
 *     </div>
 *   );
 * }
 *
 * function FavoritesPage() {
 *   const { favorites, favoritesCount, clearFavorites } = useFavorites();
 *
 *   return (
 *     <div>
 *       <h1>My Favorites ({favoritesCount})</h1>
 *       <button onClick={clearFavorites}>Clear All</button>
 *       {favorites.map(id => <SupplementCard key={id} id={id} />)}
 *     </div>
 *   );
 * }
 */
