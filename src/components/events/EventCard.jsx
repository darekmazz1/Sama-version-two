import { mapImage, getDate, getDay } from '../../utils/general';
import SvgClock from '../../svg/eventCard/SvgClock';
import SvgMapAim from '../../svg/eventCard/SvgMapAim';
import Button from '../buttons/Button';
import SvgShare from '../../svg/SvgShare';
import useStoreModalShare from '../../store/useStoreModalShare';

const EventCard = ({ data }) => {
  const map_data = data?.attributes;

  const { toggleState, setTitle, setDescription, setUrl } = useStoreModalShare();

  return (
    <div className='border bg-dark_blue relative'>
      <div className='bg-white text-black absolute top-[19px] left-[19px] py-[8px] px-[15px] font-[700] rounded-[6px] opacity-80 font-inter flex justify-center items-center flex-col'>
        <p className='text-[16px] uppercase'>{getDate(map_data?.date)}</p>
        <p className='text-[40px] leading-10'>{getDay(map_data?.date)}</p>
      </div>

      <img className='w-full h-[200px] object-cover' src={mapImage(map_data?.image)} alt='' />

      <div className='px-[26px] py-[42px]'>
        <p className='text-[36px] font-playfair leading-1 text_thre_lines  '>{map_data?.event_title} </p>

        <div className='flex mt-[34px] gap-[40px]'>
          <div className='flex justify-center items-start gap-[10px]'>
            <div className='w-[30px] flex-shrink-0'>
              <SvgClock />
            </div>
            <div className='flex-grow'>
              <p className='text-[12px] font-roboto'>START</p>
              <p className='text-[16px]'>{map_data?.start}</p>
            </div>
          </div>

          <div className='opacity-80'>
            <p className='text-[12px] font-roboto'>DOORS</p>
            <p className='text-[16px]'>{map_data?.doors}</p>
          </div>
        </div>

        <div className='flex justify-center items-start gap-[10px] mt-[16px]'>
          <div className='w-[30px] flex-shrink-0'>
            <SvgMapAim />
          </div>
          <div className='flex-grow'>
            <p className='text-[16px] uppercase font-inter text_two_lines'>{map_data?.venues}</p>
            <p className='text-[14px] opacity-80 font-inter font-[300] text_two_lines'>{map_data?.venues_address}</p>
          </div>
        </div>

        <div className='flex justify-between items-center mt-[16px]'>
          <a href={`/event/${data?.id}`}>
            <Button text='More info' />
          </a>
          <div
            onClick={() => {
              toggleState();
              setTitle(map_data?.event_title);
              setDescription(map_data?.artists_performing);
              setUrl(`https://test.samamusicarts.com/event/${data?.id}`);
            }}
            className='w-[40px] cursor-pointer'
          >
            <SvgShare />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
