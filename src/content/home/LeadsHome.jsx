import React, { useState } from "react";
import Button from "../../components/buttons/Button";

const NewsletterSection = ({ data }) => {
  const map_data = data?.data?.attributes;
  const [textButton, setTextButton] = useState("Sign up");

  return (
    <section className='bg-light_purple mt-[40px] md:mt-[80px] py-[40px] px-[24px] md:px-[80px] rounded-[24px]'>
      <p className='text-[36px] font-playfair max-w-[470px] md:leading-10'>{map_data?.newsletter_title}</p>
      <p className='mt-[40px] text-[24px] font-bitter max-w-[600px]'>{map_data?.newsletter_description}</p>

      <div className='md:flex md:gap-[40px] md:mt-[40px]'>
        <a href='https://samamusicarts.app.neoncrm.com/forms/email-subscription-form' target="" className='mt-[40px] md:mt-0'>
          <Button text={textButton} style={null} onClick={null} />
        </a>
      </div>
    </section>
  );
};

export default NewsletterSection;
