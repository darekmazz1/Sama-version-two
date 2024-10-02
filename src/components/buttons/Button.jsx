import React from 'react';

const Button = ({ text, style }) => {
  return <button className={`p-[12px] border rounded-[8px] text-[16px] font-roboto ${style}`}>{text}</button>;
};

export default Button;
