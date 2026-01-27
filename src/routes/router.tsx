import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import SearchPage from '../pages/SearchPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import SupplementDetailPage from '../pages/SupplementDetailPage';
import FavoritesPage from '../pages/FavoritesPage';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * Router Configuration
 *
 * ANGULAR COMPARISON:
 * - This is like your app-routing.module.ts
 * - Uses nested routes for layout (like Angular's parent routes with children)
 *
 * NESTED ROUTES PATTERN:
 * - AppLayout is the parent route (path: "/")
 * - All other routes are children that render inside AppLayout's <Outlet />
 * - This ensures the Header appears on all pages automatically
 *
 * ROUTE STRUCTURE:
 * AppLayout (always rendered)
 *   ├── SearchPage (path: "/")
 *   ├── SearchResultsPage (path: "/search")
 *   ├── SupplementDetailPage (path: "/supplement/:id")
 *   ├── FavoritesPage (path: "/favorites")
 *   └── NotFoundPage (path: "*")
 */
export const router = createBrowserRouter([
  {
    // Parent route - AppLayout wraps all pages
    path: '/',
    element: <AppLayout />,
    // Child routes render inside AppLayout's <Outlet />
    children: [
      {
        // Home page - matches exactly "/"
        index: true, // This is the default child route (like pathMatch: 'full' in Angular)
        element: <SearchPage />,
      },
      {
        path: 'search',
        element: <SearchResultsPage />,
      },
      {
        path: 'supplement/:id',
        element: <SupplementDetailPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        // Catch-all for 404
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
