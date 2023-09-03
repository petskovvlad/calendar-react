import React from 'react';
import Day from '../day/Day';
import moment from 'moment';

import './week.scss';

const Week = ({ weekDates, events, removeButtonHundler }) => {
  console.log(events)
  console.log(weekDates)
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );

        

        return (
          <Day
            removeButtonHundler={removeButtonHundler}
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
          />
        );
      })}
    </div>
  );
};

export default Week;