import React, { useState } from 'react';
import Button from '../../components/buttons/Button';

const NewsletterSection = ({ data }) => {
  const map_data = data?.data?.attributes;
  const [textButton, setTextButton] = useState('Sign up');

  const sendLead = async () => {
    const emailInput = document.getElementById('newsletter-email'); // Explicitly cast to HTMLInputElement
    const email = emailInput?.value;

    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    const formData = new FormData();
    formData.append('EMAIL', email);
    formData.append('b_40733cdcd44d50c81041bcf0d_2b87bef93a', ''); // Honeypot field for Mailchimp

    try {
      const response = await fetch('https://samamusicarts.us20.list-manage.com/subscribe/post?u=40733cdcd44d50c81041bcf0d&amp;id=2b87bef93a', {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      if (response.ok || response.type === 'opaque') {
        setTextButton('Succesfully');

        setTimeout(() => {
          setTextButton('Sign up');
        }, 4000);
        emailInput.value = '';
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section className='bg-light_purple mt-[40px] md:mt-[80px] py-[40px] px-[24px] md:px-[80px] rounded-[24px]'>
      <p className='text-[36px] font-playfair max-w-[470px] md:leading-10'>{map_data?.newsletter_title}</p>
      <p className='mt-[40px] text-[24px] font-bitter max-w-[600px]'>{map_data?.newsletter_description}</p>

      <div className='md:flex md:gap-[40px] md:mt-[40px]'>
        <input id='newsletter-email' className='bg-white text-black w-full p-[12px] text-[16px] mt-[40px] md:w-[350px] md:mt-0' placeholder='Email' type='email' />
        <div className='mt-[40px] md:mt-0'>
          <Button text={textButton} style={null} onClick={sendLead} />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
