import { useContext } from 'react';
import WorkspaceContext from '@/context/WorkspaceContext';

const useWorkspace = () => {
  const context = useContext(WorkspaceContext);

  if (context === null || context === undefined) {
    throw new Error('useWorkspace must be used within the WorkspaceProvider');
  }

  return context;
};

export default useWorkspace;
