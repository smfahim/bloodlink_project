import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);
    // API call later
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          Blood<span className="logo-accent">Link</span>
        </div>

        {/* Title */}
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your BloodLink account</p>

        {/* Form */}
        <div className="auth-form">

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="/forgot-password" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button className="btn-auth" onClick={handleSubmit}>
            Login
          </button>

        </div>

        {/* Divider */}
        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Switch */}
        <p className="auth-switch">
          Don't have an account?{" "}
          <a href="/register" className="auth-switch-link">
            Register here
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;