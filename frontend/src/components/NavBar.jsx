import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">Foodie Test</Link>
        <div className="navbar-nav me-auto">
          {!auth && (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/registro" className="nav-link">Registro</Link>
            </>
          )}
          {auth?.role === "client" && (
            <Link to="/cliente" className="nav-link">Mi panel</Link>
          )}
          {auth?.role === "admin" && (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
        </div>
        {auth && (
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
