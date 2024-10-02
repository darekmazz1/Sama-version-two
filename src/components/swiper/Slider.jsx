import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function Slider({ children }) {
  const responsive = useWindowWidth();

  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      slidesPerView={responsive < 768 ? 1.1 : responsive > 1028 ? 3.4 : 2.1}
      spaceBetween={20}
      className='swiper_general'
    >
      {children}
    </Swiper>
  );
}
