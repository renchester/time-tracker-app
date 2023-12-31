import { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Overlay from '@/components/Overlay';
import TaskModal from '@/components/factories/TaskModal';

const NewTaskContext = createContext(null);

export const NewTaskProvider = (props) => {
  const { children } = props;

  const [parentTask, setParentTask] = useState(null);
  const [isTaskModalShown, setTaskModalVisibility] = useState(false);

  // Makes the task modal visible globally
  const showTaskModal = useCallback((existingTask) => {
    if (existingTask) {
      setParentTask(existingTask);
    } else {
      setParentTask(null);
    }

    setTaskModalVisibility(true);
  }, []);

  const hideTaskModal = useCallback(() => {
    setTaskModalVisibility(false);
  }, []);
  const value = useMemo(
    () => ({
      isTaskModalShown,
      showTaskModal,
      hideTaskModal,
    }),
    [isTaskModalShown, showTaskModal, hideTaskModal],
  );

  return (
    <NewTaskContext.Provider value={value}>
      {children}

      {isTaskModalShown && (
        <Overlay hideChildren={hideTaskModal}>
          <TaskModal
            parentTask={parentTask}
            type={parentTask ? 'edit' : 'create'}
          />
        </Overlay>
      )}
    </NewTaskContext.Provider>
  );
};

NewTaskProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default NewTaskContext;
