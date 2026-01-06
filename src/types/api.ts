// Open Food Facts API response types

export interface OpenFoodFactsProduct {
  code: string;                        // barcode
  product_name?: string;
  brands?: string;
  generic_name?: string;
  ingredients_text?: string;
  categories?: string;
  image_url?: string;
  nutriments?: {
    'energy-kcal_100g'?: number;
    proteins_100g?: number;
    carbohydrates_100g?: number;
    sugars_100g?: number;
    fat_100g?: number;
    'saturated-fat_100g'?: number;
    fiber_100g?: number;
    sodium_100g?: number;
    salt_100g?: number;
    [key: string]: number | undefined;
  };
  allergens_tags?: string[];
  additives_tags?: string[];
  vitamins_tags?: string[];
  ingredients?: Array<{ text: string }>;
}

export interface OpenFoodFactsResponse {
  status: number;
  product?: OpenFoodFactsProduct;
}

export interface OpenFoodFactsSearchResponse {
  count: number;
  page: number;
  page_size: number;
  products: OpenFoodFactsProduct[];
}
