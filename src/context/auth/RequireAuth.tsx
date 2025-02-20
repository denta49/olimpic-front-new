import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth/AuthContext";

interface RequireAuthProps {
  allowedRole: string | string[];
}

export function RequireAuth({ allowedRole }: RequireAuthProps) {
  const { state } = useAuth();
  const location = useLocation();

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const allowedRoles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
  if (!allowedRoles.includes(state.user?.type || "")) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
