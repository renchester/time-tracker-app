import './TaskListCard.scss';
import { format } from 'date-fns';
import { taskType } from '@/types/types';
import useAuth from '@/hooks/useAuth';
import useWorkspace from '@/hooks/useWorkspace';
import useNewTask from '@/hooks/useNewTask';

function TaskListCard(props) {
  const { task } = props;
  const { user } = useAuth();
  const { users, deleteTask } = useWorkspace();
  const { showTaskModal } = useNewTask();
  const elementID = `list-card__${task.id}`;

  const targetUser = users.find((user) => user.id === task.assignee);

  return (
    <article aria-labelledby={elementID} className="tk-item">
      <div className="tk-item__top">
        <div className="tk-item__main">
          <h4 id={elementID} className="tk-item__title">
            {task.title}
          </h4>
          <span className="tk-item__time">{task.timeEstimate}h</span>
        </div>

        {/* Only render CTA buttons if assignee is the logged in user */}
        {user.id === task.assignee && (
          <div className="tk-item__btn-container">
            <button
              className="tk-item__btn"
              type="button"
              aria-label="Edit task"
              onClick={() => showTaskModal(task, 'edit')}
            >
              <svg
                className="tk-item__btn-icon"
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
              className="tk-item__btn"
              type="button"
              aria-label="Delete task"
              onClick={() => deleteTask(task.id)}
            >
              <svg
                className="tk-item__btn-icon"
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
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        )}
      </div>

      <dl className="tk-item__list">
        {task.description && (
          <div className="tk-item__detail">
            <dt>Description:</dt>
            <dd>{task.description}</dd>
          </div>
        )}
        <div className="tk-item__detail">
          <dt>Assignee:</dt>
          <dd>
            {targetUser.firstName} {targetUser.lastName}
          </dd>
        </div>
        <div className="tk-item__detail">
          <dt>Project:</dt>
          <dd>{task.project}</dd>
        </div>
        <div className="tk-item__detail">
          <dt>Start Time:</dt>
          <dd>
            <time dateTime={new Date(task.startTime).toISOString()}>
              {format(new Date(task.startTime), 'LLL dd, HH:mmaa')}
            </time>
          </dd>
        </div>
        <div className="tk-item__detail">
          <dt>End Time(Estimate):</dt>
          <dd>
            <time dateTime={new Date(task.endTime).toISOString()}>
              {format(new Date(task.endTime), 'LLL dd, HH:mmaa')}
            </time>
          </dd>
        </div>
      </dl>
    </article>
  );
}

TaskListCard.propTypes = {
  task: taskType.isRequired,
};

export default TaskListCard;
