import { useState, useEffect } from 'react';
import { getSupplementById } from '../api/supplements';
import { mapProductToSupplement } from '../api/mapper';
import { ApiError } from '../api/client';
import type { Supplement } from '../types/supplement';

/**
 * useSupplementDetail - Hook for fetching a single supplement's details
 *
 * PATTERN: Same as useSupplementSearch, but for a single item
 * - Uses useEffect to fetch data when ID changes
 * - Manages loading, error, and data states
 * - Maps API response to app types
 *
 * @param supplementId - The barcode/ID of the supplement to fetch
 * @returns Object with supplement data, loading state, and error state
 */
export function useSupplementDetail(supplementId: string | null) {
  // STATE: Same pattern as useSupplementSearch
  const [supplement, setSupplement] = useState<Supplement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // EFFECT: Fetch supplement when ID changes
  useEffect(() => {
    // Don't fetch if no ID provided
    if (!supplementId) {
      setSupplement(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Async fetch function
    const fetchSupplement = async () => {
      setLoading(true);
      setError(null);

      try {
        // API call
        const response = await getSupplementById(supplementId);

        // Check if product exists in response
        if (!response.product) {
          throw new Error('Product not found');
        }

        // Map to app type
        const mappedSupplement = mapProductToSupplement(response.product);

        // Update state
        setSupplement(mappedSupplement);
      } catch (err) {
        // Error handling
        if (err instanceof ApiError) {
          setError(`Failed to load supplement: ${err.message}`);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
        setSupplement(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplement();

    // Cleanup (optional)
    return () => {
      // Could cancel fetch here if using AbortController
    };
  }, [supplementId]); // Re-fetch when supplementId changes

  return {
    supplement,  // Supplement | null
    loading,     // boolean
    error,       // string | null
  };
}

/**
 * USAGE EXAMPLE:
 *
 * function SupplementDetailPage() {
 *   // Get ID from URL (React Router)
 *   const { id } = useParams<{ id: string }>();
 *
 *   // Fetch supplement data
 *   const { supplement, loading, error } = useSupplementDetail(id);
 *
 *   if (loading) {
 *     return <SkeletonSupplementDetail />;
 *   }
 *
 *   if (error) {
 *     return <ErrorMessage message={error} />;
 *   }
 *
 *   if (!supplement) {
 *     return <div>Supplement not found</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h1>{supplement.name}</h1>
 *       <p>Brand: {supplement.brand}</p>
 *       <img src={supplement.imageUrl} alt={supplement.name} />
 *       <IngredientsList ingredients={supplement.ingredients} />
 *       <NutritionalInfoTable nutritionalInfo={supplement.nutritionalInfo} />
 *     </div>
 *   );
 * }
 *
 * BEHAVIOR:
 * - When component mounts, useEffect runs and fetches data for the ID
 * - If user navigates to a different supplement (ID changes in URL):
 *   1. useEffect detects supplementId changed
 *   2. Runs the effect again with new ID
 *   3. Component re-renders with new data
 * - All automatic! No manual subscription management.
 */
