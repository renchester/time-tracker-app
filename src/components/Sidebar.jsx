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
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to={`/projects`} className="nav__link">
              Projects
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to={`/workspace`} className="nav__link">
              Company
            </NavLink>
          </li>
          <li className="nav__item">
            {user ? (
              <button type="button" onClick={logout} className="nav__link">
                Log out
              </button>
            ) : (
              <NavLink to={'/account/login'} className="nav__link">
                Sign in
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Sidebar;
