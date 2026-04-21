import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name:    "",
    email:   "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div>
      <Navbar />

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="about-hero-blob blob-1"></div>
        <div className="about-hero-blob blob-2"></div>
        <div className="about-hero-content">
          <span className="hero-badge">
            <span className="badge-dot"></span>
            GET IN TOUCH
          </span>
          <h1 className="about-hero-title">
            We'd Love To <br />
            <span className="hero-accent">Hear From You.</span>
          </h1>
          <p className="about-hero-sub">
            Have a question, suggestion, or want to collaborate?
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <div className="contact-page">
        <div className="contact-container">

          {/* ── Info Cards ── */}
          <div className="contact-info">

            <div className="contact-info-card">
              <span className="contact-info-icon">📧</span>
              <div>
                <h4 className="contact-info-title">Email Us</h4>
                <p className="contact-info-text">support@bloodlink.com</p>
                <p className="contact-info-sub">We reply within 24 hours</p>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-icon">📍</span>
              <div>
                <h4 className="contact-info-title">Location</h4>
                <p className="contact-info-text">Sylhet, Bangladesh</p>
                <p className="contact-info-sub">Metropolitan University</p>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-icon">🕐</span>
              <div>
                <h4 className="contact-info-title">Support Hours</h4>
                <p className="contact-info-text">24/7 Emergency Support</p>
                <p className="contact-info-sub">Always here for you</p>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-icon">🩸</span>
              <div>
                <h4 className="contact-info-title">Emergency?</h4>
                <p className="contact-info-text">Post a Blood Request</p>
                <a href="/requests" className="contact-info-link">
                  Go to Requests →
                </a>
              </div>
            </div>

          </div>

          {/* ── Contact Form ── */}
          <div className="contact-form-card">

            {submitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
                <button
                  className="btn-auth"
                  style={{ maxWidth: "200px", margin: "20px auto 0" }}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="contact-form-title">Send a Message</h2>
                <p className="contact-form-sub">
                  Fill out the form below and we'll respond shortly.
                </p>

                <div className="auth-form" style={{ marginTop: "24px" }}>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-input dark-input"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input dark-input"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-input dark-input"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      className="form-input dark-input form-textarea"
                      placeholder="Write your message here..."
                      style={{ minHeight: "140px" }}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    className="btn-auth"
                    onClick={handleSubmit}
                  >
                    📨 Send Message
                  </button>

                </div>
              </>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;