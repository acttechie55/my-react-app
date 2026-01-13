import { get } from './client';
import type {
  OpenFoodFactsResponse,
  OpenFoodFactsSearchResponse,
} from '../types/api';

/**
 * Supplements API Service
 *
 * ANGULAR COMPARISON:
 * - This is like a domain-specific service (SupplementsService)
 * - Contains all the API endpoints related to supplements
 * - Uses the generic HTTP client (like injecting HttpClient in Angular)
 *
 * ARCHITECTURE:
 * - This layer knows about Open Food Facts API structure
 * - Returns raw API response types
 * - The mapper layer (next file) will convert these to app types
 */

// Base URL for Open Food Facts API
const BASE_URL = 'https://world.openfoodfacts.org';

/**
 * Search for supplements
 *
 * @param query - Search term (e.g., "protein", "vitamin c")
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of results per page
 * @returns Promise with search results from Open Food Facts API
 *
 * ANGULAR EQUIVALENT:
 * searchSupplements(query: string): Observable<SearchResponse> {
 *   return this.http.get<SearchResponse>(url);
 * }
 */
export async function searchSupplements(
  query: string,
  page: number = 1,
  pageSize: number = 24
): Promise<OpenFoodFactsSearchResponse> {
  // Build query parameters
  // URLSearchParams is a browser API for building query strings
  // ANGULAR EQUIVALENT: HttpParams
  const params = new URLSearchParams({
    search_terms: query,
    page: page.toString(),
    page_size: pageSize.toString(),
    json: '1', // Request JSON response
    // Filter to supplements category to get more relevant results
    tagtype_0: 'categories',
    tag_contains_0: 'contains',
    tag_0: 'supplements',
  });

  // Construct full URL
  const url = `${BASE_URL}/cgi/search.pl?${params.toString()}`;

  // Make the request using our generic client
  // Returns a Promise (unlike Angular's Observable)
  return get<OpenFoodFactsSearchResponse>(url);
}

/**
 * Get details for a single supplement by barcode
 *
 * @param barcode - Product barcode/ID
 * @returns Promise with product details
 *
 * EXAMPLE BARCODE: "737628064502" (a real supplement in the database)
 */
export async function getSupplementById(
  barcode: string
): Promise<OpenFoodFactsResponse> {
  // Open Food Facts uses barcode as the product ID
  const url = `${BASE_URL}/api/v2/product/${barcode}.json`;

  return get<OpenFoodFactsResponse>(url);
}

/**
 * Export all API functions as a single object (optional pattern)
 * Allows: import supplementsApi from '@/api/supplements'
 */
const supplementsApi = {
  searchSupplements,
  getSupplementById,
};

export default supplementsApi;

/**
 * USAGE EXAMPLE:
 *
 * // Option 1: Named imports (recommended)
 * import { searchSupplements, getSupplementById } from '@/api/supplements';
 *
 * const results = await searchSupplements('protein', 1, 24);
 * console.log(results.products); // Array of products
 *
 * const product = await getSupplementById('737628064502');
 * console.log(product.product?.product_name);
 *
 * // Option 2: Default import
 * import supplementsApi from '@/api/supplements';
 *
 * const results = await supplementsApi.searchSupplements('protein');
 *
 * // Error handling (ApiError from client.ts)
 * import { ApiError } from '@/api/client';
 *
 * try {
 *   const results = await searchSupplements('protein');
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.error(`Failed to search: ${error.message}`);
 *   }
 * }
 */
