import { create } from 'zustand';

const useStoreModalShare = create((set) => ({
  active: false,
  title: '',
  description: '',
  url: '',

  toggleState: () => set((state) => ({ active: !state.active })),
  setTitle: (title) => set({ title: title }),
  setDescription: (description) => set({ description: description }),
  setUrl: (url) => set({ url: url }),
}));

export default useStoreModalShare;
