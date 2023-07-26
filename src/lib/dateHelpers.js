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
