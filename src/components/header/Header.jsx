import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';

const Header = ({ nextWeek, prevWeek, todayHandler, monthText, modalHandler }) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={modalHandler}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={todayHandler}>Today</button>
        <button className="icon-button navigation__nav-icon" onClick={prevWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={nextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{monthText}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  nextWeek: PropTypes.func.isRequired,
  prevWeek: PropTypes.func.isRequired,
  todayHandler: PropTypes.func.isRequired,
  monthText: PropTypes.string.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default Header;