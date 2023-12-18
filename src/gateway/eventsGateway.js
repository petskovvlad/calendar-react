const baseUrl = 'https://646cfbcc7b42c06c3b2c6102.mockapi.io/api/v1/events';

export const createEvent = eventData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(eventData),
  })
  .then(response => {
    if(!response.ok) {
      throw alert(`Internal Server Error. Can't display events`)
    }
  })
}

  export const fetchEventList = () => {
    return fetch(baseUrl)
        .then(res => {
          if(res.ok) {
            return res.json();
          } throw alert(`Internal Server Error. Can't display events`)
        })
  }

  export const deleteEvent= (eventID) => {
    return fetch(`${baseUrl}/${eventID}`, {
      method: 'DELETE'
    }).then(response => {
      if(!response.ok) {
        throw alert(`Internal Server Error. Can't display events`)
      }
    });
  }
