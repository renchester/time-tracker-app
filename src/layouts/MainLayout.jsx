import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

function MainLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default MainLayout;
