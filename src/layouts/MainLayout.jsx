import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from '@/context/SnackbarContext';

function MainLayout() {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <Outlet />
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default MainLayout;
