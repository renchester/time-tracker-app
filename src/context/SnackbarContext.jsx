import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@/components/Snackbar';

const SnackbarContext = createContext(null);

export const SnackbarProvider = (props) => {
  const { children } = props;
  const [alerts, setAlerts] = useState([]);

  const AUTO_DISMISS = 3500;
  const activeAlertIds = alerts.join(',');

  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const snackbarTimer = setTimeout(
        () => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)),
        AUTO_DISMISS,
      );
      return () => clearTimeout(snackbarTimer);
    }
  }, [activeAlertIds]);

  const addAlert = useCallback(
    (content) => setAlerts((alerts) => [...alerts, content]),
    [],
  );

  const value = useMemo(() => ({ addAlert }), [addAlert]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {alerts.map((alert) => (
        <Snackbar key={alert.message} alert={alert} />
      ))}
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SnackbarContext;
