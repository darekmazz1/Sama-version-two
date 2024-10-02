import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const EventGallerySlider = ({ data }) => {
  if (!data) return;
  const map_data = data.gallery;

  return (
    <Swiper pagination={true} modules={[Pagination]} slidesPerView={'auto'} spaceBetween={20} className='swiper_gallery'>
      {map_data?.data?.map((image, index) => (
        <SwiperSlide className='max-w-[144px] md:max-w-[416px] ' key={index}>
          <img className=' w-full h-[144px] md:h-[416px] object-cover' src={image.attributes.url} alt='' />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EventGallerySlider;
