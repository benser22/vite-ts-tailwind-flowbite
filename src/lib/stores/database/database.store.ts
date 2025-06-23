import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { StateCreator } from "zustand";

export interface DatabaseState {
  data: any;
}

const storeApi: StateCreator<DatabaseState> = () => ({
  data: [],
});

export const useDatabaseStore = create<DatabaseState>()(
  devtools(
    persist(storeApi, {
      name: "db-storage",
    }),
  ),
);
