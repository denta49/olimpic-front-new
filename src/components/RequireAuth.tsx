import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

interface RequireAuthProps {
  allowedRole: string;
}

export default function RequireAuth({ allowedRole }: RequireAuthProps) {
  const { user, state } = useContext(AuthContext);
  const location = useLocation();

  if (state === "LOADING") {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user.type !== allowedRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
