import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './event.scss';

const Event = ({ height, marginTop, title, time, id, deleteEventData, eventStart }) => {
  const [isVisibleRemoveButton, setIsVisibleRemoveButton] = useState(false);

  const toggleRemoveButton = () => {
    setIsVisibleRemoveButton(!isVisibleRemoveButton);
  };

  return (
    <div className="event-container">
      <div key={id} style={{ height, marginTop }} className="event" onClick={toggleRemoveButton}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        {isVisibleRemoveButton && (
          <button
            className="delete-event-btn isVisibleButton"
            onClick={() => deleteEventData(id, eventStart)}
          >
            <FontAwesomeIcon icon={faTrash} className="delete-event-btn__icon" beat />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Event;
