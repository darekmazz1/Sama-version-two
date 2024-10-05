import React from 'react';

const Button = ({ text, style, onClick }) => {
  return <button onClick={onClick} className={`p-[12px] border rounded-[8px] text-[16px] font-roboto ${style}`}>{text}</button>;
};

export default Button;
