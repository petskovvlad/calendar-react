import React from 'react';
import PropTypes from 'prop-types';
import { getWeekStartDate } from '@utils/dateUtils.js';

import './header.scss';

const Header = ({ modalHandler, setWeekStartDate, weekStartDate }) => {
  const nextWeek = () => {
    const nextWeekStartDate = new Date(weekStartDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
    setWeekStartDate(nextWeekStartDate);
  };
  const prevWeek = () => {
    const prevWeekStartDate = new Date(weekStartDate);
    prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
    setWeekStartDate(prevWeekStartDate);
  };
  const todayHandler = () => {
    setWeekStartDate(getWeekStartDate(new Date()));
  };

  const startOfWeek = getWeekStartDate(new Date(weekStartDate)).toLocaleString('en-us', {
    month: 'short',
  });
  const nextWeekStartDate = new Date(weekStartDate);
  nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
  const endOfWeek = nextWeekStartDate.toLocaleString('en-us', { month: 'short' });

  const monthText = startOfWeek !== endOfWeek ? `${startOfWeek} - ${endOfWeek}` : startOfWeek;
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={modalHandler}>
        <i className="fas fa-plus create-event-btn__icon" />
        Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={todayHandler}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={prevWeek}>
          <i className="fas fa-chevron-left" />
        </button>
        <button className="icon-button navigation__nav-icon" onClick={nextWeek}>
          <i className="fas fa-chevron-right" />
        </button>
        <span className="navigation__displayed-month">{monthText}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  modalHandler: PropTypes.func.isRequired,
  setWeekStartDate: PropTypes.func.isRequired,
  weekStartDate: PropTypes.instanceOf(Date).isRequired,
};

export default Header;
