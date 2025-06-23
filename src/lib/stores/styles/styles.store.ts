// src/lib/stores/styles/styles.store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { StateCreator } from "zustand";

export type StylesState = {
  theme: string;
  setTheme: (theme: string) => void;
};

const storeApi: StateCreator<StylesState> = (set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
});

export const useStylesStore = create<StylesState>()(
  devtools(
    persist(storeApi, {
      name: "styles-storage",
    }),
  ),
);
