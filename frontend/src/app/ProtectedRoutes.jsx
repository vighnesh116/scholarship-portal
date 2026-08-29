import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (allowedRole && role !== allowedRole) {
    if (role === "admin") {
      return <Navigate to="/admin" replace={true} />;
    }
    if (role === "student") {
      return <Navigate to="/portal" replace={true} />;
    }
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

export default ProtectedRoute;