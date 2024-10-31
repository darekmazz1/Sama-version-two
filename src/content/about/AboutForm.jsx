import { useEffect, useState } from 'react';
import Button from '../../components/buttons/Button';
import { parseText } from '../../utils/general';
import { validateEmail, validateMessage, validateName } from '../../hooks/useValidators';
import emailjs from '@emailjs/browser';

const AboutForm = ({ data }) => {
  const map_data = data?.data?.attributes;

  const [activeButton, setActiveButton] = useState(false);
  const [sendedData, setSendedData] = useState('Submit');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    // accept: false,
  });

  const handleInformation = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const name_field = validateName(formData.name);
    const email_field = validateEmail(formData.email);
    const message_field = validateMessage(formData.message);

    const result = [name_field, email_field, message_field];
    const hasNoErrors = result.every((field) => field === null);

    setActiveButton(hasNoErrors ? true : false);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activeButton) return;

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxouW7YSYV7A2YOkqc8cm1yBCNM6jIw2j_vbPFKxasqOOM5ZmP2a5EU48I53MDjKMkB/exec',
        {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
          // mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error en el envío del formulario');
      }

      setSendedData('Submitted');
    } catch (error) {
      setSendedData('Error');
      console.error(error);
    }
  };

  return (
    <section>
      <div className='container_all text-white py-[40px] md:py-[112px]'>
        <h2 className='text-[36px] font-bitter text-center font-[700]'>Contact us</h2>
        <p
          className='mt-[16px] md:text-center text-paragraph font-roboto'
          dangerouslySetInnerHTML={{ __html: parseText(map_data?.form_description) }}
        />

        <form className='flex flex-col gap-[24px] mt-[48px]' onSubmit={handleSubmit}>
          <InputField label={'Name'} type={'text'} name={'name'} onChange={handleInformation} guide={'John Doe'} />
          <InputField label={'Email'} type={'email'} name={'email'} onChange={handleInformation} guide={'darek@samamusicarts.com'} />
          <InputField label={'Message'} type={'text'} area={true} name={'message'} onChange={handleInformation} />

          <div className='flex items-center gap-[8px]'>
            <div
              onClick={() => setFormData((prevdata) => ({ ...prevdata, accept: !formData.accept }))}
              className={`w-[20px] h-[20px] rounded-[2pxs] cursor-pointer  ${formData.accept ? 'bg-purple' : 'bg-white'}`}
            ></div>
            <p>Please add me to your mailing list!</p>
          </div>

          <div className={`inline-block m-auto cursor-pointer ${!activeButton && 'pointer-events-none'}`}>
            <Button type='submit' text={sendedData} type_button={1} style={`${activeButton ? 'bg-purple border_purple' : 'bg-gray border_gray'}`} />
          </div>
        </form>
      </div>
    </section>
  );
};

const InputField = ({ label, type, area = false, name, onChange, guide }) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = `block p-[12px] w-full mt-[8px] text-black input_focus`;

  return (
    <label className='relative' htmlFor=''>
      {label}

      {!area ? (
        <input name={name} className={styles} type={type} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
      ) : (
        <textarea
          className={styles}
          name={name}
          rows={6}
          onChange={onChange}
          placeholder='Type your message...'
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></textarea>
      )}

      <p
        className={`text-yellow transition-all duration-500 absolute bottom-[-25px] font-roboto text-[16px] opa ${
          isFocused && !area ? 'opacity-90' : 'opacity-0 pointer-events-none'
        }`}
      >
        {guide}
      </p>
    </label>
  );
};

export default AboutForm;
