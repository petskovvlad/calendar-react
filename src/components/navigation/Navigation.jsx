import React from 'react';
import { days } from '@utils/dateUtils.js';
import { isSameDay } from 'date-fns';

import './navigation.scss';

const Navigation = ({ weekDays }) => {
  return (
    <header className="calendar__header">
      {weekDays.map(dayDate => (
        <div key={dayDate} className="calendar__day-label day-label">
          <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
          <span className="day-label__day-number">
            {
              <div className={`${isSameDay(dayDate, new Date()) && 'current-day'}`}>
                {dayDate.getDate()}
              </div>
            }
          </span>
        </div>
      ))}
    </header>
  );
};

export default Navigation;
