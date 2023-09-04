import React, { useState, useEffect } from 'react';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { fetchEventList } from '../../gateway/eventsGateway';
import moment from 'moment';

import './calendar.scss';

const Calendar = ({ weekDates, currentEvents }) => {
  // const [currentEvents, setEvents] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const eventsData = await fetchEventList()
      
  //     const formattedEventsData = eventsData.map(event => ({
  //       ...event,
  //       dateFrom: moment(event.dateFrom).toDate(),
  //       dateTo: moment(event.dateTo).toDate(),
  //     }));
  //     setEvents(formattedEventsData);
  //   }
  //   fetchData();
  // }, [])
  
  return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week 
              weekDates={weekDates} 
              events={currentEvents} 
              />
          </div>
        </div>
      </section>
    )
}

export default Calendar;