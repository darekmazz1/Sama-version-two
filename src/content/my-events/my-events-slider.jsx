import { useEffect, useState } from "react";
import { getAllContentEventsUser } from "../../api/ApiGetInformation";
import EventsSlide from "../../components/swiper/EventsSlide";
import Loader from "../../components/general/Loader";

export default function MyEventsSlider() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllContentEventsUser();
      setData(data);
    };

    getData();
  }, []);

  return (
    <div className='text-white'>
      {data ? (
        data.length > 0 ? (
          <EventsSlide data={data} noMap={true} />
        ) : (
          <div className='w-full h-[753px] flex justify-center items-center'>
            <h1 className='text-[24px] '>There are no events yet</h1>
          </div>
        )
      ) : (
        <div className='w-full h-[753px] flex justify-center items-center'>
          <Loader />
        </div>
      )}
    </div>
  );
}
