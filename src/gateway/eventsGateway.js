const baseUrl = 'https://646cfbcc7b42c06c3b2c6102.mockapi.io/api/v1/users';

// create
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
      throw new Error('Failed to create task');
    }
  })
}

// get
  export const fetchEventList = () => {
    return fetch(baseUrl)
        .then(res => {
          if(res.ok) {
            return res.json();
          }
        })
  }

  // delete
  export const deleteEvent= (eventID) => {
    return fetch(`${baseUrl}/${eventID}`, {
      method: 'DELETE'
    }).then(response => {
      if(!response.ok) {
        throw new Error('Failed to delete task');
      }
    });
  }
