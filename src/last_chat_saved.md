# Last Chat Session - January 19, 2026

## Context
User is a 10-year Angular developer learning React through this project. All explanations should be elementary and include Angular comparisons.

## What We Completed Today

### 1. API Service Layer (`src/api/`)
Built a complete 3-layer API architecture:

- **`client.ts`** - Generic HTTP fetch wrapper
  - Similar to Angular's HttpClient
  - Custom ApiError class for error handling
  - `get()` and `post()` functions returning Promises

- **`supplements.ts`** - Open Food Facts API endpoints
  - `searchSupplements(query, page, pageSize)` - Search supplements
  - `getSupplementById(barcode)` - Get single supplement
  - Similar to Angular domain-specific services

- **`mapper.ts`** - API response → App type converters
  - `mapProductToSupplement()` - Converts single product
  - `mapSearchResponse()` - Converts search results
  - Cleans messy API data (snake_case) to clean app types (camelCase)

- **`index.ts`** - Barrel exports for clean imports

### 2. Custom React Hooks (`src/hooks/`)
Built 5 custom hooks with composition pattern:

- **`useLocalStorage.ts`** - Foundation hook
  - Generic localStorage state management
  - Returns tuple: `[value, setValue]`
  - Like Angular service wrapping localStorage

- **`useFavorites.ts`** - Domain-specific hook
  - Uses useLocalStorage internally
  - Returns object: `{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, clearFavorites, favoritesCount }`
  - Prevents duplicates, manages array immutably

- **`useRecentSearches.ts`** - Domain-specific hook
  - Uses useLocalStorage internally
  - Tracks last 10 searches, most recent first
  - Deduplicates and moves repeated searches to top

- **`useSupplementSearch.ts`** - API hook with useEffect
  - `useSupplementSearch(query, page)` - Auto-fetches when query/page changes
  - Returns: `{ data, loading, error }`
  - Uses useEffect with dependencies array `[query, page]`
  - Standard loading/error/data pattern

- **`useSupplementDetail.ts`** - API hook with useEffect
  - `useSupplementDetail(supplementId)` - Fetches single supplement
  - Returns: `{ supplement, loading, error }`
  - Uses useEffect with dependencies array `[supplementId]`

### 3. Documentation
- Updated README.md with architecture section
- Updated project structure
- Created session.md with learning summary
- Committed all changes with comprehensive commit message

## Key React Concepts Taught

### 1. useState
```typescript
const [value, setValue] = useState(initialValue);
```
- Reactive state that triggers re-renders when changed
- Angular equivalent: class property with change detection
- Always create new objects/arrays (immutability)

### 2. useEffect
```typescript
useEffect(() => {
  // Effect code runs after render
  fetchData();

  return () => {
    // Cleanup (optional)
  };
}, [dependency1, dependency2]); // Dependencies array
```
- Side effects hook (API calls, subscriptions, etc.)
- Angular equivalent: ngOnInit + ngOnChanges + ngOnDestroy combined
- **Dependencies array critical:**
  - `[]` = run once on mount (like ngOnInit)
  - `[query]` = run when query changes (like ngOnChanges watching @Input)
  - No array = run after every render (usually a mistake!)
- Can't make useEffect itself async, must define async function inside

### 3. Immutability
```typescript
// ❌ DON'T - mutates existing array
array.push(item);
setArray(array); // React won't detect change!

// ✅ DO - creates new array
setArray([...array, item]); // React detects new reference
```
- React uses reference comparison to detect changes
- Angular uses Zone.js to detect mutations
- Always use: `[...array]`, `{ ...object }`, `.map()`, `.filter()`

### 4. Hook Composition
```typescript
// Low-level hook
function useLocalStorage(key, initial) { ... }

// High-level hook uses low-level hook
function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  // Add favorites-specific logic
}
```
- Like Angular services injecting other services
- Build complex functionality from simple building blocks
- Promotes reusability and separation of concerns

### 5. Tuple vs Object Returns
```typescript
// Tuple - flexible naming
const [user, setUser] = useLocalStorage('user', null);
const [theme, setTheme] = useLocalStorage('theme', 'dark');

// Object - clear named methods
const { addFavorite, removeFavorite, isFavorite } = useFavorites();
```
- Tuple: Generic utilities where naming flexibility helps
- Object: Domain-specific hooks with clear method names

## Architecture Patterns Implemented

### Layered API Architecture
```
Component
  ↓ calls
Hook (useSupplementSearch)
  ↓ uses useEffect
  ↓ calls
API Service (searchSupplements)
  ↓ uses
API Client (fetch wrapper)
  ↓ HTTP request
  ↓ receives response
Mapper (mapSearchResponse)
  ↓ converts API → App types
  ↓ returns to
Hook (updates state)
  ↓ triggers re-render
Component (displays new data)
```

### Hook Composition
```
useLocalStorage (generic)
    ↓
    ├─ useFavorites (domain-specific)
    └─ useRecentSearches (domain-specific)

useState + useEffect
    ↓
    ├─ useSupplementSearch (API hook)
    └─ useSupplementDetail (API hook)
```

## Next Session - Where to Pick Up

### Immediate Next Steps:
1. **Add Tailwind CSS** to the project for styling
2. **Wire up pages** with the hooks we created:
   - SearchPage → useRecentSearches
   - SearchResultsPage → useSupplementSearch
   - SupplementDetailPage → useSupplementDetail
   - FavoritesPage → useFavorites
3. **See the app working** with real data from API
4. **Style components** with Tailwind

### Files Ready to Use:
- All 5 hooks are complete and ready in `src/hooks/`
- All API services are complete in `src/api/`
- All have extensive comments with Angular comparisons
- All have usage examples at the bottom of each file

### Current Project State:
- ✅ 16 presentational components (not yet wired up)
- ✅ 5 custom hooks (ready to use)
- ✅ Complete API layer (ready to use)
- ✅ Type definitions (complete)
- ⏳ Pages need to be implemented (use hooks + components)
- ⏳ Styling with Tailwind CSS (not yet added)

## How to Resume

When starting the next session:
1. Read this file to get context
2. User will likely want to add Tailwind CSS next
3. Then wire up one page at a time (start with SearchPage or SearchResultsPage)
4. Continue explaining concepts in Angular terms
5. Be very elementary in explanations - user is learning React patterns

## Important User Preferences
- User is experienced Angular developer (10 years)
- Learning React through this project
- Wants **elementary explanations** with **Angular comparisons**
- Appreciates detailed comments in code
- Wants to understand "why" not just "how"
- Values composition patterns and clean architecture

## Git Status
- Last commit: "Add API service layer and custom React hooks"
- Branch: main
- Status: Clean working tree, 1 commit ahead of origin
- Ready to push to remote when user is ready
