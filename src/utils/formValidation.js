import moment from 'moment';
import { formatDateAndTime } from '@utils/dateUtils';

export const isTimeValid = time => moment(time, 'HH:mm').minutes() % 15 === 0;

export const isEventDurationValid = (startDateTime, endDateTime) =>
  endDateTime.diff(startDateTime, 'hours') <= 6;

export const isOverlap = (newEventStart, newEventEnd, events) => {
  return events.some(event => {
    const eventStart = moment(event.dateFrom);
    const eventEnd = moment(event.dateTo);
    return (
      (newEventStart.isSameOrBefore(eventEnd) && newEventStart.isSameOrAfter(eventStart)) ||
      (newEventEnd.isSameOrBefore(eventEnd) && newEventEnd.isSameOrAfter(eventStart))
    );
  });
};

export const validateForm = (formData, currentEvents) => {
  const { startTime, endTime, date } = formData;

  switch (true) {
    case !isTimeValid(startTime) || !isTimeValid(endTime):
      alert('The start and end times must be divisible by 15 minutes.');
      return true;

    case !isEventDurationValid(
      formatDateAndTime(date, startTime),
      formatDateAndTime(date, endTime),
    ):
      alert('The event duration cannot exceed 6 hours.');
      return true;

    case !formatDateAndTime(date, startTime).isSame(formatDateAndTime(date, endTime), 'day') ||
      formatDateAndTime(date, endTime).isBefore(formatDateAndTime(date, startTime)):
      alert('The event must start and end within the same day.');
      return true;

    case isOverlap(
      formatDateAndTime(date, startTime),
      formatDateAndTime(date, endTime),
      currentEvents,
    ):
      alert('The event overlaps with existing events. Please choose another time.');
      return true;

    default:
      return false;
  }
};
