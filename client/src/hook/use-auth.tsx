import userAuthStore from "@/api/auth";
import fetchApi from "@/api/fetch";
import { User } from "@/schema/user.schema";
import { useCallback } from "react";

export function useAuth() {
  const { setUser, setIsAuthenticated, setAccessToken, clearAuth } =
    userAuthStore();

  // const login = useCallback(
  //   (email: string, password: string) => {
  //     fetchApi<User>("/login", { payload: { email, password } }).then(setUser);
  //   },
  //   [setUser]
  // );

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetchApi<{ accessToken: string }>(
        "/auth/refresh-token",
        { method: "POST" }
      );
      setAccessToken(response.accessToken);
    } catch (error) {
      console.error("Login failed:", error);
      setAccessToken(null);
    }
  }, [setAccessToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const user = await fetchApi<User>("/auth/login", {
          payload: { email, password },
        });
        setUser(user);
        setIsAuthenticated(true);
        console.log("Login successful");
      } catch (error) {
        console.error("Login failed:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    },
    [setUser, setIsAuthenticated]
  );

  const logout = useCallback(async () => {
    await fetchApi<string>("/auth/logout");
    clearAuth();
  }, [clearAuth]);

  return {
    login,
    refreshToken,
    logout,
  };
}
