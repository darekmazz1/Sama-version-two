import Slider from './Slider';
import { SwiperSlide } from 'swiper/react';
import NewsCard from '../news/NewsCard';
import SvgArrow from '../../svg/news/SvgArrow';

const NewsSlide = ({ data }) => {
  return (
    <div className='relative'>
      <div className='absolute bottom-[-60px] z-30 left-0 flex gap-[50px]'>
        <div className='arrow_left_news w-[30px] rotate-[180deg] cursor-pointer'>
          <SvgArrow />
        </div>
        <div className='arrow_right_news w-[30px] cursor-pointer'>
          <SvgArrow />
        </div>
      </div>
      <Slider arrow_left={'arrow_left_news'} arrow_right={'arrow_right_news'}>
        {data.map((eventData, index) => (
          <SwiperSlide key={index}>
            <NewsCard data={eventData} />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSlide;
