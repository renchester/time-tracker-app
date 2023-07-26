import './AuthPage.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { validateEmail, validatePassword } from '@/lib/validators';
import AuthInput from '@/components/input/AuthInput';

function Login() {
  const DEBOUNCE_TIME = 600;

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

  return (
    <main className="auth-page" aria-labelledby="login-page__title">
      <h1 className="auth-page__title" id="login-page__title">
        Welcome back to TimePieces
      </h1>
      <p className="auth-page__subtitle">
        Enter your email and password to sign in
      </p>

      <form action="" className="auth-page__form">
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

        <button type="submit" className="auth-page__btn">
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
