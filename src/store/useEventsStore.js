import { create } from "zustand";
import { getEventsUser, likeUser } from "../api/ApiGetInformation";

const useEventsStore = create((set, get) => ({
  likedEvents: [],
  loading: false,
  error: null,

  fetchLikedEvents: async () => {
    set({ loading: true, error: null });
    try {
      const eventsData = await getEventsUser();
      set({ likedEvents: eventsData?.events || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching liked events:", error);
    }
  },

  isEventLiked: (eventId) => {
    const { likedEvents } = get();
    return likedEvents.some((event) => event.id === eventId);
  },

  toggleLike: async (eventId) => {
    try {
      const { likedEvents } = get();
      const isCurrentlyLiked = likedEvents.some((event) => event.id === eventId);

      if (isCurrentlyLiked) {
        set({ likedEvents: likedEvents.filter((event) => event.id !== eventId) });
      } else {
        set({ likedEvents: [...likedEvents, { id: eventId }] });
      }

      await likeUser(eventId);

      const { fetchLikedEvents } = get();
      await fetchLikedEvents();
    } catch (error) {
      const { fetchLikedEvents } = get();
      await fetchLikedEvents();
      console.error("Error toggling like:", error);
    }
  },

  updateLikedEvents: (newEvents) => {
    set({ likedEvents: newEvents });
  },
}));

export default useEventsStore;
