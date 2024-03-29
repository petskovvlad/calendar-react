import React, { useState, useEffect } from 'react';
import Hour from '../hour/Hour';
import './day.scss';
import moment from 'moment';

const Day = ({
  dataDay,
  dayEvents,
  removeButtonHundler,
  deleteEventData,
  slotModalHandler,
  setFormData,
  formData,
  weekDays,
}) => {
  const [marginTop, setMarginTop] = useState(moment().minute());
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
    .map((_, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => {
          const eventHour = moment(event.dateFrom).hour();
          return eventHour === hour;
        });

        const isCurrentDayHourMonth =
          moment().get('date') === dataDay &&
          moment().get('hour') === hour &&
          weekDays.some(day => {
            return moment(day).get('month') === moment().get('month');
          });

        const redLineStyle = {
          marginTop,
        };

        return (
          <div key={dataDay + hour}>
            {isCurrentDayHourMonth && <div style={redLineStyle} className="red-line"></div>}
            <Hour
              dataDay={dataDay}
              dataHour={hour}
              hourEvents={hourEvents}
              removeButtonHundler={removeButtonHundler}
              deleteEventData={deleteEventData}
              slotModalHandler={slotModalHandler}
              setFormData={setFormData}
              formData={formData}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Day;
