# Supplement Explorer

A React + TypeScript web application for exploring supplements, vitamins, and ingredients. Search products, view detailed nutritional information, and save your favorites.

## Overview

This app provides a clean interface to search and explore supplement products using the Open Food Facts API. Users can search for supplements, view detailed ingredient and nutritional information, and maintain a favorites list.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Open Food Facts API** - Product data source

## Features (MVP)

### Core User Flows
- **Search**: Search for supplements by name, ingredient, or category
- **Browse Results**: View paginated search results with product cards
- **View Details**: See comprehensive product information including:
  - Ingredients list with allergen highlighting
  - Nutritional information (macros, vitamins, minerals)
  - Dietary tags (vegan, vegetarian, gluten-free, organic)
  - Medical disclaimer banner
- **Favorites**: Save and manage favorite supplements (localStorage)
- **Recent Searches**: Quick access to recent search terms

### Routes

```
/                    - Search page (home)
/search?q={query}    - Search results
/supplement/:id      - Product detail page
/favorites           - Saved favorites
*                    - 404 not found
```

## Project Structure

```
src/
├── api/                     # API service layer
│   ├── client.ts            # Generic HTTP fetch wrapper
│   ├── supplements.ts       # Open Food Facts API endpoints
│   ├── mapper.ts            # API response → App type converters
│   └── index.ts             # Barrel exports
│
├── hooks/                   # Custom React hooks
│   ├── useLocalStorage.ts   # Generic localStorage state management
│   ├── useFavorites.ts      # Favorites management (localStorage)
│   ├── useRecentSearches.ts # Search history tracking (localStorage)
│   ├── useSupplementSearch.ts # Search API with loading/error states
│   ├── useSupplementDetail.ts # Single supplement fetch
│   └── index.ts             # Barrel exports
│
├── components/              # UI components (presentational)
│   ├── SearchBar.tsx
│   ├── SupplementCard.tsx
│   ├── SupplementGrid.tsx
│   ├── SkeletonSupplementCard.tsx
│   ├── SkeletonSupplementDetail.tsx
│   ├── Pagination.tsx
│   ├── DisclaimerBanner.tsx
│   ├── RecentSearches.tsx
│   ├── EmptyState.tsx
│   ├── IngredientsList.tsx
│   ├── NutritionalInfoTable.tsx
│   ├── DietaryTags.tsx
│   ├── FavoriteButton.tsx
│   ├── ErrorMessage.tsx
│   ├── Header.tsx
│   └── PageContainer.tsx
│
├── pages/                   # Route pages (containers)
│   ├── SearchPage.tsx
│   ├── SearchResultsPage.tsx
│   ├── SupplementDetailPage.tsx
│   ├── FavoritesPage.tsx
│   └── NotFoundPage.tsx
│
├── types/                   # TypeScript definitions
│   ├── supplement.ts        # App data models
│   └── api.ts               # API response types
│
├── layout/                  # Layout components
│   └── AppLayout.tsx
│
└── routes/                  # Router configuration
    └── router.tsx
```

## Architecture

### Custom Hooks
The app uses custom React hooks for state management and data fetching. Hooks are composable - complex hooks build on simpler ones:

**Storage Hooks:**
- `useLocalStorage` - Base hook for localStorage persistence with reactive state
- `useFavorites` - Builds on useLocalStorage to manage favorites (add, remove, toggle, check)
- `useRecentSearches` - Builds on useLocalStorage to track search history (max 10, most recent first)

**API Hooks:**
- `useSupplementSearch(query, page)` - Search supplements with loading/error states, auto-refetches when query/page changes
- `useSupplementDetail(id)` - Fetch single supplement details with loading/error states

All hooks return clean, typed data and handle edge cases internally.

### API Service Layer
Three-layer architecture for API integration:

1. **Client Layer** (`api/client.ts`) - Generic fetch wrapper with error handling
2. **Domain Layer** (`api/supplements.ts`) - Supplement-specific API endpoints
3. **Mapper Layer** (`api/mapper.ts`) - Converts API response types to app domain types

This separation allows easy API swapping and keeps components independent of external API structure.

## Data Model

### Supplement Interface
```typescript
interface Supplement {
  id: string;                     // Barcode
  name: string;
  brand: string | null;
  description: string | null;
  ingredients: string[];
  categories: string[];
  imageUrl: string | null;
  nutritionalInfo: NutritionalInfo;
  allergens: string[];
  additives: string[];
  dietaryTags: DietaryTags;
  servingSize: string | null;
}
```

## API Integration

**Primary**: Open Food Facts API
- Free, open-source, no auth required
- CORS-friendly
- Rate limits: 100 req/min (product queries), 10 req/min (search)

**Endpoints Used**:
- Search: `GET https://world.openfoodfacts.org/cgi/search.pl`
- Product: `GET https://world.openfoodfacts.org/api/v2/product/{barcode}.json`

**Backup Strategy**: Mock Service Worker (MSW) with static JSON if API proves unreliable

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development Server
The app runs at `http://localhost:5173` (default Vite port)

## Current Status

### ✅ Completed
- Project setup (React + TypeScript + Vite)
- React Router configuration with 5 routes
- Component library (16 presentational components)
- TypeScript type definitions (data models + API response types)
- **API service layer** (client, supplements endpoints, response mappers)
- **Custom React hooks**:
  - `useLocalStorage` - Generic localStorage state management
  - `useFavorites` - Favorites management with localStorage persistence
  - `useRecentSearches` - Recent search tracking with localStorage
  - `useSupplementSearch` - Search API with loading/error states
  - `useSupplementDetail` - Single supplement fetch with loading/error states

### 🚧 Next Up
- Add Tailwind CSS for styling
- Wire up pages with hooks and data fetching
- Implement responsive design
- Connect components to hooks (SearchBar, SupplementCard, etc.)

### 📋 Todo
- Style components with Tailwind
- Implement page logic (SearchPage, SearchResultsPage, etc.)
- Add loading skeleton states to pages
- Error boundary implementation
- Accessibility improvements (ARIA labels, keyboard nav)
- Testing (unit tests for hooks, integration tests for pages)

## Design Principles

- **API-Driven Architecture**: Abstracted API layer allows easy swapping of data sources
- **Type Safety**: Full TypeScript coverage for compile-time safety
- **Component Separation**: Presentational components receive data via props
- **Progressive Enhancement**: Works without JavaScript for core content
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## License

MIT

## Acknowledgments

- Product data provided by [Open Food Facts](https://world.openfoodfacts.org/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)
