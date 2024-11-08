import useStoreModalShare from '../../store/useStoreModalShare';
import { getDate, getDay, mapImage } from '../../utils/general';
import SvgMapAim from '../../svg/eventCard/SvgMapAim';
import Button from '../buttons/Button';
import SvgShare from '../../svg/SvgShare';

const EventCardTwo = ({ data, idx }) => {
  const map_data = data?.attributes;

  const { toggleState, setTitle, setDescription, setUrl } = useStoreModalShare();

  return (
    <div className='border_my bg-dark_blue relative  p-[16px] md:p-0'>
      {idx === 0 && <div className='border_t  hidden md:block'></div>}
      {/* mb-[24px] */}
      <div className='md:flex md:justify-between md:items-center'>
        <div className='flex items-start md:items-center gap-[10px]'>
          <div className='bg-white md:absolute top-[30px] md:left-[20px] text-black py-[8px] px-[10px] font-[700] rounded-[6px] opacity-80 font-inter flex justify-center items-center flex-col'>
            <p className='text-[16px] uppercase'>{getDate(map_data?.date)}</p>
            <p className='text-[40px] leading-10'>{getDay(map_data?.date)}</p>
          </div>

          <img className='w-[230px] h-[170px] object-cover hidden md:block' src={mapImage(map_data?.image)} alt='' />

          <div className=''>
            <p className='text-[24px] font-playfair leading-7 h-[60px]  md:leading-10 overflow-auto md:text-[36px] md:h-[90px] md:max-w-[500px]'>
              {map_data?.event_title}
            </p>
            <div className='flex justify-center items-start gap-[10px]'>
              <div className='w-[30px] flex-shrink-0 hidden md:block'>
                <SvgMapAim />
              </div>
              <div className='flex-grow'>
                <p className='text-[16px] uppercase font-inter'>{map_data?.venues}</p>
                <p className='text-[14px] opacity-80 font-inter font-[300]'>{map_data?.venues_address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center mt-[16px]  md:flex-col md:gap-[30px]'>
          <a className='order-1' href={`/event/${data?.id}`}>
            <Button text='More info' />
          </a>
          <div onClick={toggleState} className='w-[35px] cursor-pointer'>
            <SvgShare />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardTwo;
