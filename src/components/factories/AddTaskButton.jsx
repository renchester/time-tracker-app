import './AddTaskButton.scss';
import useAuth from '@/hooks/useAuth';
import useNewTask from '@/hooks/useNewTask';

function AddTaskButton() {
  const { showTaskModal } = useNewTask();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <button
      type="button"
      className="add-task"
      onClick={() => showTaskModal()}
      tabIndex={1}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="arcs"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  );
}

export default AddTaskButton;
