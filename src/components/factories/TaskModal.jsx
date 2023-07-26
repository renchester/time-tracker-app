import './TaskModal.scss';
import PropTypes from 'prop-types';

function TaskModal({ type = 'create' }) {
  return (
    <div className="task-modal">
      <button
        className="task-modal__btn-close"
        type="button"
        aria-label="Close modal"
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

      <h2 className="task-modal__title">
        {type === 'create' ? 'Create' : 'Edit'} Task
      </h2>

      <form action="" className="task-modal__form">
        <label htmlFor="new-task-title" className="task-modal__label">
          <span>Title</span>
          <input
            id="new-task-title"
            type="text"
            className="task-modal__input"
            name="title"
            required
          />
        </label>
        <label htmlFor="new-task-description" className="task-modal__label">
          <span>Description</span>
          <textarea
            id="new-task-description"
            className="task-modal__input textarea"
            name="description"
            placeholder="Ask Colleen to help with the documentation of this specific part"
          />
        </label>
        <label htmlFor="new-task-project" className="task-modal__label">
          <span>Project</span>
          <select
            name="project"
            className="task-modal__input"
            id="new-task-project"
          >
            {/* Enter selection of projects here */}
          </select>
        </label>

        <label htmlFor="new-task-startTime" className="task-modal__label">
          <span>Start Time</span>
          <input
            id="new-task-startTime"
            type="datetime-local"
            className="task-modal__input"
            name="startTime"
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
            required
          />
        </label>

        <button type="submit" className="task-modal__btn-submit">
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
