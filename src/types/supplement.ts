// Core Supplement model for our app
export interface Supplement {
  id: string;                          // unique identifier (barcode)
  name: string;                        // product name
  brand: string | null;                // manufacturer/brand
  description: string | null;          // full product description
  ingredients: string[];               // list of ingredients
  categories: string[];                // product categories
  imageUrl: string | null;             // product image
  nutritionalInfo: NutritionalInfo;    // nutrients per 100g/100ml
  allergens: string[];                 // allergen warnings
  additives: string[];                 // additive codes (e.g., E330)
  dietaryTags: DietaryTags;            // vegan, vegetarian, etc.
  servingSize: string | null;          // e.g., "1 capsule (500mg)"
}

export interface NutritionalInfo {
  energyKcal: number | null;           // calories
  proteins: number | null;             // grams
  carbohydrates: number | null;        // grams
  sugars: number | null;               // grams
  fat: number | null;                  // grams
  saturatedFat: number | null;         // grams
  fiber: number | null;                // grams
  sodium: number | null;               // grams
  salt: number | null;                 // grams
  vitamins?: Record<string, number>;   // e.g., { "vitamin-c": 80 }
  minerals?: Record<string, number>;   // e.g., { "calcium": 120 }
}

export interface DietaryTags {
  vegan: boolean;
  vegetarian: boolean;
  glutenFree: boolean;
  organic: boolean;
}

// Search results wrapper
export interface SupplementSearchResults {
  supplements: Supplement[];
  count: number;                       // total results
  page: number;                        // current page
  pageSize: number;                    // results per page
}
