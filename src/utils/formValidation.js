import moment from 'moment';

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
