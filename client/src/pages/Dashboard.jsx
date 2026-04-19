import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout }                = useAuth();
  const navigate                        = useNavigate();
  const [activeTab, setActiveTab]       = useState("overview");
  const [profile, setProfile]           = useState(null);
  const [myRequests, setMyRequests]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [saveLoading, setSaveLoading]   = useState(false);
  const [saveSuccess, setSaveSuccess]   = useState("");
  const [saveError, setSaveError]       = useState("");
  const [editData, setEditData]         = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProfile();
    fetchMyRequests();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/auth/me");
      setProfile(data);
      setEditData({
        name:  data.name,
        phone: data.phone  || "",
        city:  data.city   || "",
        email: data.email  || "",
      });
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const { data } = await API.get("/requests");
      // Filter only current user's requests
      const mine = data.filter(
        (req) => req.user?._id === user?._id ||
                 req.user    === user?._id
      );
      setMyRequests(mine);
    } catch (err) {
      console.error("Requests fetch error:", err);
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    setSaveSuccess("");
    setSaveError("");
    try {
      await API.put("/auth/update", editData);
      setSaveSuccess("Profile updated successfully!");
      fetchProfile();
    } catch (err) {
      setSaveError(err.response?.data?.message || "Update failed");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await API.delete(`/requests/${id}`);
      setMyRequests(myRequests.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete request");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleToggleAvailability = async () => {
    try {
      const { data } = await API.put("/donors/availability", {
        isAvailable: !profile.isAvailable,
      });
      setProfile({ ...profile, isAvailable: data.isAvailable });
    } catch (err) {
      alert("Failed to update availability");
    }
  };

  if (loading) {
    return (
      <div className="dash-loader">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <Link to="/" className="sidebar-logo">
          Blood<span className="logo-accent">Link</span>
        </Link>

        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {profile?.bloodGroup || "?"}
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-name">{profile?.name}</p>
            <p className="sidebar-email">{profile?.email}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item ${activeTab === "overview"  ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "profile"   ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 My Profile
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "requests"  ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            🩸 My Requests
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "history"   ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            📜 Donation History
          </button>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main */}
      <main className="dashboard-main">

        {/* ── Overview ── */}
        {activeTab === "overview" && (
          <div className="dash-section">
            <h2 className="dash-heading">Welcome back, {profile?.name} 👋</h2>
            <p className="dash-subheading">Here's your BloodLink summary</p>

            <div className="dash-cards">
              <div className="dash-card">
                <div className="dash-card-icon">🩸</div>
                <div>
                  <p className="dash-card-value">
                    {profile?.totalDonations || 0}
                  </p>
                  <p className="dash-card-label">Total Donations</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">📋</div>
                <div>
                  <p className="dash-card-value">{myRequests.length}</p>
                  <p className="dash-card-label">My Requests</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">📍</div>
                <div>
                  <p className="dash-card-value">{profile?.city}</p>
                  <p className="dash-card-label">Your City</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">❤️</div>
                <div>
                  <p className="dash-card-value">{profile?.bloodGroup}</p>
                  <p className="dash-card-label">Blood Group</p>
                </div>
              </div>
            </div>

            {/* Donor Status */}
            {profile?.isDonor && (
              <div className="dash-status-card">
                <div className="dash-status-left">
                  <p className="dash-status-title">Donor Availability</p>
                  <p className="dash-status-sub">
                    Toggle your availability for donation
                  </p>
                </div>
                <button
                  className={`dash-status-badge ${
                    profile?.isAvailable ? "badge-active" : "badge-inactive"
                  }`}
                  onClick={handleToggleAvailability}
                  style={{ cursor: "pointer", border: "none" }}
                >
                  {profile?.isAvailable ? "● Available" : "● Unavailable"}
                </button>
              </div>
            )}

            {/* Last Donation */}
            <div className="dash-status-card">
              <div className="dash-status-left">
                <p className="dash-status-title">Member Since</p>
                <p className="dash-status-sub">
                  {new Date(profile?.createdAt).toLocaleDateString("en-BD", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              </div>
              <span className="dash-status-badge badge-active">
                ✔ Active Member
              </span>
            </div>

          </div>
        )}

        {/* ── Profile ── */}
        {activeTab === "profile" && (
          <div className="dash-section">
            <h2 className="dash-heading">My Profile</h2>
            <p className="dash-subheading">Manage your personal information</p>

            {saveSuccess && (
              <div className="auth-success" style={{ marginBottom: "16px" }}>
                {saveSuccess}
              </div>
            )}
            {saveError && (
              <div className="auth-error" style={{ marginBottom: "16px" }}>
                {saveError}
              </div>
            )}

            <div className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text" name="name"
                    className="form-input dark-input"
                    value={editData.name || ""}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="text" name="phone"
                    className="form-input dark-input"
                    value={editData.phone || ""}
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email" name="email"
                  className="form-input dark-input"
                  value={editData.email || ""}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <input
                    type="text"
                    className="form-input dark-input"
                    value={profile?.bloodGroup || ""}
                    readOnly
                    style={{ opacity: 0.5, cursor: "not-allowed" }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text" name="city"
                    className="form-input dark-input"
                    value={editData.city || ""}
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              <button
                className="btn-auth"
                style={{ maxWidth: "200px" }}
                onClick={handleSaveProfile}
                disabled={saveLoading}
              >
                {saveLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* ── My Requests ── */}
        {activeTab === "requests" && (
          <div className="dash-section">
            <div className="dash-tab-header">
              <div>
                <h2 className="dash-heading">My Blood Requests</h2>
                <p className="dash-subheading">
                  Your posted blood requests
                </p>
              </div>
              <Link
                to="/requests"
                className="btn-auth"
                style={{
                  maxWidth: "160px", padding: "10px",
                  textDecoration: "none", textAlign: "center"
                }}
              >
                + New Request
              </Link>
            </div>

            {myRequests.length === 0 ? (
              <div className="donors-empty">
                <p className="empty-icon">📋</p>
                <h3>No requests yet</h3>
                <p>Post a blood request when needed</p>
              </div>
            ) : (
              <div className="dash-table-wrapper">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Blood Group</th>
                      <th>Hospital</th>
                      <th>City</th>
                      <th>Urgency</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myRequests.map((req) => (
                      <tr key={req._id}>
                        <td>
                          <span className="table-blood-badge">
                            {req.bloodGroup}
                          </span>
                        </td>
                        <td>{req.hospital}</td>
                        <td>{req.city}</td>
                        <td>
                          <span className={`urgency-badge ${
                            req.urgency === "Critical" ? "badge-critical" :
                            req.urgency === "Urgent"   ? "badge-urgent"   :
                            "badge-normal-green"
                          }`}>
                            {req.urgency}
                          </span>
                        </td>
                        <td>
                          <span className={`table-status ${
                            req.status === "Open"
                              ? "status-active"
                              : "status-closed"
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-table-action btn-delete"
                            onClick={() => handleDeleteRequest(req._id)}
                          >
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Donation History ── */}
        {activeTab === "history" && (
          <div className="dash-section">
            <h2 className="dash-heading">Donation History</h2>
            <p className="dash-subheading">Your past blood donations</p>

            <div className="donors-empty">
              <p className="empty-icon">📜</p>
              <h3>No donation history yet</h3>
              <p>Your donations will appear here</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;