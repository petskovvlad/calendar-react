import React from 'react';
import Day from '../day/Day';
import moment from 'moment';

import './week.scss';

const Week = ({ weekDates, events, removeButtonHundler, deleteEventData }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = moment(dayStart).add(24, 'hours');

        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
          );        

        return (
          <Day
            removeButtonHundler={removeButtonHundler}
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            deleteEventData={deleteEventData}
          />
        );
      })}
    </div>
  );
};

export default Week;