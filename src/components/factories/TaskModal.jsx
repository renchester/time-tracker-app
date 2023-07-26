import './TaskModal.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  getDateTimeString,
  getEndTime,
  getTimeMilliseconds,
} from '@/lib/dateHelpers';
import useWorkspace from '@/hooks/useWorkspace';
import useNewTask from '@/hooks/useNewTask';
import useAuth from '@/hooks/useAuth';
import useSnackbar from '@/hooks/useSnackbar';

function TaskModal({ type = 'create' }) {
  const { projects, tasks, setTasks } = useWorkspace();
  const { hideTaskModal } = useNewTask();
  const { user: currentUser } = useAuth();
  const { addAlert } = useSnackbar();

  const initialState = {
    id: `task__${nanoid(10)}`,
    title: '',
    description: '',
    project: projects[0].title,
    timeEstimate: 1,
    startTime: getDateTimeString(new Date()),
  };

  const [newTask, setNewTask] = useState(initialState);

  const isButtonDisabled =
    !newTask.title ||
    !newTask.project ||
    !newTask.timeEstimate ||
    !newTask.startTime;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) return;

    // New properties
    const assignee = currentUser.id;
    const startTime = getTimeMilliseconds(newTask.startTime);
    const endTime = getEndTime(newTask.startTime, newTask.timeEstimate);

    // Check if task is in conflict with other tasks
    const taskInConflict = tasks
      .filter((task) => task.assignee === currentUser.id)
      .find(
        (task) =>
          task.id !== newTask.id &&
          startTime > task.startTime &&
          startTime < task.endTime,
      );

    // Validate task date here, make sure it is not in conflict with other tasks

    const isTaskDateValid = !taskInConflict;

    if (isTaskDateValid) {
      // Add assignee and id to new task
      const taskToCreate = {
        ...newTask,
        assignee,
        startTime,
        endTime,
      };

      // Add task to workspace
      setTasks((prev) => [
        ...prev.filter((task) => task.id !== newTask.id),
        taskToCreate,
      ]);

      // Display success message
      addAlert({
        message: `Successfully created task`,
        status: 'success',
      });

      // Reset form and close modal
      setNewTask(initialState);
      hideTaskModal();
    } else {
      // New task is in conflict with other tasks, display error message
      addAlert({
        message: `Start time for this task is in conflict with "${taskInConflict.title}" task`,
        status: 'error',
      });
    }
  };

  return (
    <div className="task-modal">
      <button
        className="task-modal__btn-close"
        type="button"
        aria-label="Close modal"
        onClick={hideTaskModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="arcs"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <h2 className="task-modal__title">Create Task</h2>

      <form action="" className="task-modal__form" onSubmit={handleSubmit}>
        <label htmlFor="new-task-title" className="task-modal__label">
          <span>Title</span>
          <input
            id="new-task-title"
            type="text"
            className="task-modal__input"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            minLength={1}
            maxLength={240}
            placeholder="Add documentation for blog project"
            required
          />
        </label>
        <label htmlFor="new-task-description" className="task-modal__label">
          <span>Description</span>
          <textarea
            id="new-task-description"
            className="task-modal__input textarea"
            name="description"
            placeholder="Ask Colleen to clarify the details for section #12"
            value={newTask.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="new-task-project" className="task-modal__label">
          <span>Project</span>
          <select
            name="project"
            className="task-modal__input"
            id="new-task-project"
            value={newTask.project}
            onChange={handleChange}
          >
            {/* Project options */}
            {projects.length > 0 ? (
              projects.map((proj) => (
                <option key={proj.id} value={proj.title}>
                  {proj.title}
                </option>
              ))
            ) : (
              <option value={null}>No projects yet</option>
            )}
          </select>
        </label>

        <label htmlFor="new-task-startTime" className="task-modal__label">
          <span>Start Time</span>
          <input
            id="new-task-startTime"
            type="datetime-local"
            className="task-modal__input"
            name="startTime"
            value={newTask.startTime}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="new-task-timeEstimate" className="task-modal__label">
          <span>Time Estimate (in hours)</span>
          <small>
            Use decimals to indicate partial hours(e.g. 1.5 for 1h 30min)
          </small>
          <input
            id="new-task-timeEstimate"
            type="number"
            className="task-modal__input"
            name="timeEstimate"
            placeholder="1.25"
            value={newTask.timeEstimate}
            onChange={handleChange}
            min={1}
            max={8}
            required
          />
        </label>

        <button
          type="submit"
          className="task-modal__btn-submit"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        >
          {type === 'create' ? 'Create' : 'Save'} Task
        </button>
      </form>
    </div>
  );
}

TaskModal.propTypes = {
  type: PropTypes.oneOf(['create', 'edit']),
  parentTask: PropTypes.shape({
    title: PropTypes.string,
    assignee: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    project: PropTypes.string,
    endTime: PropTypes.number,
    startTime: PropTypes.number,
    timeEstimate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default TaskModal;
