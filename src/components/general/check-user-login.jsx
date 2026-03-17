import { useEffect } from "react";
import Button from "../buttons/Button";
import SvgX from "../../svg/SvgX";
import useModalRegister from "../../store/useModalRegister";

export const CheckUserLogin = () => {
  const { isOpen, openModal, closeModal } = useModalRegister();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      openModal();
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center '>
      <div className='absolute bg-black top-0 left-0 w-full h-screen z-0 opacity-60 backdrop-blur-sm'></div>

      <div className='bg-dark_blue relative z-10 text-white md:w-[390px] w-[80%] md:px-[50px] px-[20px] md:py-[40px] py-[20px]'>
        <div className='flex items-end justify-end'>
          <div className='w-[25px] cursor-pointer' onClick={handleCloseModal}>
            <SvgX />
          </div>
        </div>

        <div className='py-[32px] px-[24px]'>
          <p className='text-[32px] font-bitter font-[700] leading-[120%] text-center'>Sign in to SAMA</p>
          <p className='font-inter text-[16px] text-center font-[300] leading-[160%] my-[45px]'>
            Sign in to see more events, save your favorites, and get personalized recommendations.
          </p>

          <a onClick={handleCloseModal} href='/login'>
            <Button client:visible text='Sign in' style='text-white w-full' type_button={2} onClick={null} />
          </a>
          <a
            onClick={handleCloseModal}
            href='https://kind-courtesy-production.up.railway.app/api/connect/google'
            className='border rounded-[8px] flex items-center gap-[20px] p-[12px] mt-[16px] cursor-pointer'
          >
            <img src='/assets/social/Google.svg' alt='google' />
            <p className="text-nowrap">Continue with Google</p>
          </a>
        </div>
      </div>
    </div>
  );
};
