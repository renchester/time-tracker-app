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

  return <div className="overlay">{children}</div>;
}

Overlay.propTypes = {
  children: PropTypes.element.isRequired,
  hideChildren: PropTypes.func,
};

export default Overlay;
