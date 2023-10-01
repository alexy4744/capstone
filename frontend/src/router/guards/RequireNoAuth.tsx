import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../providers";

export const RequireNoAuth = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
