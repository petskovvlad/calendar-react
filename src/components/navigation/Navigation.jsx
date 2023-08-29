import React from 'react';
import { days } from '../../utils/dateUtils.js';
import { isSameDay } from 'date-fns';

import './navigation.scss'


const Navigation = ({ weekDates }) => {
  const currentDate = new Date();

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        <div className="calendar__day-label day-label">
          <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
          <span className={`day-label__day-number ${isSameDay(dayDate, currentDate) ? 'current-day' : ''}`}>{dayDate.getDate()}</span>
        </div>
      ))}
    </header>
  );
};

export default Navigation;