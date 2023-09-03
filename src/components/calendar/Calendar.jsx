import React, { useState, useEffect } from 'react';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { getEventsData } from '../../gateway/events';

import './calendar.scss';

const Calendar = ({ weekDates }) => {
  const [currentEvents, setEvents] = useState([]);

  useEffect(() => {
    // Внутри useEffect делаем запрос на сервер и обновляем состояние
    async function fetchData() {
      try {
        const eventsData = await getEventsData(); // Получаем данные с сервера
        setEvents(eventsData); // Обновляем состояние
      } catch (error) {
        console.error('Ошибка при получении данных с сервера:', error);
      }
    }

    fetchData(); // Вызываем функцию получения данных
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