import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Routes } from "../../../App";

interface generalState {
  lastPageVisited: Routes;
  setLastPageVisited: (vals: Routes) => void;
  currentPageMainRE: number;
  setCurrentPageMainRE: (vals: number) => void;
}

const useGeneralStore = create(
  persist<generalState>(
    (set) => ({
      lastPageVisited: {} as Routes,
      setLastPageVisited: (vals: Routes) => set({ lastPageVisited: vals }),
      currentPageMainRE: 1,
      setCurrentPageMainRE: (vals: number) => set({ currentPageMainRE: vals }),
    }),

    {
      name: "general-storage",
    }
  )
);

export default useGeneralStore;
