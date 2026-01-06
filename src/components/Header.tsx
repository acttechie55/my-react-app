import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  backTo?: string;
}

function Header({ title = 'Supplement Explorer', showBackButton = false, backTo }: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        {showBackButton && (
          <button onClick={handleBack} className="back-button" aria-label="Go back">
            ← Back
          </button>
        )}
        <h1 className="header-title">{title}</h1>
        <nav className="header-nav">
          <button onClick={() => navigate('/favorites')} className="nav-link">
            ❤️ Favorites
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
