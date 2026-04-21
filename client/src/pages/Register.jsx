import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register }   = useAuth();
  const navigate       = useNavigate();
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "",
    confirmPassword: "", bloodGroup: "",
    city: "", phone: "", isDonor: false,
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (!formData.bloodGroup) {
      return setError("Please select a blood group");
    }

    setLoading(true);
    try {
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
  console.log("FULL ERROR:", err); //

  setError(
    err.response?.data?.message ||
    err.message ||
    "Registration failed"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">

        <div className="auth-logo">
          Blood<span className="logo-accent">Link</span>
        </div>

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join BloodLink and save lives today</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-form">

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text" name="name"
                className="form-input"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text" name="phone"
                className="form-input"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email" name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

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
                type="text" name="city"
                className="form-input"
                placeholder="e.g. Dhaka"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password" name="password"
                className="form-input"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password" name="confirmPassword"
                className="form-input"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-checkbox-group">
            <input
              type="checkbox" name="isDonor" id="isDonor"
              className="form-checkbox"
              checked={formData.isDonor}
              onChange={handleChange}
            />
            <label htmlFor="isDonor" className="checkbox-label">
              Register me as a blood donor
            </label>
          </div>

          <button
            className="btn-auth"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </div>

        <div className="auth-divider"><span>or</span></div>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-switch-link">Login here</Link>
        </p>

      </div>
    </div>
  );
};

export default Register; 