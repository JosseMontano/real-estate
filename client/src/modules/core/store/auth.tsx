import { create } from "zustand";
import { Follow, User } from "../types/user";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User;
  isAuthenticated: boolean;
  login: (user: User) => void;
  follow: (newFollowing: Follow) => void;
  unfollow: (id: number) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: {} as User,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      follow: (newFollow: Follow) =>
        set((state) => ({
          user: {
            ...state.user,
            following: [...state.user.following, newFollow],
          },
        })),
      unfollow: (followId: number) =>
        set((state) => ({
          user: {
            ...state.user,
            following: state.user.following.filter(
              (follow) => follow.id !== followId 
            ),
          },
        })),
      logout: () => set({ user: {} as User, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
