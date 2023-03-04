import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "./services/auth";

export const RequireToken = () => {
  let auth = getCurrentUser();
  let location = useLocation();
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
      <Navigate to="/profile" />
  }

  return <Outlet />;
}

export const Authenticated = () => {
  let auth = getCurrentUser();
  if (auth) {
    return <Navigate to="/profile" />;
  }

  return <Outlet />;
}