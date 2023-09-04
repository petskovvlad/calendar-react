import React, { useState, useEffect } from 'react';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { getEventsData } from '../../gateway/eventsGateway';
import moment from 'moment';

import './calendar.scss';

const Calendar = ({ weekDates }) => {
  const [currentEvents, setEvents] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const eventsData = await getEventsData();
        // Преобразовать даты из строки в объекты Date
        const formattedEventsData = eventsData.map(event => ({
          ...event,
          dateFrom: moment(event.dateFrom).toDate(),
          dateTo: moment(event.dateTo).toDate(),
        }));
        setEvents(formattedEventsData);
      } catch (error) {
        console.error('Ошибка при получении данных с сервера:', error);
      }
    }
    fetchData();
  }, []);
  
  
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