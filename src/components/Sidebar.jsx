import './Sidebar.scss';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <header className="sidebar">
      <h1 className="sidebar__logo">
        <Link to={'/'}>
          <strong>Time</strong>Pieces
        </Link>
      </h1>

      <nav className="nav">
        <ul className="nav__links">
          <li className="nav__item">
            <NavLink to={`/`} className="nav__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="arcs"
                className="nav__icon"
              >
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
              </svg>
              <span>Home</span>
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to={`/projects`} className="nav__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="arcs"
                className="nav__icon"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>Projects</span>
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to={`/workspace`} className="nav__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="arcs"
                className="nav__icon"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Company</span>
            </NavLink>
          </li>
          <li className="nav__item">
            {user ? (
              <button type="button" onClick={logout} className="nav__link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="arcs"
                  className="nav__icon"
                >
                  <path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6" />
                </svg>

                <span>Log out</span>
              </button>
            ) : (
              <NavLink to={'/account/login'} className="nav__link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="arcs"
                  className="nav__icon"
                >
                  <path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3" />
                </svg>
                <span>Sign in</span>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Sidebar;
