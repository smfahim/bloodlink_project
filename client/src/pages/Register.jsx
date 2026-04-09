import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    city: "",
    phone: "",
    isDonor: false,
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Register:", formData);
    // API call later
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">

        {/* Logo */}
        <div className="auth-logo">
          Blood<span className="logo-accent">Link</span>
        </div>

        {/* Title */}
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join BloodLink and save lives today</p>

        {/* Form */}
        <div className="auth-form">

          {/* Row 1 — Name + Phone */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-input"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Row 2 — Blood Group + City */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select
                name="bloodGroup"
                className="form-input form-select"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-input"
                placeholder="e.g. Dhaka"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3 — Password + Confirm */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Donor Checkbox */}
          <div className="form-checkbox-group">
            <input
              type="checkbox"
              name="isDonor"
              id="isDonor"
              className="form-checkbox"
              checked={formData.isDonor}
              onChange={handleChange}
            />
            <label htmlFor="isDonor" className="checkbox-label">
              Register me as a blood donor
            </label>
          </div>

          {/* Submit */}
          <button className="btn-auth" onClick={handleSubmit}>
            Create Account
          </button>

        </div>

        {/* Divider */}
        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Switch */}
        <p className="auth-switch">
          Already have an account?{" "}
          <a href="/login" className="auth-switch-link">
            Login here
          </a>
        </p>

      </div>
    </div>
  );
};

export default Register;