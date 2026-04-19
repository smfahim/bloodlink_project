import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          Blood<span className="logo-accent">Link</span>
        </Link>

        <ul className="navbar-links">
          <li><Link to="/donors"   className="nav-link">Donors</Link></li>
          <li><Link to="/requests" className="nav-link">Requests</Link></li>
        </ul>

        <div className="navbar-auth">
          {user ? (
            <>
              <Link
                to={user.isAdmin ? "/admin" : "/dashboard"}
                className="btn-nav-login"
              >
                👤 {user.name.split(" ")[0]}
              </Link>
              <button
                className="btn-nav-register"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn-nav-login">Login</Link>
              <Link to="/register" className="btn-nav-register">Register</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;