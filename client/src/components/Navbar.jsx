import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Blood<span className="logo-accent">Link</span>
        </Link>

        {/* Nav Links */}
        <ul className="navbar-links">
          <li><Link to="/donors" className="nav-link">Donors</Link></li>
          <li><Link to="/requests" className="nav-link">Requests</Link></li>
        </ul>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          <Link to="/login" className="btn-nav-login">Login</Link>
          <Link to="/register" className="btn-nav-register">Register</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;