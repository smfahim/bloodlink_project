import React, { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy Data
  const stats = {
    totalUsers: 1240,
    totalDonors: 860,
    totalRequests: 145,
    citiesCovered: 64,
  };

  const users = [
    { id: 1, name: "Rahim Uddin",    email: "rahim@email.com",   bloodGroup: "A+", city: "Dhaka",      role: "Donor",  status: "Active"   },
    { id: 2, name: "Sumaiya Khan",   email: "sumaiya@email.com", bloodGroup: "O+", city: "Sylhet",     role: "Donor",  status: "Active"   },
    { id: 3, name: "Tanvir Hossain", email: "tanvir@email.com",  bloodGroup: "B+", city: "Chittagong", role: "User",   status: "Active"   },
    { id: 4, name: "Nadia Islam",    email: "nadia@email.com",   bloodGroup: "A-", city: "Dhaka",      role: "Donor",  status: "Inactive" },
    { id: 5, name: "Rafiul Karim",   email: "rafiul@email.com",  bloodGroup: "O+", city: "Rajshahi",   role: "User",   status: "Active"   },
  ];

  const requests = [
    { id: 1, name: "Karim Hossain", bloodGroup: "B+", hospital: "Dhaka Medical",   city: "Dhaka",      urgency: "Critical", status: "Open"   },
    { id: 2, name: "Nadia Islam",   bloodGroup: "A-", hospital: "Square Hospital", city: "Dhaka",      urgency: "Critical", status: "Open"   },
    { id: 3, name: "Rafiul Karim",  bloodGroup: "O+", hospital: "BIRDEM Hospital", city: "Dhaka",      urgency: "Urgent",   status: "Closed" },
    { id: 4, name: "Sadia Akter",   bloodGroup: "B-", hospital: "City Hospital",   city: "Chittagong", urgency: "Normal",   status: "Open"   },
  ];

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        <Link to="/" className="sidebar-logo">
          Blood<span className="logo-accent">Link</span>
        </Link>

        {/* Admin Badge */}
        <div className="admin-badge-box">
          <div className="sidebar-avatar" style={{ background: "#7c3aed" }}>
            AD
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-name">Admin Panel</p>
            <p className="sidebar-email">admin@bloodlink.com</p>
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
            className={`sidebar-nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Manage Users
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            🩸 Blood Requests
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "donors" ? "active" : ""}`}
            onClick={() => setActiveTab("donors")}
          >
            ❤️ Donors List
          </button>
        </nav>

        <Link to="/" className="sidebar-logout">
          🏠 Back to Home
        </Link>

      </aside>

      {/* Main */}
      <main className="dashboard-main">

        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <div className="dash-section">
            <h2 className="dash-heading">Admin Dashboard</h2>
            <p className="dash-subheading">
              BloodLink platform overview and statistics
            </p>

            {/* Stat Cards */}
            <div className="dash-cards">
              <div className="dash-card">
                <div className="dash-card-icon">👥</div>
                <div>
                  <p className="dash-card-value">{stats.totalUsers.toLocaleString()}</p>
                  <p className="dash-card-label">Total Users</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">🩸</div>
                <div>
                  <p className="dash-card-value">{stats.totalDonors.toLocaleString()}</p>
                  <p className="dash-card-label">Total Donors</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">📋</div>
                <div>
                  <p className="dash-card-value">{stats.totalRequests}</p>
                  <p className="dash-card-label">Blood Requests</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">📍</div>
                <div>
                  <p className="dash-card-value">{stats.citiesCovered}</p>
                  <p className="dash-card-label">Cities Covered</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <h3 className="dash-section-title">Recent Requests</h3>
            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Blood Group</th>
                    <th>Hospital</th>
                    <th>Urgency</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.slice(0, 3).map((req) => (
                    <tr key={req.id}>
                      <td>{req.name}</td>
                      <td>
                        <span className="table-blood-badge">{req.bloodGroup}</span>
                      </td>
                      <td>{req.hospital}</td>
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
                          req.status === "Open" ? "status-active" : "status-closed"
                        }`}>
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

        {/* ── Manage Users Tab ── */}
        {activeTab === "users" && (
          <div className="dash-section">
            <div className="dash-tab-header">
              <div>
                <h2 className="dash-heading">Manage Users</h2>
                <p className="dash-subheading">All registered users on BloodLink</p>
              </div>
            </div>

            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Blood Group</th>
                    <th>City</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td style={{ color: "#ffffff", fontWeight: 600 }}>
                        {user.name}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className="table-blood-badge">{user.bloodGroup}</span>
                      </td>
                      <td>{user.city}</td>
                      <td>
                        <span className={`role-badge ${
                          user.role === "Donor" ? "role-donor" : "role-user"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`table-status ${
                          user.status === "Active" ? "status-active" : "status-closed"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-table-action btn-delete">
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Blood Requests Tab ── */}
        {activeTab === "requests" && (
          <div className="dash-section">
            <div className="dash-tab-header">
              <div>
                <h2 className="dash-heading">Blood Requests</h2>
                <p className="dash-subheading">All active and closed blood requests</p>
              </div>
            </div>

            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Blood Group</th>
                    <th>Hospital</th>
                    <th>City</th>
                    <th>Urgency</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, index) => (
                    <tr key={req.id}>
                      <td>{index + 1}</td>
                      <td style={{ color: "#ffffff", fontWeight: 600 }}>
                        {req.name}
                      </td>
                      <td>
                        <span className="table-blood-badge">{req.bloodGroup}</span>
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
                          req.status === "Open" ? "status-active" : "status-closed"
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-table-action btn-delete">
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Donors List Tab ── */}
        {activeTab === "donors" && (
          <div className="dash-section">
            <div className="dash-tab-header">
              <div>
                <h2 className="dash-heading">Donors List</h2>
                <p className="dash-subheading">All registered blood donors</p>
              </div>
            </div>

            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>City</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((u) => u.role === "Donor")
                    .map((donor, index) => (
                      <tr key={donor.id}>
                        <td>{index + 1}</td>
                        <td style={{ color: "#ffffff", fontWeight: 600 }}>
                          {donor.name}
                        </td>
                        <td>
                          <span className="table-blood-badge">{donor.bloodGroup}</span>
                        </td>
                        <td>{donor.city}</td>
                        <td>01700000000</td>
                        <td>
                          <span className={`table-status ${
                            donor.status === "Active" ? "status-active" : "status-closed"
                          }`}>
                            {donor.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-table-action btn-delete">
                            🗑 Remove
                          </button>
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

export default Admin;