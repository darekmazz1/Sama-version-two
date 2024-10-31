import React from 'react';

const Button = ({ text, style, onClick, type_button = 1 }) => {
  return (
    <div className=''>
      {type_button === 1 && (
        <button
          onClick={onClick}
          className={`p-[12px] border hover:bg-purple rounded-[8px] text-[16px] font-roboto  transition-all duration-300 ${style}`}
        >
          {text}
        </button>
      )}

      {type_button === 2 && (
        <button
          onClick={onClick}
          className={`p-[12px] border bg-purple hover:bg-light_pruple_hover rounded-[8px] text-[16px] font-roboto  transition-all duration-300 ${style}`}
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
