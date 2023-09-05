import React, { useState, useEffect } from 'react';
import Hour from '../hour/Hour';
import './day.scss';
import moment from 'moment';

const Day = ({ dataDay, dayEvents, removeButtonHundler, deleteEventData }) => {

  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMarginTop(moment().minute());
    }, 60000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

        const isCurrentDay = moment().get('date') === dataDay;
        const isCurrentHour = moment().get('hour') === hour;        
        
        const redLineStyle = {
          marginTop,
        };
        console.log(redLineStyle)

        



        return (
          <div key={dataDay + hour}>
            {isCurrentDay && isCurrentHour && <div style={redLineStyle} className='red-line'></div>}
            <Hour
              dataHour={hour}
              hourEvents={hourEvents}
              removeButtonHundler={removeButtonHundler}
              deleteEventData={deleteEventData}
            />
            {/* Проверяем, является ли текущий час и день текущим */}
          </div>
        );
      })}
    </div>
  );
};

export default Day;
