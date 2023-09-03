import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import moment from 'moment';

import { getWeekStartDate, generateWeekRange, getDateTime } from '../src/utils/dateUtils.js';

import './common.scss';
import Modal from './components/modal/Modal.jsx';
import { sendEventsData } from './gateway/events.js';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dateFrom: '', // Оставляем строку пустой
    dateTo: '',   // Оставляем строку пустой
    description: '',
  });

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formattedDateFrom = moment(`${formData.date}T${formData.startTime}`).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (за східноєвропейським літнім часом)');
    const formattedDateTo = moment(`${formData.date}T${formData.endTime}`).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (за східноєвропейським літнім часом)');
  
    const eventData = {
      title: formData.title,
      description: formData.description,
      dateFrom: formattedDateFrom,
      dateTo: formattedDateTo,
    };
  
    sendEventsData(eventData);
    setIsOpen(false);
  };
  


  const modalHandler = () => {
    setIsOpen(!isOpen)
  }

  const nextWeek = () => {
    const nextWeekStartDate = new Date(weekStartDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
    setWeekStartDate(nextWeekStartDate);
  }
  const prevWeek = () => {
    const prevWeekStartDate = new Date(weekStartDate);
    prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
    setWeekStartDate(prevWeekStartDate);
  }
  const todayHandler = () => {
    setWeekStartDate(getWeekStartDate(new Date()));
  }

  const startOfWeek = getWeekStartDate(new Date(weekStartDate)).toLocaleString('en-us', { month: 'short' });
  const nextWeekStartDate = new Date(weekStartDate);
  nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
  const endOfWeek = nextWeekStartDate.toLocaleString('en-us', { month: 'short' })

  let monthText = startOfWeek;
  if (startOfWeek !== endOfWeek) {
    monthText = `${startOfWeek} - ${endOfWeek}`
  }

  return (
    <>
      <Header
        nextWeek={nextWeek}
        prevWeek={prevWeek}
        todayHandler={todayHandler}
        modalHandler={modalHandler}
        monthText={monthText}
      />
      {isOpen ? <Modal modalHandler={modalHandler} handleSubmit={handleSubmit} handleInputChange={handleInputChange} /> : ''}
      <Calendar
        weekDates={weekDates}
      />
    </>
  );
}

export default App;
