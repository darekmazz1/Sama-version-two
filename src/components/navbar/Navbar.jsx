import { useState } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';
import SvgBurgerMenu from '../../svg/navbar/SvgBurgerMenu';
import SvgLogoMenu from '../../svg/navbar/SvgLogoMenu';
import SvgX from '../../svg/SvgX';

const Navbar = () => {
  const responsive = useWindowWidth();

  const fields = [
    { name: 'Home', href: '/', id: '/' },
    { name: 'Calendar', href: '/calendar', ids: ['/calendar', '/event'] },
    { name: 'News', href: '/news', id: '/news' },
    { name: 'About SAMA', href: '/about', id: '/about' },
  ];

  return (
    <navbar>
      {responsive >= 768 ? (
        <div className='bg-dark_blue'>
          <div className='container_all'>
            <MenuDesktop fields={fields} />
          </div>
        </div>
      ) : (
        <div className='fixed top-0 left-0 w-full z-40 bg-dark_blue '>
          <div className='container_all'>
            <MenuMobile fields={fields} />
          </div>
        </div>
      )}

      <div className=''></div>
    </navbar>
  );
};

const MenuMobile = ({ fields }) => {
  const [openedModal, setOpenedModal] = useState(false);

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
          openedModal ? ' translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'
        }`}
      >
        <div className='container_all translate-y-[-100px]'>
          <div onClick={() => setOpenedModal(false)} className='w-[30px] mb-[52px]'>
            <SvgX />
          </div>

          <div className='flex gap-[20px] flex-col '>
            {fields.map((field) => (
              <a key={field.name} onClick={() => setOpenedModal(false)} className='text-white text-[36px] font-playfair' href={field.href}>
                {field.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuDesktop = ({ fields }) => {
  const currentPath = window.location.pathname;

  return (
    <div className='flex justify-between items-center py-[40px]  text-white'>
      <a href='/'>
        <div className='w-[120px]'>
          <SvgLogoMenu />
        </div>
      </a>

      <div className='flex gap-[40px]'>
        {fields.map((field, idx) => {
          const isActive =
            field.href === '/'
              ? currentPath === '/'
              : Array.isArray(field.ids)
              ? field.ids.some((id) => currentPath.includes(id))
              : currentPath.includes(field.id);

          return (
            <a className={`text-[24px] font-bitter ${isActive ? 'text-blue' : ''}`} href={field.href} key={idx}>
              {field.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
