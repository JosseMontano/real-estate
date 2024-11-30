import { create } from "zustand";
import { User } from "../types/user";
import { persist } from "zustand/middleware";

interface AuthState {
  userSelected: User | null;
  selectUser: (user: User | null) => void;
}

const useUserStore = create(
  persist<AuthState>(
    (set) => ({
      userSelected: {} as User,
      selectUser: (user: User | null) => set({ userSelected: user ?? null}),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
