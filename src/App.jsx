import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import { getWeekStartDate, generateWeekRange, formatDateAndTime } from '@utils/dateUtils.js';
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
      const eventsData = await fetchEventList();
      const formattedEventsData = eventsData.map(event => ({
        ...event,
        dateFrom: moment(event.dateFrom).toDate(),
        dateTo: moment(event.dateTo).toDate(),
      }));
      setEvents(formattedEventsData);
    };
    fetchData();
  }, []);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { date, startTime, endTime } = formData;

    const eventData = {
      title: formData.title,
      description: formData.description,
      dateFrom: formatDateAndTime(date, startTime),
      dateTo: formatDateAndTime(date, endTime),
    };

    try {
      await createEvent(eventData);

      const updatedEventsData = await fetchEventList();

      const formattedUpdatedEventsData = updatedEventsData.map(event => ({
        ...event,
        dateFrom: moment(event.dateFrom).toDate(),
        dateTo: moment(event.dateTo).toDate(),
      }));
      setEvents(formattedUpdatedEventsData);
      setIsOpen(false);
    } catch (error) {
      alert(`Internal Server Error. Can't display events`);
    }
  };

  const deleteEventData = async (eventID, eventStart) => {
    try {
      const startTime = moment(eventStart, 'YYYY-MM-DDTHH:mm');
      const timeDifferenceMinutes = startTime.diff(moment(), 'minutes');
      if (timeDifferenceMinutes <= 15 && timeDifferenceMinutes > 0) {
        alert(`You can't delete the event less than 15 minutes before it starts.`);
        return;
      }
      await deleteEvent(eventID);

      const updatedEventsData = await fetchEventList();
      const formattedUpdatedEventsData = updatedEventsData.map(event => ({
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
    setIsOpen(!isOpen);
    const selectedDate = weekDates.find(date => date.getDate() === dataDay);
    if (selectedDate) {
      setIsOpen(!isOpen);
      setFormData({
        ...formData,
        date: moment(selectedDate).format('YYYY-MM-DD'),
        startTime: moment(dataHour, 'H').format('HH:mm'),
        endTime: moment(dataHour + 1, 'H').format('HH:mm'),
        dataDay,
      });
    }
  };

  const modalHandler = () => {
    setIsOpen(!isOpen);
    setFormData({
      ...formData,
      date: moment().format('YYYY-MM-DD'),
      startTime: moment().format('HH:mm'),
      endTime: moment().add(1, 'hour').format('HH:mm'),
    });
  };

  const nextWeek = () => {
    const nextWeekStartDate = new Date(weekStartDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
    setWeekStartDate(nextWeekStartDate);
  };
  const prevWeek = () => {
    const prevWeekStartDate = new Date(weekStartDate);
    prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
    setWeekStartDate(prevWeekStartDate);
  };
  const todayHandler = () => {
    setWeekStartDate(getWeekStartDate(new Date()));
  };

  const startOfWeek = getWeekStartDate(new Date(weekStartDate)).toLocaleString('en-us', {
    month: 'short',
  });
  const nextWeekStartDate = new Date(weekStartDate);
  nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
  const endOfWeek = nextWeekStartDate.toLocaleString('en-us', { month: 'short' });

  const monthText = startOfWeek !== endOfWeek ? `${startOfWeek} - ${endOfWeek}` : startOfWeek;

  return (
    <>
      <Header
        nextWeek={nextWeek}
        prevWeek={prevWeek}
        todayHandler={todayHandler}
        modalHandler={modalHandler}
        monthText={monthText}
      />
      {isOpen && (
        <Modal
          formData={formData}
          modalHandler={modalHandler}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          currentEvents={currentEvents}
        />
      )}
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
};

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
    }),
  ),
  setWeekStartDate: PropTypes.func,
  setIsOpen: PropTypes.func,
  setFormData: PropTypes.func,
  setEvents: PropTypes.func,
};

export default App;
