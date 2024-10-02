import useStoreModalShare from '../../store/useStoreModalShare';
import SvgX from '../../svg/SvgX';

const ModalShare = () => {
  const { toggleState, active } = useStoreModalShare();

  const openPopupCenter = (url, title, w, h) => {
    const left = window.innerWidth / 2 - w / 2;
    const top = window.innerHeight / 2 - h / 2;
    return window.open(url, title, `width=${w},height=${h},top=${top},left=${left}`);
  };

  const shareViaFacebook = () => {
    const url = encodeURIComponent('https://example.com');
    const popupUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    openPopupCenter(popupUrl, 'Facebook Share', 600, 400);
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent('Este es el título. Aquí va la descripción. Mira esta imagen: https://url_de_la_imagen.com');
    const popupUrl = `https://api.whatsapp.com/send?text=${text}`;
    openPopupCenter(popupUrl, 'WhatsApp Share', 600, 400);
  };

  const shareViaX = () => {
    const text = encodeURIComponent('Comprueba "Noche de cine en el CGC"');
    const url = encodeURIComponent(
      'https://www.eventbrite.co/e/noche-de-cine-en-el-cgc-tickets-1027787529167?aff=estw&utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-source=tw&utm-term='
    );
    const popupUrl = `https://x.com/intent/post?text=${text}+${url}`;
    openPopupCenter(popupUrl, 'X (Twitter) Share', 600, 400);
  };

  const shareViaMail = () => {
    const subject = encodeURIComponent('Este es el título del contenido');
    const body = encodeURIComponent('Aquí va la descripción del contenido.\n\n¡Mira esta imagen! [https://URL_DE_LA_IMAGEN]');
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaInstagram = () => {
    const url = 'https://example.com';
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('¡Enlace copiado al portapapeles! Pégalo en tu biografía o compártelo en una historia en Instagram.');
      })
      .catch((err) => {
        console.error('Error al copiar el enlace: ', err);
      });
  };

  return (
    <div
      className={` fixed right-0 w-full top-0 h-full z-50  text-white flex flex-col justify-center items-center transition-all duration-500 ${
        active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
    >
      <div className=' bg-dark_blue relative py-[50px] h-[100dvh] md:h-auto z-20 w-full md:w-[700px]  '>
        <div className=' container_all '>
          <div onClick={toggleState} className='w-[30px] ml-auto cursor-pointer'>
            <SvgX />
          </div>

          <p className='text-[32px] font-bitter text-center font-[500] mb-[24px]'>Share</p>

          <div className=' flex gap-[12px] flex-col '>
            <ShareComponent img={'assets/social/Google.svg'} name={'Google'} click={shareViaMail} />
            <ShareComponent img={'assets/social/Facebook.svg'} name={'Facebook'} click={shareViaFacebook} />
            <ShareComponent img={'assets/social/Instagram.svg'} name={'Instagram'} click={shareViaInstagram} />
            <ShareComponent img={'assets/social/Wa.svg'} name={'WhatsApp'} click={shareViaWhatsApp} />
            <ShareComponent img={'assets/social/X.svg'} name={'X/Titter'} click={shareViaX} />
          </div>
        </div>
      </div>

      <div className='bg-black absolute top-0 left-0 w-full h-[100dvh] opacity-20'></div>
    </div>
  );
};

const ShareComponent = ({ img, name, click }) => {
  return (
    <div onClick={click} className='border rounded-[8px] flex gap-[12px] py-[12px] justify-center cursor-pointer'>
      <img src={img} alt={name} />
      <p>Share via {name}</p>
    </div>
  );
};

export default ModalShare;
