import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

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
        monthText={monthText}
      />
      <Calendar weekDates={weekDates} />
    </>
  );
}

export default App;
