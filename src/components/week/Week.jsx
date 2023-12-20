import React from 'react';
import Day from '../day/Day';
import moment from 'moment';

import './week.scss';

const Week = ({
  weekDates,
  events,
  removeButtonHundler,
  deleteEventData,
  slotModalHandler,
  setFormData,
  formData,
}) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = moment(dayStart).add(24, 'hours');

        const dayEvents = events.filter(
          event => event.dateFrom >= dayStart && event.dateTo < dayEnd,
        );

        return (
          <Day
            removeButtonHundler={removeButtonHundler}
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            deleteEventData={deleteEventData}
            slotModalHandler={slotModalHandler}
            setFormData={setFormData}
            formData={formData}
            weekDates={weekDates}
          />
        );
      })}
    </div>
  );
};

export default Week;
