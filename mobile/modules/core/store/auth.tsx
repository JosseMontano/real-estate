import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Follow, User } from "./user";
import { RealEstate } from "../../shared/types/realEstate";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Favorites = {
  id: number;
  real_estate: RealEstate;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  updateUsernameAndCellphone: (username: string, cellphone: number) => void;
  login: (user: User) => void;
  follow: (newFollowing: Follow) => void;
  unfollow: (id: number) => void;
  addFavorite: (realEstate: Favorites) => void;
  removeFavorite: (realEstateId: number) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      updateUsernameAndCellphone: (username, cellphone) =>
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              username,
              cellphone,
            },
          };
        }),

      login: (user: User) => set({ user, isAuthenticated: true }),
      follow: (newFollow: Follow) =>
        set((state) => {
          if (!state.user) {
            // If user is null, initialize it with default values
            const defaultUser: User = {
              email: "", // Provide a default email
              following: [newFollow],
              favorites: [],
              // Add other required properties from the User type
            };
            return { user: defaultUser };
          }
          return {
            user: {
              ...state.user,
              following: [...state.user.following, newFollow],
            },
          };
        }),
      unfollow: (followId: number) =>
        set((state) => {
          if (!state.user) return state; // If user is null, return the current state
          return {
            user: {
              ...state.user,
              following: state.user.following.filter(
                (follow) => follow.id !== followId
              ),
            },
          };
        }),
      addFavorite: (favorite: Favorites) =>
        set((state) => {
          if (!state.user) return state; // If user is null, return the current state
          return {
            user: {
              ...state.user,
              favorites: [...state.user.favorites, favorite],
            },
          };
        }),
      removeFavorite: (realEstateId: number) =>
        set((state) => {
          if (!state.user) return state; // If user is null, return the current state
          return {
            user: {
              ...state.user,
              favorites: state.user.favorites.filter(
                (favorite) => favorite.real_estate.id !== realEstateId
              ),
            },
          };
        }),
      logout: () => set({ user: null, isAuthenticated: false }), // Set user to null on logout
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);

export default useAuthStore;
