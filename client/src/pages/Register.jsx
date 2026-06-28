import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Register = () => {
  const navigate              = useNavigate();
  const [step, setStep]       = useState(1); // 1=form, 2=otp
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otp, setOtp]         = useState("");

  const [formData, setFormData] = useState({
    name:            "",
    email:           "",
    password:        "",
    confirmPassword: "",
    bloodGroup:      "",
    city:            "",
    phone:           "",
    isDonor:         false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Timer for resend
  const startTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1 — Submit form → Send OTP
  const handleSendOTP = async () => {
    setError("");

    if (!formData.name || !formData.email ||
        !formData.password || !formData.bloodGroup || !formData.city) {
      return setError("Please fill all required fields");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      await API.post("/auth/register", {
        name:       formData.name,
        email:      formData.email,
        password:   formData.password,
        bloodGroup: formData.bloodGroup,
        city:       formData.city,
        phone:      formData.phone,
        isDonor:    formData.isDonor,
      });
      setSuccess(`OTP sent to ${formData.email}`);
      setStep(2);
      startTimer();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/register", {
        name:       formData.name,
        email:      formData.email,
        password:   formData.password,
        bloodGroup: formData.bloodGroup,
        city:       formData.city,
        phone:      formData.phone,
        isDonor:    formData.isDonor,
      });
      setSuccess("OTP resent successfully!");
      startTimer();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP → Create Account
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      return setError("Please enter the 6-digit OTP");
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await API.post("/auth/verify-register", {
        name:       formData.name,
        email:      formData.email,
        password:   formData.password,
        bloodGroup: formData.bloodGroup,
        city:       formData.city,
        phone:      formData.phone,
        isDonor:    formData.isDonor,
        otp,
      });
      localStorage.setItem("bloodlinkUser", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
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

        {/* Step Indicator */}
        <div className="reg-steps">
          <div className={`reg-step ${step >= 1 ? "reg-step-active" : ""}`}>
            <div className="reg-step-circle">1</div>
            <span>Fill Details</span>
          </div>
          <div className="reg-step-line"></div>
          <div className={`reg-step ${step >= 2 ? "reg-step-active" : ""}`}>
            <div className="reg-step-circle">2</div>
            <span>Verify Email</span>
          </div>
        </div>

        {error   && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        {/* ── Step 1 — Registration Form ── */}
        {step === 1 && (
          <>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join BloodLink and save lives today</p>

            <div className="auth-form">

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
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
                <label className="form-label">Email Address *</label>
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
                  <label className="form-label">Blood Group *</label>
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
                  <label className="form-label">City *</label>
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
                  <label className="form-label">Password *</label>
                  <input
                    type="password" name="password"
                    className="form-input"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm Password *</label>
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

              <div className="reg-btn-group">
                <button
                  className="btn-auth"
                  onClick={handleSendOTP}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "📧 Continue with OTP"}
                </button>
                <Link to="/" className="btn-cancel">
                  ✕ Cancel
                </Link>
              </div>

            </div>
          </>
        )}

        {/* ── Step 2 — OTP Verification ── */}
        {step === 2 && (
          <>
            <h2 className="auth-title">Verify Your Email</h2>
            <p className="auth-subtitle">
              We sent a 6-digit OTP to your email
            </p>

            <div className="otp-email-display">
              <span>OTP sent to</span>
              <strong>{formData.email}</strong>
              <button
                className="otp-change-email"
                onClick={() => { setStep(1); setOtp(""); setSuccess(""); setError(""); }}
              >
                Change
              </button>
            </div>

            <div className="auth-form">
              <div className="form-group">
                <label className="form-label">Enter OTP Code *</label>
                <input
                  type="text"
                  className="form-input otp-input"
                  placeholder="_ _ _ _ _ _"
                  maxLength={6}
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleVerifyOTP()
                  }
                />
                <p className="otp-hint">
                  Check your inbox — expires in 5 minutes
                </p>
              </div>

              <button
                className="btn-auth"
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Creating Account..." : "✅ Verify & Create Account"}
              </button>

              <div className="otp-resend">
                {resendTimer > 0 ? (
                  <p className="otp-timer">
                    Resend OTP in <strong>{resendTimer}s</strong>
                  </p>
                ) : (
                  <button
                    className="otp-resend-btn"
                    onClick={handleResend}
                    disabled={loading}
                  >
                    🔄 Resend OTP
                  </button>
                )}
              </div>

              <Link to="/" className="btn-cancel" style={{ textAlign: "center" }}>
                ✕ Cancel Registration
              </Link>

            </div>
          </>
        )}

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