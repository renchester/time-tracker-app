import './TaskListOverview.scss';
import { getTotalHours } from '@/lib/dateHelpers';
import { taskType } from '@/types/types';
import PropTypes from 'prop-types';
import TaskListCard from '../cards/TaskListCard';

function TaskListOverview(props) {
  const { tasks } = props;

  // Sort tasks by date
  const sortedTasks = tasks.sort((a, b) =>
    a.startTime > b.startTime ? 1 : -1,
  );

  // Get total hours for given tasks
  const totalHours = getTotalHours(sortedTasks);

  return (
    <div className="tkl">
      <p className="tkl__total">Total Hours: {totalHours}</p>
      <ul className="tkl__list">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <li className="tkl__item" key={task.id}>
              <TaskListCard task={task} />
            </li>
          ))
        ) : (
          <p>You do not have any tasks</p>
        )}
      </ul>
    </div>
  );
}

TaskListOverview.propTypes = {
  tasks: PropTypes.arrayOf(taskType).isRequired,
};

export default TaskListOverview;
