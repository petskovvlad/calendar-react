const baseUrl = 'https://646cfbcc7b42c06c3b2c6102.mockapi.io/api/v1/users';

export async function sendEventsData(data) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке данных');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    throw error;
  }
}

export async function getEventsData() {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return [];
    }
  }

  export async function deleteEventsData(userId) {
    try {
      const response = await fetch(`${baseUrl}/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении данных');
      }
      return true; // Успешное удаление
    } catch (error) {
      console.error('Ошибка при удалении данных:', error);
      return false;
    }
  }


export async function updateEventsData(eventId, newData) {
    try {
      const response = await fetch(`${baseUrl}/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error('Ошибка при обновлении данных');
      }
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      return null;
    }
  }

const events = [
  {
    id: 1,
    title: 'Go to the gym',
    description: 'some text here',
    dateFrom: new Date(2023, 8, 2, 2, 0),
    dateTo: new Date(2023, 8, 2, 4, 15),
  },
  {
    id: 2,
    title: 'Go to the school',
    description: 'hello, 2 am',
    dateFrom: new Date(2023, 8, 3, 1, 0),
    dateTo: new Date(2023, 8, 3, 2, 30),
  },
  {
    id: 3,
    title: 'Lunch',
    description: '',
    dateFrom: new Date(2023, 8, 4, 10, 30),
    dateTo: new Date(2023, 8, 4, 13, 30),
  },
  {
    id: 4,
    title: 'Meet friend',
    description: 'at the cafe',
    dateFrom: new Date(2023, 8, 5, 10, 30),
    dateTo: new Date(2023, 8, 5, 11, 0),
  },
];

export default events;

console.log(events);