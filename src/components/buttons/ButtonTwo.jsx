import React from 'react';
import SvgArrow from '../../svg/news/SvgArrow';

const ButtonTwo = ({ text }) => {
  return (
    <button className='flex items-center gap-[8px] text-[16px] font-roboto'>
      {text}
      <div className='w-[25px]'>
        <SvgArrow />
      </div>
    </button>
  );
};

export default ButtonTwo;
