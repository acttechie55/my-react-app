/**
 * Hooks Index - Central export for all custom hooks
 *
 * ANGULAR COMPARISON:
 * - This is like a "barrel export" or "public-api.ts"
 * - Allows clean imports: import { useLocalStorage } from '@/hooks'
 * - Instead of: import { useLocalStorage } from '@/hooks/useLocalStorage'
 */

export { useLocalStorage } from './useLocalStorage';
export { useFavorites } from './useFavorites';
export { useRecentSearches } from './useRecentSearches';
export { useSupplementSearch } from './useSupplementSearch';
export { useSupplementDetail } from './useSupplementDetail';
