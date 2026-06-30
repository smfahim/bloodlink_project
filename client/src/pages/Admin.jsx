import React, { useState, useEffect } from "react";
import { Link, useNavigate }          from "react-router-dom";
import API                            from "../api/axios";
import { useAuth }                    from "../context/AuthContext";

const Admin = () => {
  const { user, logout }          = useAuth();
  const navigate                  = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats]         = useState({});
  const [users, setUsers]         = useState([]);
  const [requests, setRequests]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  useEffect(() => {
    fetchAll();
  }, []);

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
    if (!window.confirm("Delete this user permanently?")) return;
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

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60)    return "Just now";
    if (seconds < 3600)  return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchUser.toLowerCase());
    const matchRole   = filterRole === "All"   ? true :
                        filterRole === "Admin"  ? u.isAdmin :
                        filterRole === "Donor"  ? u.isDonor && !u.isAdmin :
                        !u.isDonor && !u.isAdmin;
    return matchSearch && matchRole;
  });

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

      {/* ── Sidebar ── */}
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
          {[
            { tab: "overview",  icon: "📊", label: "Overview"       },
            { tab: "users",     icon: "👥", label: "Manage Users"   },
            { tab: "requests",  icon: "🩸", label: "Blood Requests" },
            { tab: "donors",    icon: "❤️", label: "Donors List"    },
          ].map(({ tab, icon, label }) => (
            <button
              key={tab}
              className={`sidebar-nav-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {icon} {label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link to="/" className="sidebar-nav-item" style={{ textDecoration: "none", color: "#888" }}>
            🏠 Back to Home
          </Link>
          <button className="sidebar-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="dashboard-main">

        {/* ════ Overview ════ */}
        {activeTab === "overview" && (
          <div className="dash-section">
            <h2 className="dash-heading">Admin Dashboard</h2>
            <p className="dash-subheading">BloodLink platform overview</p>

            {/* Stat Cards */}
            <div className="dash-cards">
              {[
                { icon: "👥", value: stats.totalUsers,    label: "Total Users"    },
                { icon: "🩸", value: stats.totalDonors,   label: "Total Donors"   },
                { icon: "📋", value: stats.openRequests,  label: "Open Requests"  },
                { icon: "📍", value: stats.citiesCovered, label: "Cities Covered" },
              ].map((card, i) => (
                <div className="dash-card" key={i}>
                  <div className="dash-card-icon">{card.icon}</div>
                  <div>
                    <p className="dash-card-value">
                      {card.value?.toLocaleString() || 0}
                    </p>
                    <p className="dash-card-label">{card.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Users */}
            <h3 className="dash-section-title">Recent Registrations</h3>
            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Blood</th>
                    <th>Role</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map((u) => (
                    <tr key={u._id}>
                      <td style={{ color: "#fff", fontWeight: 600 }}>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className="table-blood-badge">{u.bloodGroup}</span>
                      </td>
                      <td>
                        <span className={`role-badge ${
                          u.isAdmin ? "role-admin" :
                          u.isDonor ? "role-donor" : "role-user"
                        }`}>
                          {u.isAdmin ? "Admin" : u.isDonor ? "Donor" : "User"}
                        </span>
                      </td>
                      <td>{timeAgo(u.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Requests */}
            <h3 className="dash-section-title" style={{ marginTop: "28px" }}>
              Recent Blood Requests
            </h3>
            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Blood</th>
                    <th>Hospital</th>
                    <th>Urgency</th>
                    <th>Posted</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.slice(0, 5).map((req) => (
                    <tr key={req._id}>
                      <td style={{ color: "#fff", fontWeight: 600 }}>
                        {req.patientName}
                      </td>
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
                      <td>{timeAgo(req.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════ Manage Users ════ */}
        {activeTab === "users" && (
          <div className="dash-section">
            <div className="dash-tab-header">
              <div>
                <h2 className="dash-heading">Manage Users</h2>
                <p className="dash-subheading">
                  {filteredUsers.length} of {users.length} users
                </p>
              </div>
            </div>

            {/* Search + Filter */}
            <div className="admin-filter-bar">
              <input
                type="text"
                className="admin-search-input"
                placeholder="🔍 Search by name or email..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <div className="admin-role-filter">
                {["All", "Admin", "Donor", "User"].map((role) => (
                  <button
                    key={role}
                    className={`filter-tab ${filterRole === role ? "filter-tab-active" : ""}`}
                    onClick={() => setFilterRole(role)}
                  >
                    {role}
                    <span className="filter-tab-count">
                      {role === "All"   ? users.length :
                       role === "Admin" ? users.filter((u) => u.isAdmin).length :
                       role === "Donor" ? users.filter((u) => u.isDonor && !u.isAdmin).length :
                       users.filter((u) => !u.isDonor && !u.isAdmin).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Blood</th>
                    <th>City</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, index) => (
                    <tr key={u._id}>
                      <td>{index + 1}</td>
                      <td style={{ color: "#fff", fontWeight: 600 }}>
                        {u.name}
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <span className="table-blood-badge">{u.bloodGroup}</span>
                      </td>
                      <td>{u.city}</td>
                      <td>{u.phone || "N/A"}</td>
                      <td>
                        <span className={`role-badge ${
                          u.isAdmin ? "role-admin" :
                          u.isDonor ? "role-donor" : "role-user"
                        }`}>
                          {u.isAdmin ? "Admin" : u.isDonor ? "Donor" : "User"}
                        </span>
                      </td>
                      <td>{timeAgo(u.createdAt)}</td>
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

              {filteredUsers.length === 0 && (
                <div className="admin-empty">
                  <p>No users found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ Blood Requests ════ */}
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
                    <th>Posted</th>
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
                      <td>{timeAgo(req.createdAt)}</td>
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

              {requests.length === 0 && (
                <div className="admin-empty">
                  <p>No requests found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ Donors List ════ */}
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
                    <th>Donations</th>
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
                            donor.isAvailable ? "status-active" : "status-closed"
                          }`}>
                            {donor.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </td>
                        <td>{donor.totalDonations || 0}</td>
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

              {users.filter((u) => u.isDonor).length === 0 && (
                <div className="admin-empty">
                  <p>No donors found</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;