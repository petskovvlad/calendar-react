import React from 'react';
import './modal.scss';

const Modal = ({ modalHandler, handleInputChange, handleSubmit }) => {
    return (
      <div className='modal overlay'>
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn" onClick={modalHandler}>+</button>
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
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  onChange={handleInputChange}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  onChange={handleInputChange}
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                onChange={handleInputChange}
              ></textarea>
              <button type="submit" className="event-form__submit-btn" onClick={handleSubmit}>
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default Modal;