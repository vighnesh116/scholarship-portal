import { Navigate, Outlet } from "react-router-dom";

const AnonymousRoutes = () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Outlet />;
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/portal" replace />;
};

export default AnonymousRoutes;