import { createJSONStorage, persist } from 'zustand/middleware';
import { MainStore } from '@/models/main';
import { create } from 'zustand';

const initialState: MainStore = {
  token: '',
  cardUpdated: null,
  editionMode: false,
};

type MainStoreAction = {
  setEditionMode: (office: Partial<MainStore>) => void;
  setToken: (token: string) => void;
  clearAll: () => void;
};

export const useMainStore = create<MainStore & MainStoreAction>()(
  persist(
    set => ({
      ...initialState,
      setEditionMode: payload => set(state => ({ ...state, ...payload })),
      setToken: token => set(() => ({ token })),
      clearAll: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'main-store-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
