import userAuthStore from "@/api/auth";
import fetchApi from "@/api/fetch";
import { User } from "@/schema/user.schema";
import { useCallback } from "react";

export function useAuth() {
  const { setUser, setIsAuthenticated } = userAuthStore();

  const authenticate = useCallback(() => {}, [])

  const login = useCallback(
    (email: string, password: string) => {
      fetchApi<User>("/login", { payload: { email, password } }).then(setUser);
    },
    [setUser]
  );

  // const login = useCallback(
  //   async (email: string, password: string) => {
  //     try {
  //       const user = await fetchApi<User>("/login", {
  //         payload: { email, password },
  //       });
  //       setUser(user);
  //       console.log("Login successful");
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //     }
  //   },
  //   [setUser]
  // );

  return {
    login,
  };
}
