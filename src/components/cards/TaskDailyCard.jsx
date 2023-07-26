import './TaskDailyCard.scss';
import { taskType } from '@/types/types';
import useAuth from '@/hooks/useAuth';
import useWorkspace from '@/hooks/useWorkspace';
import useNewTask from '@/hooks/useNewTask';
import { formatHours } from '@/lib/dateHelpers';

function TaskDailyCard(props) {
  const { task } = props;
  const { user: currentUser } = useAuth();
  const { users, deleteTask } = useWorkspace();
  const { showTaskModal } = useNewTask();
  const elementID = `task-card__${task.id}`;

  const targetUser = users.find((user) => user.id === task.assignee);

  return (
    <article
      className="task-card"
      aria-labelledby={elementID}
      style={{
        minHeight: '160px',
        height: `${task.timeEstimate * 6}rem`,
        maxHeight: '500px',
      }}
    >
      <div className="task-card__top">
        <h4 className="task-card__title" id={elementID}>
          {task.title}
        </h4>
        <div className="task-card__description">
          <p>{task.description}</p>
        </div>
        {task.timeEstimate > 1 && (
          <>
            <div className="task-card__detail" aria-label="project">
              <svg
                className="task-card__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="arcs"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>{task.project}</span>
            </div>
          </>
        )}
        <div className="task-card__detail" aria-label="assignee">
          <svg
            className="task-card__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="arcs"
          >
            <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
            <circle cx="12" cy="10" r="3" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span>
            {targetUser.firstName} {targetUser.lastName}
          </span>
        </div>
        <div className="task-card__detail">
          <svg
            className="task-card__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="arcs"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>
            <time dateTime={new Date(task.startTime)}>
              {formatHours(task.startTime)}
            </time>{' '}
            -{' '}
            <time dateTime={new Date(task.endTime)}>
              {formatHours(task.endTime)}
            </time>
          </span>
        </div>
      </div>

      <div className="task-card__bottom">
        <span className="task-card__estimate">{task.timeEstimate}h</span>
        {/* Only render CTA buttons if assignee is the logged in user  */}
        {currentUser.id === targetUser.id && (
          <div className="task-card__btn-container">
            <button
              type="button"
              aria-label="Edit task"
              onClick={() => showTaskModal(task, 'edit')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="arcs"
                aria-hidden
              >
                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
              </svg>
            </button>
            <button
              type="button"
              aria-label="Delete task"
              onClick={() => deleteTask(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="arcs"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

TaskDailyCard.propTypes = {
  task: taskType.isRequired,
};

export default TaskDailyCard;
