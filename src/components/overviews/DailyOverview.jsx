import './DailyOverview.scss';
import PropTypes from 'prop-types';
import { format, isSameDay } from 'date-fns';
import { taskType } from '@/types/types';
import { getTotalHours } from '@/lib/dateHelpers';
import TaskDailyCard from '../cards/TaskDailyCard';

function DailyOverview(props) {
  const { day, tasks } = props;
  const elementID = `daily-ov__${day.toISOString()}`;
  const sameDayStatus = isSameDay(new Date(), new Date(day));
  const dateFormat = sameDayStatus ? 'LLL dd' : 'eee, LLL dd';

  // Sort tasks by startTime
  const sortedTasks = tasks.sort((a, b) => {
    return a.startTime > b.startTime ? 1 : -1;
  });

  // Get total hours of tasks per day
  const totalHours = getTotalHours(sortedTasks);

  return (
    <section
      className="daily-ov"
      aria-labelledby={elementID}
      data-now={sameDayStatus}
    >
      <div className="daily-ov__header">
        <h5
          id={elementID}
          className="daily-ov__day"
          data-active={sameDayStatus}
        >
          {sameDayStatus && 'Today,'} {format(new Date(day), dateFormat)}
        </h5>
        <span className="daily-ov__total">{totalHours}h</span>
      </div>

      <ul className="daily-ov__list">
        {sortedTasks.length > 0 &&
          sortedTasks.map((task) => (
            <TaskDailyCard key={task.id} task={task} />
          ))}
      </ul>
    </section>
  );
}

DailyOverview.propTypes = {
  day: PropTypes.instanceOf(Date),
  tasks: PropTypes.arrayOf(taskType).isRequired,
};

export default DailyOverview;
