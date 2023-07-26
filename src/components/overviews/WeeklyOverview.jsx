import { taskType } from '@/types/types';
import './WeeklyOverview.scss';
import PropTypes from 'prop-types';
import { addDays, endOfWeek, startOfWeek } from 'date-fns';
import { getTasksPerDay, getTotalHours } from '@/lib/dateHelpers';
import DailyOverview from './DailyOverview';

function WeeklyOverview(props) {
  const { tasks } = props;

  // Get start of current week
  const weekStart = startOfWeek(new Date());

  // Create the array of days for this week
  const currentWeek = Array.apply(null, Array(7)).map((day, index) =>
    addDays(weekStart, index),
  );

  // Get tasks for this week
  const tasksForCurrentWeek = tasks.filter(
    (task) =>
      task.startTime > weekStart.getTime() &&
      task.endTime < endOfWeek(weekStart).getTime(),
  );

  // Get total hours of tasks for current week
  const totalHours = getTotalHours(tasksForCurrentWeek);

  return (
    <section className="week-ov">
      <p className="week-ov__total">Total Hours for this week: {totalHours}h</p>

      <ul className="week-ov__list">
        {currentWeek.map((day, index) => (
          <li key={index} className="week-ov__day">
            <DailyOverview day={day} tasks={getTasksPerDay(tasks, day)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

WeeklyOverview.propTypes = {
  tasks: PropTypes.arrayOf(taskType).isRequired,
};

export default WeeklyOverview;
