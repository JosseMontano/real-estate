import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NearbyPlace } from "@/features/home/components/sectionRealEstates";

interface AuthState {
  placesSelected: NearbyPlace[] | [];
  setPlaces: (vals: NearbyPlace[]) => void;
}

const useRealEstateStore = create(
  persist<AuthState>(
    (set) => ({
      placesSelected: [], // Initialize as null, per the type definition
      setPlaces: (vals: NearbyPlace[]) => set({ placesSelected: vals }),
    }),

    {
      name: "real-estate-storage",
    }
  )
);

export default useRealEstateStore;
