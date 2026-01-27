import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../hooks';

/**
 * Header Component
 *
 * Global navigation header that appears on all pages.
 * Shows app title, navigation links, and favorites count.
 *
 * ANGULAR COMPARISON:
 * - Like a shared HeaderComponent in a SharedModule
 * - Uses Link instead of routerLink for navigation
 * - useLocation is like injecting Router and checking router.url
 *
 * REACT ROUTER NAVIGATION:
 * - <Link to="/path"> - Declarative navigation (like routerLink)
 * - useNavigate() - Programmatic navigation (like router.navigate())
 * - useLocation() - Get current URL info (like router.url)
 */
function Header() {
  // Get current location to highlight active nav link
  const location = useLocation();

  // Get favorites count to show badge
  const { favoritesCount } = useFavorites();

  // Helper to check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Shared classes for nav links
  const navLinkClasses = (path: string) => `
    relative
    px-3 py-2
    text-sm font-medium
    rounded-lg
    transition-colors
    ${isActive(path)
      ? 'text-blue-600 bg-blue-50'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }
  `;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / App Title - clicking goes home */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Supplement Explorer
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2">
            {/* Home Link */}
            <Link to="/" className={navLinkClasses('/')}>
              Home
            </Link>

            {/* Favorites Link with Badge */}
            <Link to="/favorites" className={navLinkClasses('/favorites')}>
              <span className="flex items-center gap-1">
                Favorites
                {/* Badge showing count - only show if > 0 */}
                {favoritesCount > 0 && (
                  <span className="
                    inline-flex items-center justify-center
                    px-2 py-0.5
                    text-xs font-medium
                    text-white
                    bg-red-500
                    rounded-full
                    min-w-[1.25rem]
                  ">
                    {favoritesCount}
                  </span>
                )}
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
