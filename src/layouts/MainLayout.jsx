import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { WorkspaceProvider } from '@/context/WorkspaceContext';
import { NewTaskProvider } from '@/context/NewTaskContext';
import AddTaskButton from '@/components/factories/AddTaskButton';
import Sidebar from '@/components/Sidebar';

function MainLayout() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <SnackbarProvider>
          <NewTaskProvider>
            <div className="main-layout">
              <Sidebar />
              <Outlet />
              <AddTaskButton />
            </div>
          </NewTaskProvider>
        </SnackbarProvider>
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default MainLayout;
