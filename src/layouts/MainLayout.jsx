import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import Sidebar from '@/components/Sidebar';

function MainLayout() {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <div className="main-layout">
          <Sidebar />
          <Outlet />
        </div>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default MainLayout;
