import { useState, useRef, useEffect } from 'react';
import { getDaysEvents, groupEventsByMonth } from './utilsCalendar';
import EventCard from '../../components/events/EventCard';
import { Link, scroller, Element } from 'react-scroll';
import useWindowWidth from '../../hooks/useWindowWidth';
import SvgView from '../../svg/SvgView';
import EventCardTwo from '../../components/events/EventCardTwo';

const CalendarLayout = ({ data }) => {
  const responsive = useWindowWidth();

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [cardView, setCardView] = useState(true);
  const [activeScroll, setActiveScroll] = useState(true);

  const [calendarData, setCalendarData] = useState([]);

  const eventsByMonth = groupEventsByMonth(data);
  const monthsContainerRef = useRef(null);
  const numbers = getDaysEvents();

  useEffect(() => {
    if (eventsByMonth) {
      setCalendarData(eventsByMonth[selectedYear]);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedMonth && monthsContainerRef.current) {
      const activeButton = monthsContainerRef.current.querySelector(`.month-button.text-white`);

      if (activeButton) {
        const container = monthsContainerRef.current;
        const offset = -20;

        const buttonPosition = activeButton.offsetLeft;
        const containerWidth = container.offsetWidth;
        const buttonWidth = activeButton.offsetWidth;

        const newScrollLeft = buttonPosition - containerWidth / 2 + buttonWidth / 2 - offset;

        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedMonth]);

  const getClosestEvent = () => {
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

  useEffect(() => {
    const closestEvent = getClosestEvent();

    if (closestEvent) {
      const eventDate = new Date(closestEvent.attributes.date);
      const monthName = eventDate.toLocaleString('default', { month: 'long' });

      setSelectedMonth(monthName);
      setSelectedDay(eventDate.getDate());

      scroller.scrollTo(`event-${closestEvent.id}`, {
        duration: 800,
        delay: 0,
        smooth: '',
        offset: -250,
      });
    }
  }, []);

  const handleDayClick = (num) => {
    setSelectedDay(num);

    const eventsInMonth = eventsByMonth[selectedMonth];

    if (eventsInMonth) {
      const eventForDay = eventsInMonth.find((event) => {
        const eventDate = new Date(event.attributes.date).getDate();
        return eventDate === num;
      });

      if (eventForDay) {
        scroller.scrollTo(`event-${eventForDay.id}`, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -250,
        });
      }
    }
  };

  const scrollElemet = (month) => {
    if (activeScroll) {
      setSelectedMonth(month);
    } else {
      setTimeout(() => {
        setActiveScroll(true);
      }, 500);
    }
  };

  return (
    <div className='text-white container_all'>
      <div className='flex gap-[20px] items-center justify-center overflow-auto'>
        {Object.keys(eventsByMonth).map((year) => (
          <div key={year}>
            <p
              onClick={() => setSelectedYear(year)}
              className={` cursor-pointer text-[46px] font-playfair mt-[40px] text-center ${
                String(year) === String(selectedYear) ? 'text-white' : 'text-blue'
              }`}
            >
              {year}
            </p>
          </div>
        ))}
      </div>

      <div
        ref={monthsContainerRef}
        className={`flex gap-[20px] overflow-x-auto sticky top-[120px] mt-[10px] left-0 z-30 md:top-[0px] md:pt-[20px] pb-[10px]  bg-dark_blue`}
      >
        {Object.keys(calendarData).map((month) => (
          <Link
            key={month}
            to={month}
            spy={true}
            smooth={true}
            offset={responsive >= 768 ? -140 : -250}
            duration={500}
            ignoreCancelEvents={true}
            onSetActive={() => scrollElemet(month)}
            onClick={() => {
              setActiveScroll(false);
              setSelectedMonth(month);
            }}
            className={`month-button cursor-pointer transition-all duration-500 h-[60px] ${
              selectedMonth?.toLowerCase() === month?.toLowerCase()
                ? 'text-white text-[46px] font-playfair translate-y-[-12px] font-[700] underline '
                : 'text-blue text-[32px] font-bitter '
            }`}
          >
            {month}
          </Link>
        ))}
      </div>

      <div className='flex gap-[26px] overflow-auto items-center sticky top-[188px] pt-[20px] md:pt-[30px]   md:top-[88px] left-0 z-30 bg-dark_blue'>
        {numbers.map((num) => (
          <p
            key={num}
            onClick={() => handleDayClick(num)}
            className={`cursor-pointer transition-all duration-500  h-[60px] ${
              selectedDay === num ? 'text-white font-playfair text-[48px] translate-y-[-20px] underline' : 'text-blue text-[32px] font-bitter'
            } `}
          >
            {num}
          </p>
        ))}
      </div>

      <div onClick={() => setCardView(!cardView)} className='w-[50px] ml-auto mt-[40px] cursor-pointer'>
        <SvgView type={cardView ? 1 : 2} />
      </div>

      <div className='grid gap-[40px] mt-[40px]'>
        {Object.keys(calendarData || {}).map((month) => (
          <Element name={month} key={month} className={`grid ${cardView ? ' md:grid-cols-2 lg:grid-cols-3 gap-[40px] ' : ' gap-[40px] md:gap-0'}`}>
            {(calendarData[month] || []).map((event, idx) => (
              <Element key={event.id} name={`event-${event.id}`}>
                {cardView ? <EventCard data={event} /> : <EventCardTwo data={event} idx={idx} />}
              </Element>
            ))}
          </Element>
        ))}
      </div>

      <div className='pb-[100px]'></div>
    </div>
  );
};

export default CalendarLayout;
