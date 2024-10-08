import { getDay, mapImage, getDate, getYear, parseText } from '../../utils/general';
import ButtonTwo from '../buttons/ButtonTwo';

const NewsCard = ({ data }) => {
  const map_data = data.attributes;

  return (
    <div className='border'>
      <img className='w-full h-[188px] object-cover ' src={mapImage(map_data?.image)} alt='' />

      <div className='p-[24px]'>
        <p className='text-[20px] font-roboto h-[55px] leading-7 overflow-auto font-[700]'>{map_data?.title}</p>

        <p
          className='mt-[8px] font-roboto text-[16px] h-[110px] overflow-auto'
          dangerouslySetInnerHTML={{ __html: parseText(map_data?.description) }}
        />

        <div className='flex justify-between items-center mt-[24px]'>
          <div className='flex items-center gap-[10px]'>
            <img className='w-[32px] h-[32px] object-cover rounded-full' src={mapImage(map_data?.user_photo)} alt='' />
            <div>
              <p className='text-[14px] font-roboto'>{map_data?.user_name}</p>
              <p className='font-roboto text-[14px] uppercase'>
                {getDay(map_data?.date)} {getDate(map_data?.date)} {getYear(map_data?.date)}
              </p>
            </div>
          </div>

          <ButtonTwo text='View more' />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
