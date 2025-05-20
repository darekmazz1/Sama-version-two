import { useState, useEffect } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import SvgBurgerMenu from "../../svg/navbar/SvgBurgerMenu";
import SvgLogoMenu from "../../svg/navbar/SvgLogoMenu";
import SvgX from "../../svg/SvgX";
import Button from "../buttons/Button";

const Navbar = ({ data }) => {
  const responsive = useWindowWidth();
  const [token, setToken] = useState(null);

  const map_data = data?.data?.attributes?.navbar_item;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <navbar>
      {responsive >= 768 ? (
        <div className='bg-dark_blue'>
          <div className='container_all'>
            <MenuDesktop fields={map_data} token={token} />
          </div>
        </div>
      ) : (
        <div className='fixed top-0 left-0 w-full z-40 bg-dark_blue '>
          <div className='container_all'>
            <MenuMobile fields={map_data} token={token} />
          </div>
        </div>
      )}
    </navbar>
  );
};

const MenuMobile = ({ fields, token }) => {
  const [openedModal, setOpenedModal] = useState(false);

  useEffect(() => {
    if (openedModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openedModal]);

  return (
    <div>
      <div className='flex justify-between items-center pt-[47px] pb-[33px]'>
        <div onClick={() => setOpenedModal(true)} className='w-[40px]'>
          <SvgBurgerMenu />
        </div>

        <a href='/'>
          <div className='w-[120px]'>
            <SvgLogoMenu />
          </div>
        </a>
      </div>

      <div
        className={`fixed bg-dark_blue top-0 left-0 w-full z-50 h-[100dvh] flex justify-center items-center transition-all duration-500 ${
          openedModal ? " translate-x-0 opacity-100" : "translate-x-[-100%] opacity-0"
        }`}
      >
        <div className='container_all h-screen flex flex-col justify-between py-[60px]'>
          <div onClick={() => setOpenedModal(false)} className='w-[30px] '>
            <SvgX />
          </div>

          <div className='flex gap-[15px] flex-col '>
            {fields.map((field) => (
              <a
                key={field.text}
                onClick={() => setOpenedModal(false)}
                target={field.is_external ? "_blank" : "_self"}
                className='text-white text-[36px] font-playfair'
                href={field.link}
              >
                {field.text}
              </a>
            ))}
          </div>

          {!token ? (
            <a className='w-[100px]' href='/login'>
              <Button client:visible text='Sign in' style='text-white w-full  max-w-[150px]' type_button={2} onClick={null} />
            </a>
          ) : (
            <div
              className='w-[100px]'
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              <Button client:visible text='Sign out' style='text-white w-full bg-transparent border-none max-w-[150px]' type_button={2} onClick={null} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MenuDesktop = ({ fields, token }) => {
  const currentPath = window.location.pathname;

  return (
    <div className='flex justify-between items-center py-[40px]  gap-[70px]  text-white'>
      <a className='flex  flex-1' href='/'>
        <div className='w-[120px]'>
          <SvgLogoMenu />
        </div>
      </a>

      <div className='flex gap-[20px]'>
        {fields.map((field, idx) => {
          const isActive = field.link === "/" ? currentPath === "/" : currentPath.includes(field.id);

          return (
            <a className={`text-[20px] font-bitter font-[500] ${isActive ? "text-blue" : ""}`} href={field.link} target={field.is_external ? "_blank" : "_self"} key={idx}>
              {field.text}
            </a>
          );
        })}
      </div>

      {!token ? (
        <a className='w-[100px]' href='/login'>
          <Button client:visible text='Sign in' style='text-white w-full ' type_button={2} onClick={null} />
        </a>
      ) : (
        <div
          className='w-[100px]'
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          <Button client:visible text='Sign out' style='text-white w-full bg-transparent border-none ' type_button={2} onClick={null} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
