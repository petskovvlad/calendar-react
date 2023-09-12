import React from 'react';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataDay, dataHour, hourEvents, removeButtonHundler, deleteEventData, slotModalHandler }) => {
  const handleTimeSlotClick = () => {
    slotModalHandler(dataHour, dataDay);
  };
  return (
    <div 
      className="calendar__time-slot" 
      data-time={dataHour + 1} 
      onDoubleClick={handleTimeSlotClick}
      >
      {}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
          )}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            removeButtonHundler={removeButtonHundler}
            deleteEventData={deleteEventData}
            />
        );
      })}
    </div>
  );
};

export default Hour;