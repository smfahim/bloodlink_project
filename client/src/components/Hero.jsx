import React, { useEffect, useState } from "react";

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      {/* Animated background blobs */}
      <div className="hero-bg-blob blob-1"></div>
      <div className="hero-bg-blob blob-2"></div>

      {/* Left Content */}
      <div className={`hero-content ${visible ? "hero-visible" : ""}`}>

        {/* Badge */}
        <span className="hero-badge">
          <span className="badge-dot"></span>
          SAVE LIVES TODAY
        </span>

        {/* Heading */}
        <h1 className="hero-heading">
          Find Blood <br />
          Donors <span className="hero-accent">Fast.</span>
        </h1>

        {/* Subtext */}
        <p className="hero-subtext">
          Connect with verified blood donors near you during
          emergencies. Quick. Simple. Free.
        </p>

        {/* Feature Pills */}
        <div className="hero-pills">
          <span className="hero-pill">✔ Verified Donors</span>
          <span className="hero-pill">✔ 64+ Cities</span>
          <span className="hero-pill">✔ 100% Free</span>
        </div>

        {/* Buttons */}
        <div className="hero-buttons">
          <button className="btn-find">
            🔍 Find Donor
          </button>
          <button className="btn-become">
            🩸 Become Donor
          </button>
        </div>

        {/* Trust line */}
        <p className="hero-trust">
          Trusted by <strong>1,240+</strong> donors across Bangladesh
        </p>

      </div>

      {/* Right Side — Blood Drop + Floating Cards */}
      <div className={`hero-right ${visible ? "hero-visible" : ""}`}>

        {/* Main blood drop */}
        <div className="drop-wrapper">
          <svg
            viewBox="0 0 100 130"
            xmlns="http://www.w3.org/2000/svg"
            className="blood-drop-svg"
          >
            <defs>
              <radialGradient id="dropGrad" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="#ff3333" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#880000" stopOpacity="0.15" />
              </radialGradient>
            </defs>
            <path
              d="M50 5 C50 5 10 55 10 80 a40 40 0 0 0 80 0 C90 55 50 5 50 5 Z"
              fill="url(#dropGrad)"
            />
          </svg>

          {/* Ping animation ring */}
          <div className="drop-ping"></div>
        </div>

        {/* Floating Info Cards */}
        <div className="float-card card-top">
          <span className="float-icon">🩸</span>
          <div>
            <p className="float-value">1,240+</p>
            <p className="float-label">Active Donors</p>
          </div>
        </div>

        <div className="float-card card-bottom">
          <span className="float-icon">❤️</span>
          <div>
            <p className="float-value">860+</p>
            <p className="float-label">Lives Saved</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;