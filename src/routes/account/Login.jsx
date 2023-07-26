import './AuthPage.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { validateEmail, validatePassword } from '@/lib/validators';
import AuthInput from '@/components/input/AuthInput';
import useAuth from '@/hooks/useAuth';
import useSnackbar from '@/hooks/useSnackbar';
import { fetchFromStorage } from '@/lib/localStorage';
import RedirectToHome from '@/components/redirects/RedirectToHome';

function Login() {
  const DEBOUNCE_TIME = 600;
  const { user, login } = useAuth();
  const { addAlert } = useSnackbar();

  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState({
    isValid: false,
    errorMessage: '',
  });

  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState({
    isValid: false,
    errorMessage: '',
  });

  const handleEmailChange = debounce((e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    try {
      // If valid, sets a valid icon to display in email input
      // Otherwise, an error message and invalid icon will be displayed
      const validity = validateEmail(inputValue);
      setEmailStatus({
        isValid: validity,
        errorMessage: '',
      });
    } catch (error) {
      setEmailStatus({
        isValid: false,
        errorMessage: error.message,
      });
    }
  }, DEBOUNCE_TIME);

  const handlePasswordChange = debounce((e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    try {
      // If valid, sets a valid icon to display in password input
      // Otherwise, an error message and invalid icon will be displayed
      const validity = validatePassword(inputValue);
      setPasswordStatus({
        isValid: validity,
        errorMessage: '',
      });
    } catch (error) {
      setPasswordStatus({
        isValid: false,
        errorMessage: error.message,
      });
    }
  }, DEBOUNCE_TIME);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const users = fetchFromStorage('users');

      if (!users) throw new Error('Unable to log in');

      const targetUser = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (targetUser) {
        // Display success message in a snackbar
        addAlert({
          message: 'Successfully logged in, redirecting to home page',
          status: 'success',
        });

        login(targetUser);
      } else throw new Error('Unable to find user');
    } catch (error) {
      // Display error message in a snackbar
      addAlert({
        message: error.message,
        status: 'error',
      });
    }
  };

  const isButtonDisabled = !(emailStatus.isValid && passwordStatus.isValid);

  if (user) return <RedirectToHome />;

  return (
    <main className="auth-page" aria-labelledby="login-page__title">
      <h1 className="auth-page__title" id="login-page__title">
        Welcome back to TimePieces
      </h1>
      <p className="auth-page__subtitle">
        Enter your email and password to sign in
      </p>

      <form action="" className="auth-page__form" onSubmit={handleSubmit}>
        <AuthInput
          id="login_email"
          type="email"
          name="email"
          label="Email"
          value={email}
          placeholder="johnapple@one.com"
          handleChange={handleEmailChange}
          isValid={emailStatus.isValid}
          errorMessage={emailStatus.errorMessage}
          isRequired
        />
        <AuthInput
          id="login_password"
          type="password"
          name="password"
          label="Password"
          value={password}
          handleChange={handlePasswordChange}
          isValid={passwordStatus.isValid}
          errorMessage={passwordStatus.errorMessage}
          isRequired
        />

        <button
          type="submit"
          className="auth-page__btn"
          disabled={isButtonDisabled}
        >
          Log in
        </button>
      </form>

      <p className="auth-page__other">
        Don&apos;t have an account yet?{' '}
        <Link to={'/account/signup'}>Sign up now</Link>
      </p>
    </main>
  );
}

export default Login;
