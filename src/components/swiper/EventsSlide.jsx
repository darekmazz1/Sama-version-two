import { SwiperSlide } from 'swiper/react';
import EventCard from '../events/EventCard';
import Slider from './Slider';
import SvgArrow from '../../svg/news/SvgArrow';

const EventsSlide = ({ data }) => {
  return (
    <div className='relative'>
      <div className='absolute bottom-[-60px] z-30 left-0 flex gap-[50px]'>
        <div className='arrow_left w-[30px] rotate-[180deg] cursor-pointer'>
          <SvgArrow />
        </div>
        <div className='arrow_right w-[30px] cursor-pointer'>
          <SvgArrow />
        </div>
      </div>
      <Slider arrow_right={'arrow_right'} arrow_left={'arrow_left'}>
        {data.map((eventData, index) => (
          <SwiperSlide key={index}>
            <EventCard data={eventData} />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
};

export default EventsSlide;
