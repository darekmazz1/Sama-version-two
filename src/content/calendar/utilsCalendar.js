export function groupEventsByMonth(events) {
  const monthsOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const acc = {};

  events.forEach((event) => {
    if (!event.attributes || !event.attributes.date) {
      return;
    }

    const eventDate = new Date(event.attributes.date + 'T12:00:00');
    const year = eventDate.getFullYear();
    const month = eventDate.toLocaleString("en-US", { month: "long" });

    if (!acc[year]) acc[year] = {};

    if (!acc[year][month]) acc[year][month] = [];

    acc[year][month].push(event);
  });

  Object.keys(acc).forEach((year) => {
    acc[year] = monthsOrder.reduce((result, month) => {
      if (acc[year][month]) {
        result[month] = acc[year][month].sort((a, b) => {
          const dateA = new Date(a.attributes.date + 'T12:00:00');
          const dateB = new Date(b.attributes.date + 'T12:00:00');
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
