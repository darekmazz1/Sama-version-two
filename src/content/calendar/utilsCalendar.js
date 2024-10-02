export function groupEventsByMonth(events) {
  const monthsOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const acc = monthsOrder.reduce((acc, month) => {
    acc[month] = [];
    return acc;
  }, {});

  events.forEach((event) => {
    if (!event.attributes || !event.attributes.date) {
      return;
    }
    const eventDate = new Date(event.attributes.date);

    const month = eventDate.toLocaleString('en-US', { month: 'long' });

    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
  });

  return monthsOrder
    .filter((month) => acc[month].length > 0)
    .reduce((result, month) => {
      result[month] = acc[month].sort((a, b) => {
        const dateA = new Date(a.attributes.date);
        const dateB = new Date(b.attributes.date);
        return dateA - dateB;
      });
      return result;
    }, {});
}

export function getDaysEvents() {
  const num = [];

  for (let i = 1; i <= 31; i++) {
    num.push(i);
  }

  return num;
}


export const getClosestEvent = ({data}) => {
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