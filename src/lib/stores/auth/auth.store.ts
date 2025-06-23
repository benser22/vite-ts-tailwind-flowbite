import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { StateCreator } from "zustand";
import { User } from "@/lib/interfaces";

export interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: "auth-storage",
    }),
  ),
);
