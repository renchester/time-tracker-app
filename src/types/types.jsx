import PropTypes from 'prop-types';

export const taskType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  assignee: PropTypes.string.isRequired,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  endTime: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  timeEstimate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
});

export const projectType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(taskType),
  color: PropTypes.string.isRequired,
});

export const userType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
});
