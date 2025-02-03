import userAuthStore from "@/api/auth";
import fetchApi, { ApiError } from "@/api/fetch";
import { UserResponse, UserResponseSchema } from "@/schema/user.schema";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated, setAccessToken, clearAuth } =
    userAuthStore();

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new ApiError(response.status, json, "Failed to refresh token");
      }

      const { accessToken } = json;
      setAccessToken(accessToken as string);
      console.log("token send successful");

      return accessToken as string;
    } catch (error) {
      console.error("Login failed: ", error);
      setAccessToken(null);
    }
  }, [setAccessToken]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetchApi<UserResponse>("/auth/check-auth", {
        navigate,
        requiresToken: true,
      });
      const user = UserResponseSchema.parse(response);

      setUser(user);
      setIsAuthenticated(true);

      console.log("Check successfull");
    } catch (error) {
      console.error("Check auth failed : ", error);
      setIsAuthenticated(false);
    }
  }, [setUser, setIsAuthenticated, navigate]);

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        const r = await fetchApi<UserResponse>("/auth/register", {
          payload: { username, email, password },
        });
        const user = UserResponseSchema.parse(r);
        setUser(user);
      } catch (error) {
        setUser(null);
        console.error("Check auth failed : ", error);
      }
    },
    [setUser]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await fetchApi<UserResponse>("/auth/login", {
          payload: { email, password },
          navigate,
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
    [setUser, setIsAuthenticated, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await fetchApi<string>("/auth/logout", { navigate, requiresToken: true });

      clearAuth();

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [clearAuth, navigate]);

  return {
    register,
    login,
    logout,
    checkAuth,
    refreshToken,
  };
}
