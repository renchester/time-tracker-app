import './Redirects.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectToHome() {
  const navigate = useNavigate();

  // Redirect to Home if user is already logged in
  useEffect(() => {
    let timeoutId = setTimeout(() => navigate('/'), 1000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <p role="alert" className="redirect">
      Already logged in, redirecting to home page...
    </p>
  );
}

export default RedirectToHome;
