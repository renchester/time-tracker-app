import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { persistToStorage, removeFromStorage } from '@/lib/localStorage';

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState(null);

  // Persists user 'logged in' status when currentUser is found in local storage
  const initializeAuth = () => {
    if (typeof window === 'undefined') return;

    const storedUser = window.localStorage.getItem('currentUser');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  const login = (loginUser) => {
    setUser(loginUser);
    persistToStorage('currentUser', loginUser);
  };

  const logout = () => {
    removeFromStorage('currentUser');
    setUser(null);
  };

  // Initialize user on first app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContext;
