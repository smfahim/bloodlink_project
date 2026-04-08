import React from "react";

const Footer = () => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Column */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            Blood<span className="footer-logo-accent">Link</span>
          </h2>
          <p className="footer-tagline">
            Connecting blood donors with people in need. Fast, free, and life-saving.
          </p>
          <div className="footer-blood-groups">
            {bloodGroups.map((bg) => (
              <span className="bg-tag" key={bg}>{bg}</span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4 className="footer-heading">QUICK LINKS</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/donors">Find Donor</a></li>
            <li><a href="/requests">Blood Requests</a></li>
            <li><a href="/register">Become a Donor</a></li>
          </ul>
        </div>

        {/* Account */}
        <div className="footer-column">
          <h4 className="footer-heading">ACCOUNT</h4>
          <ul className="footer-links">
            <li><a href="/register">Register</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/admin">Admin Panel</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h4 className="footer-heading">SUPPORT</h4>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Use</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © 2026 <span className="footer-logo-accent">BloodLink</span>. 
          All rights reserved. Made with ❤️ by S.M. Fahim Ahmed
        </p>
      </div>
    </footer>
  );
};

export default Footer;