import create from 'zustand';
import { persist } from 'zustand/middleware';
const useUserStore = create()(persist((set, get) => ({
    currentUser: null,
    setCurrentUser: ({ email, token, id }) => set({
        currentUser: {
            email,
            token,
            id,
        },
    }),
    resetUser: () => set({ currentUser: null }),
    replaceState: (newState) => set({ ...get(), ...newState }),
}), { name: 'storage' }));
export default useUserStore;
