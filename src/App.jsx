import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import moment from 'moment';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import Modal from './components/modal/Modal.jsx';
import { createEvent, fetchEventList, deleteEvent } from './gateway/eventsGateway';

import './common.scss';

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

    const isTimeValid = (time) => {
      const timeMoment = moment(time, 'HH:mm');
      return timeMoment.minutes() % 15 === 0;
    };
    
    const isFormDataValid = () => {
      const { startTime, endTime } = formData;
      return isTimeValid(startTime) && isTimeValid(endTime);
    };

    if (!isFormDataValid()) {
      alert('The start and end times must be divisible by 15 minutes.');
      return;
    }

    const { date, startTime, endTime } = formData;
    const startDateTime = moment(`${date}T${startTime}`);
    const endDateTime = moment(`${date}T${endTime}`);

    if ((!startDateTime.isSame(endDateTime, 'day')) || (endDateTime.isBefore(startDateTime))) {
      alert('The event must start and end within the same day.');
      return;
    }

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

    const newEventStart = moment(formattedDateFrom);
    const newEventEnd = moment(formattedDateTo);

  const durationHours = newEventEnd.diff(newEventStart, 'hours');
  if (durationHours > 6) {
    alert('The event duration cannot exceed 6 hours.');
    return;
  }

  const isOverlap = currentEvents.some((event) => {
    const eventStart = moment(event.dateFrom);
    const eventEnd = moment(event.dateTo);
    return (
      (newEventStart.isSameOrBefore(eventEnd) && newEventStart.isSameOrAfter(eventStart)) ||
      (newEventEnd.isSameOrBefore(eventEnd) && newEventEnd.isSameOrAfter(eventStart))
    );
  });

  if (isOverlap) {
    alert('The event overlaps with existing events. Please choose another time.');
    return;
  }
    

    if (!isOverlap) {
      await createEvent(eventData);
      const updatedEventsData = await fetchEventList();
  
      const formattedUpdatedEventsData = updatedEventsData.map((event) => ({
        ...event,
        dateFrom: moment(event.dateFrom).toDate(),
        dateTo: moment(event.dateTo).toDate(),
      }));
      setEvents(formattedUpdatedEventsData);
      setIsOpen(false);
  }
}

const deleteEventData = async (eventID, eventStartTime) => {
  try {
    const currentTime = moment();
    const startTime = moment(eventStartTime);

    if (startTime.diff(currentTime, 'minutes') <= 15) {
      alert(`You can't delete the event less than 15 minutes before it starts.`);
      return;
    }
    
    await deleteEvent(eventID);

    const updatedEventsData = await fetchEventList();

    const formattedUpdatedEventsData = updatedEventsData.map((event) => ({
      ...event,
      dateFrom: moment(event.dateFrom).toDate(),
      dateTo: moment(event.dateTo).toDate(),
    }));

    setEvents(formattedUpdatedEventsData);
  } catch (error) {
    alert(`Internal Server Error. Can't display events`);
  }
};

  
  const slotModalHandler = (dataHour, dataDay) => {
    setIsOpen(!isOpen)
    const selectedDate = weekDates.find(date => date.getDate() === dataDay);
    if (selectedDate) {
    setIsOpen(!isOpen);
    setFormData({
      ...formData,
      date: moment(selectedDate).format('YYYY-MM-DD'),
      startTime: moment(dataHour, 'H').format('HH:mm'),
      endTime: moment(dataHour + 1, 'H').format('HH:mm'),
      dataDay: dataDay,
    });
  }
}

  const modalHandler = () => {
    setIsOpen(!isOpen)
    setFormData({
      ...formData,
      date: moment().format('YYYY-MM-DD'),
      startTime: moment().format('HH:mm'),
      endTime: moment().add(1, 'hour').format('HH:mm'),
    
    })
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
      {isOpen ? <Modal formData={formData} modalHandler={modalHandler} handleSubmit={handleSubmit} handleInputChange={handleInputChange} /> : ''}
      <Calendar
        weekDates={weekDates}
        currentEvents={currentEvents}
        deleteEventData={deleteEventData}
        slotModalHandler={slotModalHandler}
        setFormData={setFormData}
        formData={formData}
      />
    </>
  );
}

App.propTypes = {
  weekStartDate: PropTypes.instanceOf(Date),
  isOpen: PropTypes.bool,
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dataDay: PropTypes.number.isRequired,
  }),
  currentEvents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dateFrom: PropTypes.instanceOf(Date).isRequired,
      dateTo: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  setWeekStartDate: PropTypes.func,
  setIsOpen: PropTypes.func,
  setFormData: PropTypes.func,
  setEvents: PropTypes.func,
};

export default App;
