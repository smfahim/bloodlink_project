import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  { value: "1,240+", label: "Registered Donors",  icon: "🩸" },
  { value: "860+",   label: "Lives Saved",         icon: "❤️" },
  { value: "64+",    label: "Cities Covered",      icon: "📍" },
  { value: "100%",   label: "Free Service",        icon: "✅" },
];

const team = [
  {
    name:   "S.M. Fahim Ahmed",
    role:   "Founder & Developer",
    blood:  "A+",
    bio:    "Passionate about using technology to save lives. Built BloodLink to bridge the gap between donors and recipients.",
  },
];

const values = [
  {
    icon:  "🩸",
    title: "Save Lives",
    desc:  "Every second counts in an emergency. We make sure donors and recipients connect instantly.",
  },
  {
    icon:  "🤝",
    title: "Community First",
    desc:  "BloodLink is built on the power of community. Together we can save thousands of lives.",
  },
  {
    icon:  "🔒",
    title: "Safe & Secure",
    desc:  "All donor information is verified and kept secure. Your privacy is our top priority.",
  },
  {
    icon:  "💚",
    title: "100% Free",
    desc:  "BloodLink will always be free. Saving lives should never come with a price tag.",
  },
];

const About = () => {
  return (
    <div>
      <Navbar />

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-blob blob-1"></div>
        <div className="about-hero-blob blob-2"></div>
        <div className="about-hero-content">
          <span className="hero-badge">
            <span className="badge-dot"></span>
            ABOUT BLOODLINK
          </span>
          <h1 className="about-hero-title">
            We Connect Donors <br />
            With People In <span className="hero-accent">Need.</span>
          </h1>
          <p className="about-hero-sub">
            BloodLink is a free, web-based blood donation platform that connects
            verified blood donors with patients in emergency situations across
            Bangladesh. Fast, simple, and life-saving.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="about-stats">
        {stats.map((stat, i) => (
          <div className="about-stat-card" key={i}>
            <span className="about-stat-icon">{stat.icon}</span>
            <h3 className="about-stat-value">{stat.value}</h3>
            <p className="about-stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ── Mission ── */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-mission">
            <div className="about-mission-left">
              <h2 className="about-section-title">Our Mission</h2>
              <p className="about-section-text">
                Every year, millions of people need blood transfusions to survive
                surgeries, accidents, and medical conditions. Yet finding the right
                blood type at the right time remains a critical challenge.
              </p>
              <p className="about-section-text">
                BloodLink was created to solve this problem. By building a
                centralized platform where donors can register and recipients can
                search — we make the process of finding blood faster, easier,
                and more reliable than ever before.
              </p>
              <p className="about-section-text">
                Our goal is simple: <strong style={{ color: "#cc0000" }}>
                no one should die because they couldn't find blood in time.
                </strong>
              </p>
            </div>
            <div className="about-mission-right">
              <div className="about-mission-card">
                <div className="mission-drop">
                  <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="missionGrad" cx="50%" cy="60%" r="50%">
                        <stop offset="0%" stopColor="#ff3333" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#880000" stopOpacity="0.3" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M50 5 C50 5 10 55 10 80 a40 40 0 0 0 80 0 C90 55 50 5 50 5 Z"
                      fill="url(#missionGrad)"
                    />
                  </svg>
                </div>
                <div className="mission-card-stats">
                  <div className="mission-stat">
                    <h4>4.5M+</h4>
                    <p>Blood units needed yearly in Bangladesh</p>
                  </div>
                  <div className="mission-stat">
                    <h4>Only 30%</h4>
                    <p>Of demand is currently met</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values-section">
        <div className="about-container">
          <h2 className="about-section-title" style={{ textAlign: "center", marginBottom: "40px" }}>
            Our Values
          </h2>
          <div className="about-values-grid">
            {values.map((val, i) => (
              <div className="about-value-card" key={i}>
                <span className="about-value-icon">{val.icon}</span>
                <h3 className="about-value-title">{val.title}</h3>
                <p className="about-value-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="about-section">
        <div className="about-container">
          <h2
            className="about-section-title"
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            Meet the Team
          </h2>
          <div className="about-team-grid">
            {team.map((member, i) => (
              <div className="about-team-card" key={i}>
                <div className="team-avatar">{member.blood}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <div className="about-cta-content">
          <h2 className="about-cta-title">Ready to Save a Life?</h2>
          <p className="about-cta-sub">
            Join thousands of donors across Bangladesh and make a difference today.
          </p>
          <div className="about-cta-buttons">
            <a href="/register" className="btn-find">
              🩸 Become a Donor
            </a>
            <a href="/donors" className="btn-become">
              🔍 Find a Donor
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;