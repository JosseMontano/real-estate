import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id?: number;
  username?: string;
  cellphone?: number;
  email: string;
  qualification?: string;
  codeRecuperation?: string;
  role?: number; // 1: admin, 2: user
  available?: boolean;
  photo?: string;
};


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
