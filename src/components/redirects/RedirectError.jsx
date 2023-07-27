import './Redirects.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectError() {
  const navigate = useNavigate();

  // Redirect to Home if user is already logged in
  useEffect(() => {
    let timeoutId = setTimeout(() => navigate('/'), 2000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <p role="alert" className="redirect">
      Uh oh! An error has occurred. Redirecting you to home page...
    </p>
  );
}

export default RedirectError;
