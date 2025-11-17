import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/auth";

export default function AdminRoute() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin")
    return <Navigate to="/accounts" replace />;

  return <Outlet />;
}
