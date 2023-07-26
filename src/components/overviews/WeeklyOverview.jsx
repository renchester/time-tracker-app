import './WeeklyOverview.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addDays, addWeeks, endOfWeek, format, startOfWeek } from 'date-fns';
import { getTasksPerDay, getTotalHours } from '@/lib/dateHelpers';
import { taskType } from '@/types/types';
import DailyOverview from './DailyOverview';

function WeeklyOverview(props) {
  const { tasks } = props;

  // Sets the week to render in the overview
  const [activeWeek, setActiveWeek] = useState(0);
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));

  useEffect(() => {
    // Change start of week depending on the active week
    setWeekStart(startOfWeek(addWeeks(new Date(), activeWeek)));
  }, [activeWeek]);

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
      <div className="week-ov__top">
        <div className="week-ov__btn-container">
          <button
            className="week-ov__btn"
            aria-label="Show previous week"
            onClick={() => setActiveWeek((prev) => prev - 1)}
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
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="week-ov__week-label">
            Week of {format(weekStart, 'LLL dd, yyyy')}
          </div>
          <button
            className="week-ov__btn"
            aria-label="Show next week"
            onClick={() => setActiveWeek((prev) => prev + 1)}
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
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <button className="week-ov__btn reset" onClick={() => setActiveWeek(0)}>
          Reset
        </button>
      </div>

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
