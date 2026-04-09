import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy user data (later from API)
  const user = {
    name: "Rahim Uddin",
    email: "rahim@email.com",
    bloodGroup: "A+",
    city: "Dhaka",
    phone: "01712345678",
    isDonor: true,
    totalDonations: 5,
    lastDonation: "2025-12-10",
    joinDate: "2024-03-15",
  };

  const myRequests = [
    { id: 1, bloodGroup: "A+", hospital: "Dhaka Medical", status: "Active",   date: "2026-03-01" },
    { id: 2, bloodGroup: "A+", hospital: "Square Hospital", status: "Closed", date: "2025-11-20" },
  ];

  const donationHistory = [
    { id: 1, date: "2025-12-10", location: "Dhaka Medical",   status: "Completed" },
    { id: 2, date: "2025-06-05", location: "BIRDEM Hospital", status: "Completed" },
    { id: 3, date: "2024-12-01", location: "Square Hospital", status: "Completed" },
  ];

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        {/* Logo */}
        <Link to="/" className="sidebar-logo">
          Blood<span className="logo-accent">Link</span>
        </Link>

        {/* User Info */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user.bloodGroup}
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-name">{user.name}</p>
            <p className="sidebar-email">{user.email}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 My Profile
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            🩸 My Requests
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            📜 Donation History
          </button>
        </nav>

        {/* Logout */}
        <button className="sidebar-logout">
          🚪 Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <div className="dash-section">
            <h2 className="dash-heading">Welcome back, {user.name} 👋</h2>
            <p className="dash-subheading">Here's your BloodLink summary</p>

            {/* Stat Cards */}
            <div className="dash-cards">
              <div className="dash-card">
                <div className="dash-card-icon">🩸</div>
                <div>
                  <p className="dash-card-value">{user.totalDonations}</p>
                  <p className="dash-card-label">Total Donations</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">📋</div>
                <div>
                  <p className="dash-card-value">{myRequests.length}</p>
                  <p className="dash-card-label">Blood Requests</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">📍</div>
                <div>
                  <p className="dash-card-value">{user.city}</p>
                  <p className="dash-card-label">Your City</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">❤️</div>
                <div>
                  <p className="dash-card-value">{user.bloodGroup}</p>
                  <p className="dash-card-label">Blood Group</p>
                </div>
              </div>
            </div>

            {/* Donor Status */}
            <div className="dash-status-card">
              <div className="dash-status-left">
                <p className="dash-status-title">Donor Status</p>
                <p className="dash-status-sub">
                  You are currently registered as a donor
                </p>
              </div>
              <span className={`dash-status-badge ${user.isDonor ? "badge-active" : "badge-inactive"}`}>
                {user.isDonor ? "● Active Donor" : "● Inactive"}
              </span>
            </div>

            {/* Last Donation */}
            <div className="dash-status-card">
              <div className="dash-status-left">
                <p className="dash-status-title">Last Donation</p>
                <p className="dash-status-sub">{user.lastDonation}</p>
              </div>
              <span className="dash-status-badge badge-active">✔ Eligible to Donate</span>
            </div>

          </div>
        )}

        {/* ── Profile Tab ── */}
        {activeTab === "profile" && (
          <div className="dash-section">
            <h2 className="dash-heading">My Profile</h2>
            <p className="dash-subheading">Manage your personal information</p>

            <div className="profile-form">

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input dark-input"
                    defaultValue={user.name}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-input dark-input"
                    defaultValue={user.phone}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input dark-input"
                  defaultValue={user.email}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <input
                    type="text"
                    className="form-input dark-input"
                    defaultValue={user.bloodGroup}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-input dark-input"
                    defaultValue={user.city}
                  />
                </div>
              </div>

              <button className="btn-auth" style={{ maxWidth: "200px" }}>
                Save Changes
              </button>

            </div>
          </div>
        )}

        {/* ── My Requests Tab ── */}
        {activeTab === "requests" && (
          <div className="dash-section">
            <div className="dash-tab-header">
              <div>
                <h2 className="dash-heading">My Blood Requests</h2>
                <p className="dash-subheading">All your posted blood requests</p>
              </div>
              <button className="btn-auth" style={{ maxWidth: "160px", padding: "10px" }}>
                + New Request
              </button>
            </div>

            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Blood Group</th>
                    <th>Hospital</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myRequests.map((req) => (
                    <tr key={req.id}>
                      <td>
                        <span className="table-blood-badge">{req.bloodGroup}</span>
                      </td>
                      <td>{req.hospital}</td>
                      <td>{req.date}</td>
                      <td>
                        <span className={`table-status ${req.status === "Active" ? "status-active" : "status-closed"}`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Donation History Tab ── */}
        {activeTab === "history" && (
          <div className="dash-section">
            <h2 className="dash-heading">Donation History</h2>
            <p className="dash-subheading">Your past blood donations</p>

            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donationHistory.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.date}</td>
                      <td>{item.location}</td>
                      <td>
                        <span className="table-status status-active">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;