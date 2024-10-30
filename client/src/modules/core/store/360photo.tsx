import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  url: string;
  loadUrl: (url:string) => void;
}

const use360photo = create(
  persist<AuthState>(
    (set) => ({
      url: "",
      loadUrl: (url:string) => set({ url }),
    }),
    {
      name: "url-storage",
    }
  )
);

export default use360photo;
