import { useContext } from 'react';
import SnackbarContext from '@/context/SnackbarContext';

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context === null || context === undefined) {
    throw new Error('useSnackbar must be used within the SnackbarProvider');
  }

  return context;
};

export default useSnackbar;
