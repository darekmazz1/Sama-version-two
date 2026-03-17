import { useEffect, useState } from "react";
import useEventsStore from "../../store/useEventsStore";
import useModalRegister from "../../store/useModalRegister";
import SvgHeart from "../../svg/eventCard/SvgHeart";

export default function EventLikeButton({ idEvent }) {
  const { isEventLiked, toggleLike } = useEventsStore();
  const { openModal } = useModalRegister();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleLike = async () => {
    if (token) {
      await toggleLike(idEvent);
    } else {
      openModal();
    }
  };

  return (
    <div onClick={handleLike} className='w-[32px] cursor-pointer'>
      <SvgHeart isLiked={isEventLiked(idEvent)} />
    </div>
  );
}
