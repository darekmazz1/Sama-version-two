import { useEffect, useState } from "react";
import SvgLogo from "../svg/SvgLogo";

export default function LayoutAuthentication({ children }) {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isRegisterPage, setIsRegisterPage] = useState(false);

  useEffect(() => {
    const pathname = location.pathname;
    const isLoginPage = pathname.endsWith("/login/") || pathname === "/";
    const isRegisterPage = pathname.endsWith("/register/");

    setIsLoginPage(isLoginPage);
    setIsRegisterPage(isRegisterPage);
  }, []);

  return (
    <div className='bg-cover bg-top relative bg-no-repeat  pb-[100px]' style={{ backgroundImage: "url(/assets/bg_home_t.jpg)" }}>
      <div className='container_all pt-[176px] pb-[50px] md:flex md:justify-center md:items-center min-h-[80vh] md:p-0'>
        <div className='lg:w-1/2 md:w-[40%]'>
          <div className='w-[80%] md:w-[230px] lg:max-w-[276px] m-auto'>
            <SvgLogo />
          </div>

          <p className='text-[24px] font-[500] font-bitter leading-[140%] text-white max-w-[353px] m-auto text-center pt-[40px]'>
            Sign up to save and share upcoming shows with your friends!
          </p>
        </div>

        <div className='lg:w-1/2 md:w-[60%] md:px-[40px] lg:px-[90px]'>
          <div className='flex bg-blue_two w-full justify-between rounded-[8px] my-[40px]'>
            <a
              href='/login'
              className={`text-[14px] font-inter font-[600] w-1/2 flex justify-center items-center rounded-[8px] py-[10px] ${
                isLoginPage ? "bg-white text-dark_blue" : "text-gray cursor-pointer"
              }`}
            >
              Sign in
            </a>
            <a
              href='/register'
              className={`text-[14px] font-inter font-[600] w-1/2 flex justify-center items-center rounded-[8px] py-[10px] ${
                isRegisterPage ? "bg-white text-dark_blue" : "text-gray cursor-pointer"
              }`}
            >
              Register
            </a>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
