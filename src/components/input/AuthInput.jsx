import './Auth-Input.scss';
import PropTypes from 'prop-types';

function AuthInput(props) {
  const {
    id,
    type,
    name,
    label,
    value,
    placeholder,
    handleChange,
    isValid,
    errorMessage,
    minLength,
    maxLength,
    isRequired,
  } = props;

  return (
    <div className="auth-inp">
      <label htmlFor={id} className="auth-inp__label">
        {label} {isRequired && <abbr title="required">*</abbr>}
      </label>

      <div className="auth-inp__wrapper">
        <input
          id={id}
          type={type}
          name={name}
          className="auth-inp__input"
          onChange={handleChange}
          placeholder={placeholder}
          required={isRequired}
          minLength={minLength}
          maxLength={maxLength}
        />
        {/* Display validation status as icons */}
        {value.length > 0 && isValid !== undefined && (
          <ValidationIcon label={label} isValid={isValid} />
        )}
      </div>

      {/* Display error messages, if there are any */}
      {errorMessage && !isValid && value.length > 0 && (
        <p className="auth-inp__error">{errorMessage}</p>
      )}
    </div>
  );
}

function ValidationIcon(props) {
  const { label, isValid } = props;

  return (
    <div
      className="auth-inp__icon-container"
      aria-label={`${label} is ${isValid ? 'valid' : 'invalid'}`}
    >
      {isValid ? (
        <svg
          className="auth-inp__icon valid"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg
          className="auth-inp__icon invalid"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )}
    </div>
  );
}

AuthInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  isRequired: PropTypes.bool,
};

AuthInput.defaultProps = {
  minLength: -1,
  maxLength: -1,
  isRequired: true,
};

ValidationIcon.propTypes = {
  isValid: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default AuthInput;
