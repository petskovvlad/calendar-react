import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({ weekDates, currentEvents, deleteEventData, slotModalHandler, setFormData, formData }) => {
    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week 
              weekDates={weekDates} 
              events={currentEvents}
              deleteEventData={deleteEventData}
              slotModalHandler={slotModalHandler}
              setFormData={setFormData}
              formData={formData} 
              />
          </div>
        </div>
      </section>
    )
}

Calendar.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  currentEvents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dateFrom: PropTypes.instanceOf(Date).isRequired,
      dateTo: PropTypes.instanceOf(Date).isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteEventData: PropTypes.func.isRequired,
  slotModalHandler: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    description: PropTypes.string,
    dataDay: PropTypes.number,
  }),
};

export default Calendar;