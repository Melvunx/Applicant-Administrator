import { UserResponse } from "@/schema/user.schema";
import { create } from "zustand";

type AuthStore = {
  accessToken: string | null;
  user: UserResponse | null;
  isAuthenticated: boolean | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: UserResponse | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clearAuth: () => void;
};

const userAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  clearAuth: () =>
    set({ accessToken: null, user: null, isAuthenticated: false }),
}));

export default userAuthStore;
