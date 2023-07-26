import { format, isSameDay } from 'date-fns';

export const getDateTimeString = (date) => {
  const target = new Date(date);
  target.setMinutes(target.getMinutes() - target.getTimezoneOffset());
  return target.toISOString().replace(/\.\d\d\dZ/, '');
};

export const getTimeMilliseconds = (dateString) => {
  return new Date(dateString).getTime();
};

export const getEndTime = (startTime, timeEstimate) => {
  const timeEstimateInMS = timeEstimate * 60 * 60 * 1000;

  const endTime = getTimeMilliseconds(startTime) + timeEstimateInMS;

  return endTime;
};

export const getTasksPerDay = (tasks, day) => {
  return tasks.filter((task) => isSameDay(day, new Date(task.startTime)));
};

export const formatHours = (date) => {
  return format(new Date(date), 'hh:mmaa');
};
