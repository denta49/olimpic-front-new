import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

type AllowedRole = "admin" | "coordinator" | "student";

interface RequireAuthProps {
  allowedRole: AllowedRole | AllowedRole[];
}

export function RequireAuth({ allowedRole }: RequireAuthProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Consider creating a proper loading component
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];

  if (!roles.includes(user.type as AllowedRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
