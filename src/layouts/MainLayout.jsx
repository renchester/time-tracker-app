import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import Sidebar from '@/components/Sidebar';
import { WorkspaceProvider } from '@/context/WorkspaceContext';

function MainLayout() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <SnackbarProvider>
          <div className="main-layout">
            <Sidebar />
            <Outlet />
          </div>
        </SnackbarProvider>
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default MainLayout;
