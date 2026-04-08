import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <a href="/" className="navbar-logo">
          Blood<span className="logo-accent">Link</span>
        </a>

        {/* Nav Links */}
        <ul className="navbar-links">
          <li><a href="/donors" className="nav-link">Donors</a></li>
          <li><a href="/requests" className="nav-link">Requests</a></li>
        </ul>

        {/* Login Button */}
        <button className="btn-login">Login</button>

      </div>
    </nav>
  );
};

export default Navbar;