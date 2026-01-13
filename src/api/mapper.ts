import type { OpenFoodFactsProduct, OpenFoodFactsSearchResponse } from '../types/api';
import type { Supplement, SupplementSearchResults, NutritionalInfo, DietaryTags } from '../types/supplement';

/**
 * API Mapper - Converts API response types to app domain types
 *
 * ANGULAR COMPARISON:
 * - This is like a mapper service or utility
 * - In Angular, you might do this in the service with RxJS map operator:
 *   return this.http.get(url).pipe(map(response => this.mapToSupplement(response)));
 * - In React, we do it after the Promise resolves
 *
 * WHY SEPARATE MAPPERS?
 * - API types are messy (snake_case, optional everything, inconsistent structure)
 * - App types are clean (camelCase, typed properly, consistent)
 * - If API changes, you only update the mapper, not your entire app
 * - Makes your components independent of the external API structure
 */

/**
 * Parse ingredients from the API's string format to an array
 *
 * EXAMPLE INPUT: "Protein blend (whey, casein), vitamin C, magnesium"
 * EXAMPLE OUTPUT: ["Protein blend (whey, casein)", "vitamin C", "magnesium"]
 */
function parseIngredients(ingredientsText?: string): string[] {
  if (!ingredientsText) return [];

  // Split by comma, trim whitespace, filter empty strings
  return ingredientsText
    .split(',')
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 0);
}

/**
 * Parse categories from the API's string format to an array
 *
 * EXAMPLE INPUT: "Supplements, Vitamins, Health products"
 * EXAMPLE OUTPUT: ["Supplements", "Vitamins", "Health products"]
 */
function parseCategories(categoriesText?: string): string[] {
  if (!categoriesText) return [];

  return categoriesText
    .split(',')
    .map(category => category.trim())
    .filter(category => category.length > 0);
}

/**
 * Extract dietary tags from the product data
 * Open Food Facts doesn't always have these fields, so we make educated guesses
 */
function extractDietaryTags(product: OpenFoodFactsProduct): DietaryTags {
  // Check categories and ingredients for keywords
  const categories = product.categories?.toLowerCase() || '';
  const ingredients = product.ingredients_text?.toLowerCase() || '';

  return {
    vegan: categories.includes('vegan') || categories.includes('plant-based'),
    vegetarian: categories.includes('vegetarian') || categories.includes('vegan'),
    glutenFree: categories.includes('gluten-free') || categories.includes('gluten free'),
    organic: categories.includes('organic'),
  };
}

/**
 * Map nutritional data from API format to app format
 *
 * API FORMAT: { 'energy-kcal_100g': 350, proteins_100g: 25 }
 * APP FORMAT: { energyKcal: 350, proteins: 25 }
 */
function mapNutritionalInfo(nutriments?: OpenFoodFactsProduct['nutriments']): NutritionalInfo {
  if (!nutriments) {
    // Return empty nutritional info if none provided
    return {
      energyKcal: null,
      proteins: null,
      carbohydrates: null,
      sugars: null,
      fat: null,
      saturatedFat: null,
      fiber: null,
      sodium: null,
      salt: null,
    };
  }

  return {
    energyKcal: nutriments['energy-kcal_100g'] ?? null,
    proteins: nutriments.proteins_100g ?? null,
    carbohydrates: nutriments.carbohydrates_100g ?? null,
    sugars: nutriments.sugars_100g ?? null,
    fat: nutriments.fat_100g ?? null,
    saturatedFat: nutriments['saturated-fat_100g'] ?? null,
    fiber: nutriments.fiber_100g ?? null,
    sodium: nutriments.sodium_100g ?? null,
    salt: nutriments.salt_100g ?? null,
    // Note: vitamins and minerals would need more complex parsing
    // from the nutriments object (lots of dynamic keys)
  };
}

/**
 * Map a single OpenFoodFactsProduct to our app's Supplement type
 *
 * This is where the magic happens - converting messy API data to clean app data
 */
export function mapProductToSupplement(product: OpenFoodFactsProduct): Supplement {
  return {
    id: product.code,
    name: product.product_name || 'Unknown Product',
    brand: product.brands || null,
    description: product.generic_name || null,
    ingredients: parseIngredients(product.ingredients_text),
    categories: parseCategories(product.categories),
    imageUrl: product.image_url || null,
    nutritionalInfo: mapNutritionalInfo(product.nutriments),
    allergens: product.allergens_tags || [],
    additives: product.additives_tags || [],
    dietaryTags: extractDietaryTags(product),
    servingSize: null, // Open Food Facts doesn't have consistent serving size data
  };
}

/**
 * Map search response from API format to app format
 *
 * Converts the entire search results structure
 */
export function mapSearchResponse(
  response: OpenFoodFactsSearchResponse
): SupplementSearchResults {
  return {
    supplements: response.products.map(mapProductToSupplement),
    count: response.count,
    page: response.page,
    pageSize: response.page_size,
  };
}

/**
 * USAGE EXAMPLE:
 *
 * import { searchSupplements } from './supplements';
 * import { mapSearchResponse } from './mapper';
 *
 * // In a hook or component:
 * const apiResponse = await searchSupplements('protein');
 * const appData = mapSearchResponse(apiResponse);
 * // Now appData is type SupplementSearchResults with clean, typed data
 *
 * console.log(appData.supplements[0].name); // camelCase, guaranteed to exist
 * console.log(appData.supplements[0].nutritionalInfo.proteins); // Clean structure
 */
