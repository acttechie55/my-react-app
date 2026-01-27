# Last Chat Session - January 27, 2026

## Context
User is a 10-year Angular developer learning React through this project. All explanations should be elementary and include Angular comparisons.

## What We Completed Today

### 1. Fixed API Issues
Two bugs were preventing the app from fetching data:

**Bug 1: Content-Type Header on GET Requests**
```typescript
// BEFORE (broken) - GET requests don't have bodies
fetch(url, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' } // Wrong!
});

// AFTER (fixed) - No Content-Type for GET
fetch(url, { method: 'GET' });
```
- Angular's HttpClient handles this automatically
- Manual fetch requires care - only add Content-Type for POST/PUT with body

**Bug 2: Category Filter Timeout**
- The supplements category filter was causing server-side timeouts
- Removed filter; app now searches all products (still works for supplements)

### 2. Header Component (`src/components/Header.tsx`)
Styled navigation header with:
- Logo that links home
- Home and Favorites nav links
- Active link highlighting (blue background)
- Favorites badge showing count (red pill)
- Sticky positioning

**New React Concepts:**
```tsx
// Declarative navigation (like routerLink)
<Link to="/favorites">Favorites</Link>

// Get current URL (like Router.url)
const location = useLocation();
const isActive = location.pathname === '/favorites';
```

### 3. AppLayout (`src/layout/AppLayout.tsx`)
Layout wrapper pattern:
```tsx
function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}
```
- `<Outlet />` is React Router's `<router-outlet>`
- All pages render inside the layout automatically

### 4. Router with Nested Routes (`src/routes/router.tsx`)
```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,  // Parent layout
    children: [
      { index: true, element: <SearchPage /> },      // "/"
      { path: 'search', element: <SearchResultsPage /> },
      { path: 'supplement/:id', element: <SupplementDetailPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
```
- `index: true` = default route (like Angular's `pathMatch: 'full'`)
- Children render inside parent's `<Outlet />`

## Key Concepts Comparison

| React | Angular |
|-------|---------|
| `<Link to="/path">` | `routerLink="/path"` |
| `useLocation()` | `Router.url` |
| `useNavigate()` | `Router.navigate()` |
| `<Outlet />` | `<router-outlet>` |
| `index: true` | `pathMatch: 'full'` |
| Nested `children` routes | Child routes array |

## Files Changed Today
- `src/api/client.ts` - Removed Content-Type from GET
- `src/api/supplements.ts` - Removed category filter
- `src/components/Header.tsx` - Tailwind styling, navigation
- `src/layout/AppLayout.tsx` - Layout with Header + Outlet
- `src/routes/router.tsx` - Nested routes pattern

## Next Session - Where to Pick Up

### Immediate Next Steps:
1. **Wire up SupplementDetailPage** with `useSupplementDetail` hook
2. **Wire up FavoritesPage** with `useFavorites` hook

### Current Project State:
- ✅ API working with Open Food Facts
- ✅ SearchPage fully wired
- ✅ SearchResultsPage fully wired
- ✅ Header with navigation
- ✅ Layout with nested routes
- ⏳ SupplementDetailPage needs wiring
- ⏳ FavoritesPage needs wiring

## Important User Preferences
- User is experienced Angular developer (10 years)
- Learning React through this project
- Wants **elementary explanations** with **Angular comparisons**
- Appreciates detailed comments in code
