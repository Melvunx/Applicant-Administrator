import userAuthStore from "@/api/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthWrapper() {
  const { isAuthenticated } = userAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}
