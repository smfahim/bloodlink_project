function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        Blood<span>Link</span>
      </div>

      <div className="nav-links">
        <a href="#">Donors</a>
        <a href="#">Requests</a>
      </div>

      <button className="nav-btn">Login</button>
    </nav>
  );
}

export default Navbar;