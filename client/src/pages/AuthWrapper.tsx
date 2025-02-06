import useAuth from "@/hook/use-auth";
import userAuthStore from "@/stores/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthWrapper() {
  const { isAuthenticated } = userAuthStore();
  const { checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Failed to check authentication : ", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyAuth();
    return () => {
      isMounted = false;
    };
  }, [checkAuth, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}
