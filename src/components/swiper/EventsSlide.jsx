import { SwiperSlide } from "swiper/react";
import EventCard from "../events/EventCard";
import Slider from "./Slider";
import SvgArrow from "../../svg/news/SvgArrow";
import { useEffect, useState } from "react";

import Button from "../buttons/Button";
import useWindowWidth from "../../hooks/useWindowWidth";

const EventsSlide = ({ data, noMap = false }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div>
      <div className='hidden md:block '>
        <EventsDesktop data={data} noMap={noMap} isToken={token} />

        <div className={`mt-[22px] flex justify-end  ${!token ? "hidden " : "block "}`}>
          <a href='/calendar'>
            <Button client:visible text='View all events' style='' type_button={2} onClick={null} />
          </a>
        </div>
      </div>
      <div className='md:hidden'>
        <EventsMobile data={data} noMap={noMap} isToken={token} />
      </div>
    </div>
  );
};

export default EventsSlide;

const EventsDesktop = ({ data, noMap = false, isToken }) => {
  const windowWidth = useWindowWidth();
  const limitedData = isToken ? data : data?.slice(0, windowWidth > 1024 ? 5 : 3);

  return (
    <div className='relative '>
      <div className={`absolute  z-30 left-0 flex gap-[50px] ${!isToken ? "bottom-[80px] " : "bottom-[-60px] "}`}>
        <div className='arrow_left w-[30px] rotate-[180deg] cursor-pointer'>
          <SvgArrow />
        </div>
        <div className='arrow_right w-[30px] cursor-pointer'>
          <SvgArrow />
        </div>
      </div>

      <div className='relative '>
        <Slider arrow_right={"arrow_right"} arrow_left={"arrow_left"}>
          <>
            {limitedData?.map((eventData, index) => {
              return (
                <SwiperSlide key={index}>
                  <EventCard data={eventData} noMap={noMap} isToken={isToken} />
                </SwiperSlide>
              );
            })}
          </>

          {!isToken && (
            <div className='flex justify-center flex-col items-center mt-[30px] '>
              <p className='text-[20px] font-[500] leading-[140%] font-bitter text-center pt-[16px]'>Sign in to see more events</p>
              <a className='pt-[21px]' href='/login'>
                <Button client:visible text='Sign in' style='min-w-[120px]' type_button={2} onClick={null} />
              </a>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

const EventsMobile = ({ data, noMap = false, isToken }) => {
  const limitedData = isToken ? data : data?.slice(0, 3);

  return (
    <div className='grid gap-[40px] mt-[40px] relative'>
      {limitedData?.map((eventData, index) => {
        return (
          <div className='relative' key={eventData.id}>
            <EventCard data={eventData} noMap={noMap} isToken={isToken} />
            {!isToken && index === 2 && (
              <div className='flex justify-center flex-col items-center pb-[100px]'>
                <p className='text-[32px] font-[700] leading-[120%] font-bitter pt-[51px]'>Sign in to SAMA</p>
                <p className='font-inter text-[16px] leading-[160%] font-[300] text-center py-[24px]'>
                  Sign in to see more events, save your favorites, and get personalized recommendations.
                </p>
                <a className='w-[80%] m-auto' href='/login'>
                  <Button client:visible text='Sign in' style='w-full' type_button={2} onClick={null} />
                </a>

                <a
                  href='https://kind-courtesy-production.up.railway.app/api/connect/google'
                  className='border rounded-[8px] flex items-center gap-[20px] p-[12px] mt-[16px] cursor-pointer w-[80%] m-auto'
                >
                  <img src='/assets/social/Google.svg' alt='google' />
                  <p>Continue with Google</p>
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
