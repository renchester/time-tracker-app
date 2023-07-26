import { useContext } from 'react';
import NewTaskContext from '@/context/NewTaskContext';

const useNewTask = () => {
  const context = useContext(NewTaskContext);

  if (context === null || context === undefined) {
    throw new Error('useNewTask must be used within the NewTaskProvider');
  }

  return context;
};

export default useNewTask;
