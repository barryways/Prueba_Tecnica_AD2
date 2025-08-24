import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { auth } = useContext(AuthContext);
  if (!auth?.token) return <Navigate to="/login" replace />;

  // Si se pide un rol en específico y no coincide, redirige a su dashboard correcto
  if (role && auth.role !== role) {
    return <Navigate to={auth.role === "admin" ? "/admin" : "/cliente"} replace />;
  }
  return children;
}
