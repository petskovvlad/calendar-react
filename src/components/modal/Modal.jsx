import React from 'react';
import './modal.scss';
import { isTimeValid, isEventDurationValid, isOverlap } from '@utils/formValidation.js';
import { formatDateAndTime } from '../../utils/dateUtils';

const Modal = ({ formData, modalHandler, handleInputChange, handleSubmit, currentEvents }) => {
  const validateForm = () => {
    const { startTime, endTime, date } = formData;

    switch (true) {
      case !isTimeValid(startTime) || !isTimeValid(endTime):
        alert('The start and end times must be divisible by 15 minutes.');
        return true;

      case !isEventDurationValid(
        formatDateAndTime(date, startTime),
        formatDateAndTime(date, endTime),
      ):
        alert('The event duration cannot exceed 6 hours.');
        return true;

      case !formatDateAndTime(date, startTime).isSame(formatDateAndTime(date, endTime), 'day') ||
        formatDateAndTime(date, endTime).isBefore(formatDateAndTime(date, startTime)):
        alert('The event must start and end within the same day.');
        return true;

      case isOverlap(
        formatDateAndTime(date, startTime),
        formatDateAndTime(date, endTime),
        currentEvents,
      ):
        alert('The event overlaps with existing events. Please choose another time.');
        return true;

      default:
        return false;
    }
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={modalHandler}>
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={handleInputChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={handleInputChange}
                value={formData.date}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={handleInputChange}
                value={formData.startTime}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={handleInputChange}
                value={formData.endTime}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleInputChange}
            ></textarea>
            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={e => {
                e.preventDefault();
                const hasValidationErrors = validateForm();
                if (!hasValidationErrors) {
                  handleSubmit(e);
                }
              }}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
