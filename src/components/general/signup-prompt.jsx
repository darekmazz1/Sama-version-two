import { useEffect, useState } from "react";
import SvgX from "../../svg/SvgX";

const DISMISSED_KEY = "signup_prompt_dismissed";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const SignupPrompt = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    const expired = !dismissedAt || Date.now() - Number(dismissedAt) > SEVEN_DAYS_MS;
    if (!token && expired) {
      const timer = setTimeout(() => setVisible(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black opacity-60' onClick={dismiss} />

      {/* Modal */}
      <div className='relative z-10 bg-dark_blue text-white w-full sm:w-[480px] rounded-t-[16px] sm:rounded-[16px] px-8 py-10 mx-0 sm:mx-4'>
        <button
          onClick={dismiss}
          className='absolute top-4 right-4 w-[24px] opacity-70 hover:opacity-100 transition-opacity cursor-pointer'
          aria-label='Close'
        >
          <SvgX />
        </button>

        <p className='text-[24px] font-bitter font-[500] mb-3'>Save your favorite shows</p>
        <p className='text-white/70 text-[15px] mb-6 leading-relaxed'>
          Create a free account to save events and get personalized updates.
        </p>

        <div className='flex flex-col sm:flex-row gap-3'>
          <a
            href='/register'
            className='flex-1 text-center bg-white text-dark_blue font-semibold rounded-[8px] py-3 hover:bg-white/90 transition-colors'
          >
            Create account
          </a>
          <a
            href='/login'
            className='flex-1 text-center border border-white/40 rounded-[8px] py-3 hover:border-white/80 transition-colors'
          >
            Log in
          </a>
        </div>

        <button
          onClick={dismiss}
          className='mt-4 w-full text-center text-white/50 hover:text-white/80 text-sm transition-colors cursor-pointer'
        >
          Continue without an account
        </button>
      </div>
    </div>
  );
};

export default SignupPrompt;
