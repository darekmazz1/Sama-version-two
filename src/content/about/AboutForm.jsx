import Button from '../../components/buttons/Button';
import { parseText } from '../../utils/general';

const AboutForm = ({ data }) => {
  const map_data = data?.data?.attributes;

  return (
    <section>
      <div className='container_all text-white py-[40px] md:py-[112px]'>
        <h2 className='text-[36px] font-bitter text-center font-[700]  '>Contact us</h2>
        <p className='mt-[16px] text-center text-paragraph font-roboto' dangerouslySetInnerHTML={{ __html: parseText(map_data?.form_description) }} />

        <form className='flex flex-col gap-[24px] mt-[48px]'>
          <InputField label={'Name'} type={'text'} />
          <InputField label={'Email'} type={'email'} />
          <InputField label={'Message'} type={'text'} area={true} />

          <div className='flex items-center gap-[8px]'>
            <div className='w-[20px] h-[20px] rounded-[2pxs] bg-white'></div>
            <p>Please add me to your mailing list!</p>
          </div>

          <div className='inline-block m-auto'>
            <Button text={'Submit'} style={'bg-purple border_purple'} />
          </div>
        </form>
      </div>
    </section>
  );
};

const InputField = ({ label, type, area = false }) => {
  const styles = 'block p-[12px] w-full mt-[8px] text-black font-roboto';

  return (
    <label htmlFor=''>
      {label}

      {!area ? (
        <input className={styles} type={type} />
      ) : (
        <textarea className={styles} rows={6} placeholder='Type your message...' type={type}></textarea>
      )}
    </label>
  );
};

export default AboutForm;
