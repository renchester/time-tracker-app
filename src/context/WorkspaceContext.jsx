import {
  createContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import useAuth from '@/hooks/useAuth';
import { initProjects, initUsers, initTasks } from '@/data/initialData';
import {
  fetchFromStorage,
  persistToStorage,
  removeFromStorage,
} from '@/lib/localStorage';

const WorkspaceContext = createContext(null);

export const WorkspaceProvider = (props) => {
  const { children } = props;
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const deleteTask = useCallback(
    (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks],
  );

  const initializeWorkspace = () => {
    if (typeof window === 'undefined') return;

    // Initialize Users
    const storedUsers = fetchFromStorage('users');

    if (storedUsers.length > 0) {
      setUsers(storedUsers);
    } else {
      setUsers(initUsers);
    }

    // Initialize Projects
    const storedProjects = fetchFromStorage('projects');

    if (storedProjects.length > 0) {
      setProjects(storedProjects);
    } else {
      setProjects(initProjects);
    }

    // Initialize Tasks
    const storedTasks = fetchFromStorage('tasks');

    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    } else {
      setTasks(initTasks);
    }
  };

  // Initialize workspace on app load
  useEffect(() => {
    if (!currentUser) {
      // Empty workspace if no user
      setUsers([]);
      setProjects([]);
      setTasks([]);
      return;
    }

    // Start workspace if user is logged in
    initializeWorkspace();
  }, [currentUser]);

  // Persist projects to local storage on every change
  useEffect(() => {
    if (!currentUser) return;

    if (projects.length < 1) {
      removeFromStorage('projects');
    }

    persistToStorage('projects', projects);
  }, [projects, currentUser]);

  // Persist users to local storage on every change
  useEffect(() => {
    if (!currentUser) return;

    if (users.length < 1) {
      removeFromStorage('users');
    }

    persistToStorage('users', users);
  }, [users, currentUser]);

  // Persist tasks to local storage on every change
  useEffect(() => {
    if (!currentUser) return;

    if (tasks.length < 1) {
      removeFromStorage('tasks');
    }

    persistToStorage('tasks', tasks);
  }, [tasks, currentUser]);

  const value = useMemo(
    () => ({
      users,
      setUsers,
      projects,
      setProjects,
      tasks,
      setTasks,
      deleteTask,
    }),
    [users, projects, tasks, deleteTask],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};

WorkspaceProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default WorkspaceContext;
