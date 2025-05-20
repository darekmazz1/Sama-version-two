import { useEffect } from "react";
import useEventsStore from "../../store/useEventsStore";

export const CheckEventsUser = () => {
  const { fetchLikedEvents } = useEventsStore();

  useEffect(() => {
    fetchLikedEvents();
  }, []);

  return null;
};
