import './Overlay.scss';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Overlay(props) {
  const { children, hideChildren } = props;

  useEffect(() => {
    function escKeyListener(e) {
      if (e.key === 'Escape') {
        hideChildren();
      }
    }

    window.addEventListener('keydown', escKeyListener);

    return () => window.removeEventListener('keydown', escKeyListener);
  }, [hideChildren]);

  const handleClick = (e) => {
    e.preventDefault();

    // Only run event when actual overlay is clicked
    if (e.target === e.currentTarget) {
      hideChildren();
    }
  };

  return (
    <div className="overlay" onClickCapture={handleClick}>
      {children}
    </div>
  );
}

Overlay.propTypes = {
  children: PropTypes.element.isRequired,
  hideChildren: PropTypes.func.isRequired,
};

export default Overlay;
