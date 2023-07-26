import './Redirects.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectToLogin() {
  const navigate = useNavigate();

  // Redirect to login page if user is not logged in
  useEffect(() => {
    let timeoutId = setTimeout(() => navigate('/account/login'), 1000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <p role="alert" className="redirect">
      This is a protected page, redirecting you to the Login Page...
    </p>
  );
}

export default RedirectToLogin;
