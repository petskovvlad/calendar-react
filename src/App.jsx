import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';
import Modal from './components/modal/Modal.jsx';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const [isOpen, setIsOpen] = useState(false);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

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

    const startOfWeek = getWeekStartDate(new Date(weekStartDate)).toLocaleString('en-us', {month: 'short'});
    const nextWeekStartDate = new Date(weekStartDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
    const endOfWeek = nextWeekStartDate.toLocaleString('en-us', {month: 'short'})
    
    let monthText = startOfWeek;
    if(startOfWeek !== endOfWeek) {
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
      {isOpen ? <Modal modalHandler={modalHandler}/> : ''}
      <Calendar weekDates={weekDates} />
    </>
  );
}

export default App;
