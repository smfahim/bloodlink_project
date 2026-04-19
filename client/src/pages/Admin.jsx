import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const { user, logout }              = useAuth();
  const navigate                      = useNavigate();
  const [activeTab, setActiveTab]     = useState("overview");
  const [stats, setStats]             = useState({});
  const [users, setUsers]             = useState([]);
  const [requests, setRequests]       = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
      return;
    }
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, requestsRes] = await Promise.all([
        API.get("/admin/stats"),
        API.get("/admin/users"),
        API.get("/admin/requests"),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setRequests(requestsRes.data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await API.delete(`/admin/requests/${id}`);
      setRequests(requests.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete request");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="dash-loader">
        <div className="loading-spinner"></div>
        <p>Loading admin panel...</p>
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

        <div className="admin-badge-box">
          <div className="sidebar-avatar" style={{ background: "#7c3aed" }}>
            AD
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-name">Admin Panel</p>
            <p className="sidebar-email">{user?.email}</p>
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
            className={`sidebar-nav-item ${activeTab === "users"     ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Manage Users
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "requests"  ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            🩸 Blood Requests
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "donors"    ? "active" : ""}`}
            onClick={() => setActiveTab("donors")}
          >
            ❤️ Donors List
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
            <h2 className="dash-heading">Admin Dashboard</h2>
            <p className="dash-subheading">
              BloodLink platform overview
            </p>

            <div className="dash-cards">
              <div className="dash-card">
                <div className="dash-card-icon">👥</div>
                <div>
                  <p className="dash-card-value">
                    {stats.totalUsers?.toLocaleString()}
                  </p>
                  <p className="dash-card-label">Total Users</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">🩸</div>
                <div>
                  <p className="dash-card-value">
                    {stats.totalDonors?.toLocaleString()}
                  </p>
                  <p className="dash-card-label">Total Donors</p>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-icon">📋</div>
                <div>
                  <p className="dash-card-value">{stats.openRequests}</p>
                  <p className="dash-card-label">Open Requests</p>
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

            {/* Recent Requests */}
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
                  {requests.slice(0, 5).map((req) => (
                    <tr key={req._id}>
                      <td style={{ color: "#fff", fontWeight: 600 }}>
                        {req.patientName}
                      </td>
                      <td>
                        <span className="table-blood-badge">
                          {req.bloodGroup}
                        </span>
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
                          req.status === "Open"
                            ? "status-active"
                            : "status-closed"
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

        {/* ── Manage Users ── */}
        {activeTab === "users" && (
          <div className="dash-section">
            <h2 className="dash-heading">Manage Users</h2>
            <p className="dash-subheading">
              {users.length} registered users
            </p>

            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Blood</th>
                    <th>City</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr key={u._id}>
                      <td>{index + 1}</td>
                      <td style={{ color: "#fff", fontWeight: 600 }}>
                        {u.name}
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <span className="table-blood-badge">
                          {u.bloodGroup}
                        </span>
                      </td>
                      <td>{u.city}</td>
                      <td>
                        <span className={`role-badge ${
                          u.isAdmin  ? "role-admin"  :
                          u.isDonor  ? "role-donor"  :
                          "role-user"
                        }`}>
                          {u.isAdmin ? "Admin" : u.isDonor ? "Donor" : "User"}
                        </span>
                      </td>
                      <td>
                        {!u.isAdmin && (
                          <button
                            className="btn-table-action btn-delete"
                            onClick={() => handleDeleteUser(u._id)}
                          >
                            🗑 Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Blood Requests ── */}
        {activeTab === "requests" && (
          <div className="dash-section">
            <h2 className="dash-heading">Blood Requests</h2>
            <p className="dash-subheading">
              {requests.length} total requests
            </p>

            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Blood</th>
                    <th>Hospital</th>
                    <th>City</th>
                    <th>Urgency</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, index) => (
                    <tr key={req._id}>
                      <td>{index + 1}</td>
                      <td style={{ color: "#fff", fontWeight: 600 }}>
                        {req.patientName}
                      </td>
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
          </div>
        )}

        {/* ── Donors List ── */}
        {activeTab === "donors" && (
          <div className="dash-section">
            <h2 className="dash-heading">Donors List</h2>
            <p className="dash-subheading">
              {users.filter((u) => u.isDonor).length} registered donors
            </p>

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
                    .filter((u) => u.isDonor)
                    .map((donor, index) => (
                      <tr key={donor._id}>
                        <td>{index + 1}</td>
                        <td style={{ color: "#fff", fontWeight: 600 }}>
                          {donor.name}
                        </td>
                        <td>
                          <span className="table-blood-badge">
                            {donor.bloodGroup}
                          </span>
                        </td>
                        <td>{donor.city}</td>
                        <td>{donor.phone || "N/A"}</td>
                        <td>
                          <span className={`table-status ${
                            donor.isAvailable
                              ? "status-active"
                              : "status-closed"
                          }`}>
                            {donor.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-table-action btn-delete"
                            onClick={() => handleDeleteUser(donor._id)}
                          >
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