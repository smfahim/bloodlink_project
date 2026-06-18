import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Login = () => {
  const { login }             = useAuth();
  const navigate              = useNavigate();
  const [step, setStep]       = useState(1); // 1=email, 2=otp
  const [email, setEmail]     = useState("");
  const [otp, setOtp]         = useState("");
  const [password, setPassword] = useState("");
  const [method, setMethod]   = useState("otp"); // "otp" or "password"
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

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

  // Send OTP
  const handleSendOTP = async () => {
    if (!email) return setError("Please enter your email");
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/send-otp", { email });
      setSuccess("OTP sent to your email!");
      setStep(2);
      startTimer();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (!otp) return setError("Please enter the OTP");
    setError("");
    setLoading(true);
    try {
      const { data } = await API.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("bloodlinkUser", JSON.stringify(data));
      navigate(data.isAdmin ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Password Login
  const handlePasswordLogin = async () => {
    if (!email || !password) return setError("Please fill all fields");
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          Blood<span className="logo-accent">Link</span>
        </div>

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your BloodLink account</p>

        {/* Method Toggle */}
        <div className="login-method-toggle">
          <button
            className={`method-btn ${method === "otp" ? "method-active" : ""}`}
            onClick={() => { setMethod("otp"); setStep(1); setError(""); setSuccess(""); }}
          >
            📧 OTP Login
          </button>
          <button
            className={`method-btn ${method === "password" ? "method-active" : ""}`}
            onClick={() => { setMethod("password"); setError(""); setSuccess(""); }}
          >
            🔒 Password Login
          </button>
        </div>

        {error   && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        {/* ── OTP Login ── */}
        {method === "otp" && (
          <div className="auth-form">

            {/* Step 1 — Email */}
            {step === 1 && (
              <>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                  />
                </div>
                <button
                  className="btn-auth"
                  onClick={handleSendOTP}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "📧 Send OTP"}
                </button>
              </>
            )}

            {/* Step 2 — OTP Input */}
            {step === 2 && (
              <>
                <div className="otp-email-display">
                  <span>OTP sent to</span>
                  <strong>{email}</strong>
                  <button
                    className="otp-change-email"
                    onClick={() => { setStep(1); setOtp(""); setSuccess(""); }}
                  >
                    Change
                  </button>
                </div>

                <div className="form-group">
                  <label className="form-label">Enter OTP Code</label>
                  <input
                    type="text"
                    className="form-input otp-input"
                    placeholder="_ _ _ _ _ _"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyOTP()}
                  />
                  <p className="otp-hint">
                    Check your email inbox for the 6-digit code
                  </p>
                </div>

                <button
                  className="btn-auth"
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Verifying..." : "✅ Verify OTP"}
                </button>

                {/* Resend */}
                <div className="otp-resend">
                  {resendTimer > 0 ? (
                    <p className="otp-timer">
                      Resend OTP in <strong>{resendTimer}s</strong>
                    </p>
                  ) : (
                    <button
                      className="otp-resend-btn"
                      onClick={handleSendOTP}
                      disabled={loading}
                    >
                      🔄 Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}

          </div>
        )}

        {/* ── Password Login ── */}
        {method === "password" && (
          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handlePasswordLogin()
                }
              />
            </div>
            <button
              className="btn-auth"
              onClick={handlePasswordLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "🔒 Login"}
            </button>
          </div>
        )}

        <div className="auth-divider"><span>or</span></div>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth-switch-link">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;