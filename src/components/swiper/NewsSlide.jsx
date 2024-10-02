import Slider from './Slider';
import { SwiperSlide } from 'swiper/react';
import NewsCard from '../news/NewsCard';

const NewsSlide = ({ data }) => {
  return (
    <Slider>
      {data.map((eventData, index) => (
        <SwiperSlide key={index}>
          <NewsCard data={eventData} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default NewsSlide;
