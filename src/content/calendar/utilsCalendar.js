export function groupEventsByMonth(events) {
  const monthsOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Inicializa el acumulador para cada año y mes
  const acc = {};

  events.forEach((event) => {
    if (!event.attributes || !event.attributes.date) {
      return;
    }

    const eventDate = new Date(event.attributes.date);
    const year = eventDate.getFullYear();
    const month = eventDate.toLocaleString('en-US', { month: 'long' });

    // Inicializa el año si no existe en el acumulador
    if (!acc[year]) acc[year] = {};

    // Inicializa el mes dentro del año si no existe
    if (!acc[year][month]) acc[year][month] = [];

    // Agrega el evento al mes correspondiente dentro del año
    acc[year][month].push(event);
  });

  // Ordena los eventos en cada mes y organiza el orden de los meses en cada año
  Object.keys(acc).forEach((year) => {
    acc[year] = monthsOrder.reduce((result, month) => {
      if (acc[year][month]) {
        result[month] = acc[year][month].sort((a, b) => {
          const dateA = new Date(a.attributes.date);
          const dateB = new Date(b.attributes.date);
          return dateA - dateB;
        });
      }
      return result;
    }, {});
  });

  return acc;
}

export function getDaysEvents() {
  const num = [];

  for (let i = 1; i <= 31; i++) {
    num.push(i);
  }

  return num;
}

export const getClosestEvent = ({ data }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let closestEvent = null;
  let minDifference = Infinity;

  data.forEach((eventObj) => {
    const eventDate = new Date(eventObj.attributes.date);
    eventDate.setHours(0, 0, 0, 0);

    const difference = Math.abs(eventDate - today);

    if (difference < minDifference) {
      minDifference = difference;
      closestEvent = eventObj;
    }
  });

  return closestEvent || null;
};
