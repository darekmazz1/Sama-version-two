export function parseText(text) {
  if (!text) return '';

  const boldPattern = /\*\*(.*?)\*\*/g;
  let parsedText = text.replace(boldPattern, '<strong>$1</strong>');

  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
  parsedText = parsedText.replace(linkPattern, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  parsedText = parsedText.replace(/\n/g, '<br>');

  return parsedText;
}

export function mapImage(url) {
  if (!url) return;
  return url?.data?.attributes?.url;
}

export function getDate(date) {
  const options = { month: 'short' };
  const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('en-US', options);
  return formattedDate;
}

export function getDay(date) {
  const parsedDate = new Date(date);
  const day = parsedDate.getUTCDate(); 

  return day < 10 ? `0${day}` : `${day}`;
}

export function getYear(date) {
  const year = new Date(date).getFullYear();
  return year;
}

export function getUpcomingEvents(events) {
  const today = new Date();

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.attributes.date);
    return eventDate > today;
  });

  const sortedEvents = upcomingEvents.sort((a, b) => {
    const dateA = new Date(a.attributes.date);
    const dateB = new Date(b.attributes.date);
    return dateA - dateB;
  });

  return sortedEvents.slice(0, 6);
}
