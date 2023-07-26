import './OverviewPanel.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useAuth from '@/hooks/useAuth';
import useNewTask from '@/hooks/useNewTask';
import { taskType } from '@/types/types';
import WeeklyOverview from './WeeklyOverview';
import TaskListOverview from './TaskListOverview';

// The overview panel is a multipurpose component that renders the tasks it receives as props
// Used in all the main routes
function OverviewPanel({ tasks, allowCreate = false }) {
  const { user } = useAuth();
  const { showTaskModal } = useNewTask();

  const [activePanel, setActivePanel] = useState(1);

  // This component is to be rendered within protected routes only
  if (!user) return;

  return (
    <div className="panel">
      {/* Tablist for weekly/list view of tasks */}
      <div className="panel__tablist">
        <button
          type="button"
          role="tab"
          aria-controls="weekly_panel"
          aria-selected={activePanel === 1}
          aria-label="Show task overview for the week"
          id="weekly_tab"
          className="panel__tab"
          onClick={() => setActivePanel(1)}
          data-active={activePanel === 1}
        >
          <span>Weekly View</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-controls="list_panel"
          aria-selected={activePanel === 2}
          aria-label="Show list view of all your tasks"
          id="list_tab"
          className="panel__tab"
          onClick={() => setActivePanel(2)}
          data-active={activePanel === 2}
        >
          <span>List View</span>
        </button>

        {allowCreate && (
          <button
            type="button"
            className="panel__new-task"
            onClick={() => showTaskModal()}
          >
            Create New Task
          </button>
        )}
      </div>

      <div
        id="weekly-panel"
        role="tabpanel"
        aria-labelledby="weekly_tab"
        className="task-ov__panel"
        hidden={activePanel === 2}
      >
        <WeeklyOverview tasks={tasks} />
      </div>

      <div
        id="list_panel"
        role="tabpanel"
        aria-labelledby="list_tab"
        className="task-ov__panel"
        hidden={activePanel === 1}
      >
        <TaskListOverview tasks={tasks} />
      </div>
    </div>
  );
}

OverviewPanel.propTypes = {
  tasks: PropTypes.arrayOf(taskType).isRequired,
  allowCreate: PropTypes.bool,
};

export default OverviewPanel;
