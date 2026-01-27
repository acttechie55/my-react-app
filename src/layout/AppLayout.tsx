import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

/**
 * AppLayout Component
 *
 * The main layout wrapper that provides consistent structure across all pages.
 * Contains the Header and renders child routes via Outlet.
 *
 * ANGULAR COMPARISON:
 * - This is like your AppComponent with a <router-outlet>
 * - In Angular: <app-header></app-header> <router-outlet></router-outlet>
 * - In React: <Header /> <Outlet />
 *
 * REACT ROUTER OUTLET:
 * - <Outlet /> renders the matched child route's component
 * - It's React Router's equivalent of Angular's <router-outlet>
 * - The parent layout stays mounted while child routes swap in/out
 *
 * LAYOUT BENEFITS:
 * - Header appears on all pages without adding it to each page
 * - Shared state (like favorites count in header) stays consistent
 * - Easy to add footer, sidebar, etc. later
 */
function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Global Header - always visible */}
      <Header />

      {/* Main Content Area - child routes render here */}
      <main className="flex-1">
        {/*
          OUTLET:
          - This is where the matched child route component renders
          - When URL is "/" → SearchPage renders here
          - When URL is "/search?q=vitamin" → SearchResultsPage renders here
          - When URL is "/favorites" → FavoritesPage renders here

          ANGULAR EQUIVALENT:
          <router-outlet></router-outlet>
        */}
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
