import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
}

interface UserState {
  user: any | null;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: any) => set({ user }), // Correctly typed user
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user", // Key used in localStorage
      getStorage: () => localStorage, // Storage to use
    }
  )
);
