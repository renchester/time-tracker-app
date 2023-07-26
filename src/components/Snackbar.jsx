import './Snackbar.scss';
import PropTypes from 'prop-types';

const successIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="snackbar__icon"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const failIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="snackbar__icon"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const infoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="snackbar__icon"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

function Snackbar(props) {
  const { alert } = props;

  return (
    <div role="alert" className="snackbar" data-status={alert.status}>
      {alert.status === 'error' && failIcon}
      {alert.status === 'success' && successIcon}
      {alert.status === 'neutral' && infoIcon}
      <p className="snackbar__message">{alert.message}</p>
    </div>
  );
}

Snackbar.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.oneOf(['success', 'error', 'neutral']),
  }).isRequired,
};

export default Snackbar;
