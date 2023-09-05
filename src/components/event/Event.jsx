import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './event.scss';

const Event = ({ height, marginTop, title, time, id }) => {
  const [isVisibleRemoveButton, setIsVisibleRemoveButton] = useState(false);

  const eventStyle = {
    height,
    marginTop,
  };

  const toggleRemoveButton = () => {
    setIsVisibleRemoveButton(!isVisibleRemoveButton);
  };

  return (
    <div
      key={id}
      style={eventStyle}
      className="event"
      onMouseEnter={toggleRemoveButton}
      onMouseLeave={toggleRemoveButton}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {isVisibleRemoveButton && (
        <button className='delete-event-btn isVisibleButton' onClick={() => console.log(id)}><FontAwesomeIcon icon={faTrash} className='delete-event-btn__icon' beat />Delete</button>
      )}
    </div>
  );
};

export default Event;
