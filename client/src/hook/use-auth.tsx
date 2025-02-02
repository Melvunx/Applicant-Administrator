import userAuthStore from "@/api/auth";
import fetchApi from "@/api/fetch";
import { UserResponse, UserResponseSchema } from "@/schema/user.schema";
import { useCallback } from "react";

export function useAuth() {
  const { setUser, setIsAuthenticated, setAccessToken, clearAuth } =
    userAuthStore();

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetchApi<{ accessToken: string }>(
        "/auth/refresh-token",
        { method: "POST" }
      );

      setAccessToken(response.accessToken);

      console.log("token send successful");
    } catch (error) {
      console.error("Login failed: ", error);
      setAccessToken(null);
    }
  }, [setAccessToken]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetchApi<UserResponse>("/auth/check-auth");
      const user = UserResponseSchema.parse(response);

      setUser(user);
      setIsAuthenticated(true);

      console.log("Check successfull");
    } catch (error) {
      console.error("Check auth failed : ", error);
      setIsAuthenticated(false);
    }
  }, [setUser, setIsAuthenticated]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await fetchApi<UserResponse>("/auth/login", {
          payload: { email, password },
        });

        const user = UserResponseSchema.parse(response);

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
    try {
      await fetchApi<string>("/auth/logout");

      clearAuth();

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [clearAuth]);

  return {
    login,
    logout,
    checkAuth,
    refreshToken,
  };
}
