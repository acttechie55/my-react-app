/**
 * API Client - Generic HTTP request wrapper
 *
 * ANGULAR COMPARISON:
 * - This is similar to Angular's HttpClient service
 * - In Angular: this.http.get<T>(url) returns Observable<T>
 * - In React: apiClient.get<T>(url) returns Promise<T>
 *
 * WHY A WRAPPER?
 * - Centralized error handling
 * - Consistent request configuration
 * - Easy to add interceptors (auth, logging, etc.) later
 * - Can swap fetch for axios or other libraries without changing calling code
 */

/**
 * Custom error class for API errors
 * Includes the HTTP status code for better error handling
 */
export class ApiError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
  }
}

/**
 * Generic GET request
 *
 * @param url - The full URL to fetch from
 * @param options - Optional fetch options (headers, etc.)
 * @returns Promise with typed response data
 * @throws ApiError if the request fails
 */
export async function get<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    // Make the fetch request
    // Note: No Content-Type header for GET requests (no body to describe)
    const response = await fetch(url, {
      method: 'GET',
      ...options, // Merge any other options
    });

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      // Response failed, throw an error
      throw new ApiError(
        `HTTP error! ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    // Parse JSON response
    // IMPORTANT: This is async! Unlike Angular's HttpClient which returns Observable,
    // we need to await the JSON parsing
    const data = await response.json();

    return data as T;
  } catch (error) {
    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Network errors, JSON parse errors, etc.
    // Wrap them in ApiError for consistent error handling
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0,
      'Network Error'
    );
  }
}

/**
 * Generic POST request (for future use)
 * Included for completeness, though your app might not need it yet
 */
export async function post<T>(
  url: string,
  body: unknown,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0,
      'Network Error'
    );
  }
}

/**
 * Export as a single object (optional pattern)
 * You can use either:
 * - import { get } from './client'  (named import)
 * - import apiClient from './client' (default import)
 */
const apiClient = {
  get,
  post,
};

export default apiClient;

/**
 * USAGE EXAMPLE:
 *
 * // Option 1: Named imports
 * import { get } from '@/api/client';
 * const data = await get<MyType>('https://api.example.com/data');
 *
 * // Option 2: Default import
 * import apiClient from '@/api/client';
 * const data = await apiClient.get<MyType>('https://api.example.com/data');
 *
 * // Error handling
 * try {
 *   const data = await get<MyType>(url);
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.error(`API Error: ${error.status} - ${error.message}`);
 *   }
 * }
 */
