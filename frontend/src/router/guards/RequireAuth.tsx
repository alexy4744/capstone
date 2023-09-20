import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../providers";

export const RequireAuth = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
