import './AuthPage.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import AuthInput from '@/components/input/AuthInput';
import { validateEmail, validatePassword } from '@/lib/validators';

function Signup() {
  const DEBOUNCE_TIME = 600;

  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });

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

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [confirmationStatus, setConfirmationStatus] = useState({
    isMatch: false,
    confirmationError: '',
  });

  const handleNameChange = (e, type = 'firstName') => {
    // Set name state to either first or last name
    const inputValue = e.target.value;
    setName((prev) => ({
      ...prev,
      [type]: inputValue,
    }));
  };

  const handleEmailChange = debounce((e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    try {
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

    // On every change, check if new password matches the password confirmation value
    // This is for when the confirmation is already input and then user changes the password again
    const passwordsMatch = passwordConfirmation === inputValue;

    if (!passwordsMatch) {
      setConfirmationStatus({
        isMatch: false,
        confirmationError: 'Passwords do not match',
      });
    }

    try {
      // Check if new password is valid
      const validity = validatePassword(inputValue);
      setPasswordStatus({
        isValid: validity,
        errorMessage: '',
      });
    } catch (error) {
      // Set password status to invalid
      setPasswordStatus({
        isValid: false,
        errorMessage: error.message,
      });
    }
  }, DEBOUNCE_TIME);

  const handlePasswordConfirmationChange = debounce((e) => {
    const inputValue = e.target.value;
    setPasswordConfirmation(inputValue);

    // On every change, check if new password is equal to the confirmation
    const passwordsMatch = password === inputValue;

    if (passwordsMatch && passwordStatus.isValid) {
      // Set everything to valid states if password and confirmation match and are valid
      setConfirmationStatus({
        isMatch: true,
        confirmationError: '',
      });
    } else if (!passwordStatus.isValid) {
      // Set password confirmation status to invalid
      setConfirmationStatus({
        isMatch: false,
        confirmationError: 'Password is invalid',
      });
    } else {
      setConfirmationStatus({
        isMatch: false,
        confirmationError: 'Passwords do not match',
      });
    }
  }, DEBOUNCE_TIME);

  // Sets the form button disabled status
  const isButtonDisabled = !(
    name.firstName.length > 0 &&
    name.lastName.length > 0 &&
    emailStatus.isValid &&
    passwordStatus.isValid &&
    confirmationStatus.isMatch
  );

  return (
    <main className="auth-page" aria-labelledby="signup-page__title">
      <h1 id="signup-page__title" className="auth-page__title">
        Welcome to TimePieces
      </h1>
      <p className="auth-page__subtitle">
        By signing in, you agree to our <Link to={'#'}>User Agreement</Link> and{' '}
        <Link to={'#'}>Privacy Policy</Link>
      </p>

      <form action="" className="auth-page__form">
        <AuthInput
          id="signup_first-name"
          type="text"
          name="firstName"
          label="First Name"
          value={name.firstName}
          placeholder="John"
          handleChange={(e) => handleNameChange(e, 'firstName')}
          isValid={name.firstName.length > 0}
          minLength={1}
          maxLength={32}
          isRequired
        />

        <AuthInput
          id="signup_last-name"
          type="text"
          name="lastName"
          label="Last Name"
          value={name.lastName}
          placeholder="Appleseed"
          handleChange={(e) => handleNameChange(e, 'lastName')}
          isValid={name.lastName.length > 0}
          minLength={1}
          maxLength={32}
          isRequired
        />

        <AuthInput
          id="signup_email"
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
          id="signup_password"
          type="password"
          name="password"
          label="Password"
          value={password}
          handleChange={handlePasswordChange}
          isValid={passwordStatus.isValid}
          errorMessage={passwordStatus.errorMessage}
          isRequired
        />

        <AuthInput
          id="signup_password-confirmation"
          type="password"
          name="password_confirmation"
          label="Confirm Password"
          value={passwordConfirmation}
          handleChange={handlePasswordConfirmationChange}
          isValid={confirmationStatus.isMatch}
          errorMessage={confirmationStatus.confirmationError}
          isRequired
        />

        <button
          type="submit"
          className="auth-page__btn"
          disabled={isButtonDisabled}
        >
          Sign up
        </button>
      </form>

      <p className="auth-page__other">
        Already have an account?{' '}
        <Link to={'/account/login'}>Log in instead</Link>
      </p>
    </main>
  );
}
export default Signup;
