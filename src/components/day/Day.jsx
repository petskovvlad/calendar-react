import React from 'react';
import Hour from '../hour/Hour';
import './day.scss';
import moment from 'moment';

const Day = ({ dataDay, dayEvents, removeButtonHundler }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter((event) => {
        const eventHour = moment(event.dateFrom).hour();
        return eventHour === hour;
  });
        
        return (
          <>
          <Hour 
            key={dataDay + hour} 
            dataHour={hour} 
            hourEvents={hourEvents}
            removeButtonHundler={removeButtonHundler}
             />
          </>

        );
      })}
    </div>
  );
};

export default Day;