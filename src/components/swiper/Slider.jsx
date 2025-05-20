import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import useWindowWidth from '../../hooks/useWindowWidth';

import { Pagination, Navigation } from 'swiper/modules';

export default function Slider({ children, arrow_right, arrow_left }) {
  const responsive = useWindowWidth();

  return (
    <Swiper
      pagination={true}
      modules={[Pagination, Navigation]}
      slidesPerView={responsive < 768 ? 1.1 : responsive > 1028 ? 3.4 : 2.1}
      spaceBetween={20}
      navigation={{
        nextEl: `.${arrow_right}`,
        prevEl: `.${arrow_left}`,
      }}
      className='swiper_general '
    >
      {children}
    </Swiper>
  );
}
