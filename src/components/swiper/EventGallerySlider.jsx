import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import SvgArrow from '../../svg/news/SvgArrow';

const EventGallerySlider = ({ data }) => {
  if (!data) return;

  const map_data = data.gallery;
  const buttonStyles =
    'bg-black border rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer absolute top-[200px] z-40 hidden md:flex';

  return (
    <div className='relative'>
      <div>
        <div className={`arrow_right right-[10px] ${buttonStyles}`}>
          <div className='w-[20px]'>
            <SvgArrow />
          </div>
        </div>

        <div className={`arrow_left left-[10px] ${buttonStyles}`}>
          <div className='w-[20px] rotate-[180deg]'>
            <SvgArrow />
          </div>
        </div>
      </div>

      <Swiper
        pagination={true}
        modules={[Pagination, Navigation]}
        slidesPerView={'auto'}
        spaceBetween={20}
        className='swiper_gallery'
        navigation={{
          nextEl: `.arrow_right`,
          prevEl: `.arrow_left`,
        }}
      >
        {map_data?.data?.map((image, index) => (
          <SwiperSlide className='max-w-[144px] md:max-w-[416px]' key={index}>
            <img className='w-full h-[144px] md:h-[416px] object-cover' src={image.attributes.url} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventGallerySlider;
``;
