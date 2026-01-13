/**
 * API Module - Central exports for all API functionality
 *
 * This allows clean imports like:
 * import { searchSupplements, ApiError } from '@/api'
 */

// Client
export { get, post, ApiError } from './client';

// Supplements API
export { searchSupplements, getSupplementById } from './supplements';

// Mappers
export { mapProductToSupplement, mapSearchResponse } from './mapper';

// Default export with everything
export { default as apiClient } from './client';
export { default as supplementsApi } from './supplements';
