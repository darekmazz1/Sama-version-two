import { SwiperSlide } from 'swiper/react';
import EventCard from '../events/EventCard';
import Slider from './Slider';

const EventsSlide = ({ data }) => {
  return (
    <Slider>
      {data.map((eventData, index) => (
        <SwiperSlide key={index}>
          <EventCard data={eventData} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default EventsSlide;
