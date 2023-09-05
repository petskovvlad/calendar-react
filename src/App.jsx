import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import moment from 'moment';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import './common.scss';
import Modal from './components/modal/Modal.jsx';
import { createEvent, fetchEventList } from './gateway/eventsGateway';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dateFrom: '',
    dateTo: '',
    description: '',
  });
  const [currentEvents, setEvents] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEventList()
      
      const formattedEventsData = eventsData.map(event => ({
        ...event,
        dateFrom: moment(event.dateFrom).toDate(),
        dateTo: moment(event.dateTo).toDate(),
      }));
      setEvents(formattedEventsData);
    }
    fetchData();
  }, [])

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedDateFrom = moment(`${formData.date}T${formData.startTime}`).format(
      'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (за східноєвропейським літнім часом)'
    );
    const formattedDateTo = moment(`${formData.date}T${formData.endTime}`).format(
      'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (за східноєвропейським літнім часом)'
    );
  
    const eventData = {
      title: formData.title,
      description: formData.description,
      dateFrom: formattedDateFrom,
      dateTo: formattedDateTo,
    };
    
    await createEvent(eventData);
    const updatedEventsData = await fetchEventList();
  
    const formattedUpdatedEventsData = updatedEventsData.map((event) => ({
      ...event,
      dateFrom: moment(event.dateFrom).toDate(),
      dateTo: moment(event.dateTo).toDate(),
    }));
    setEvents(formattedUpdatedEventsData);
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
        currentEvents={currentEvents}
      />
    </>
  );
}

export default App;
