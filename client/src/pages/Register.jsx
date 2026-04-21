import React, { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Requests = () => {
  const { user }                          = useAuth();
  const [requests, setRequests]           = useState([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
  const [showModal, setShowModal]         = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null); // ← Details modal
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError]     = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("All");

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup:  "",
    hospital:    "",
    city:        "",
    urgency:     "Normal",
    message:     "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/requests");
      setRequests(data);
    } catch (err) {
      setError("Failed to load requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitError("");
    setSubmitSuccess("");

    if (!formData.patientName || !formData.bloodGroup ||
        !formData.hospital    || !formData.city) {
      return setSubmitError("Please fill in all required fields");
    }

    setSubmitLoading(true);
    try {
      await API.post("/requests", formData);
      setSubmitSuccess("Blood request posted successfully!");
      setFormData({
        patientName: "", bloodGroup: "",
        hospital:    "", city: "",
        urgency:     "Normal", message: "",
      });
      fetchRequests();
      setTimeout(() => {
        setShowModal(false);
        setSubmitSuccess("");
      }, 2000);
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Failed to post request"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const urgencyClass = (urgency) => {
    if (urgency === "Critical") return "badge-critical";
    if (urgency === "Urgent")   return "badge-urgent";
    return "badge-normal-green";
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60)   return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // Filter by urgency
  const filteredRequests = filterUrgency === "All"
    ? requests
    : requests.filter((r) => r.urgency === filterUrgency);

  return (
    <div>
      <Navbar />

      <div className="requests-page">

        {/* Header */}
        <div className="requests-header">
          <div>
            <h1 className="donors-title">Blood Requests</h1>
            <p className="donors-subtitle">
              {requests.length} people in urgent need of blood
            </p>
          </div>
          {user ? (
            <button
              className="btn-auth btn-post-request"
              onClick={() => setShowModal(true)}
            >
              🩸 Post Request
            </button>
          ) : (
            <a href="/login" className="btn-auth btn-post-request">
              Login to Post Request
            </a>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="request-filter-tabs">
          {["All", "Critical", "Urgent", "Normal"].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${filterUrgency === tab ? "filter-tab-active" : ""}`}
              onClick={() => setFilterUrgency(tab)}
            >
              {tab}
              <span className="filter-tab-count">
                {tab === "All"
                  ? requests.length
                  : requests.filter((r) => r.urgency === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="donors-loading">
            <div className="loading-spinner"></div>
            <p>Loading requests...</p>
          </div>
        )}

        {/* Error */}
        {error && <div className="donors-error">{error}</div>}

        {/* Empty */}
        {!loading && filteredRequests.length === 0 && (
          <div className="donors-empty">
            <p className="empty-icon">🩸</p>
            <h3>No requests found</h3>
            <p>No blood requests at the moment</p>
          </div>
        )}

        {/* Request Cards */}
        {!loading && filteredRequests.length > 0 && (
          <div className="request-cards">
            {filteredRequests.map((req) => (
              <div className="request-card" key={req._id}>
                <div className="request-card-left">
                  <div className="blood-badge">{req.bloodGroup}</div>
                  <div className="request-info">
                    <div className="request-name-row">
                      <h3 className="donor-name">{req.patientName}</h3>
                      <span className={`urgency-badge ${urgencyClass(req.urgency)}`}>
                        {req.urgency}
                      </span>
                    </div>
                    <p className="donor-meta">
                      🏥 {req.hospital} · 📍 {req.city}
                    </p>
                    {req.message && (
                      <p className="request-message">💬 {req.message}</p>
                    )}
                    <p className="request-date">
                      🕐 {timeAgo(req.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="request-card-actions">
                  <button
                    className="btn-view-details"
                    onClick={() => setSelectedRequest(req)}
                  >
                    Details
                  </button>
                  <button
                    className="btn-respond"
                    onClick={() =>
                      req.user?.phone
                        ? window.open(`tel:${req.user.phone}`)
                        : alert("Contact info not available")
                    }
                  >
                    Respond
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── Post Request Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h2 className="modal-title">Post Blood Request</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >✕</button>
            </div>

            {submitError   && <div className="auth-error">{submitError}</div>}
            {submitSuccess && <div className="auth-success">{submitSuccess}</div>}

            <div className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Patient Name *</label>
                  <input
                    type="text" name="patientName"
                    className="form-input dark-input"
                    placeholder="Patient full name"
                    value={formData.patientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Blood Group *</label>
                  <select
                    name="bloodGroup"
                    className="form-input dark-input form-select"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Hospital *</label>
                  <input
                    type="text" name="hospital"
                    className="form-input dark-input"
                    placeholder="Hospital name"
                    value={formData.hospital}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text" name="city"
                    className="form-input dark-input"
                    placeholder="e.g. Dhaka"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Urgency Level</label>
                <select
                  name="urgency"
                  className="form-input dark-input form-select"
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Message</label>
                <textarea
                  name="message"
                  className="form-input dark-input form-textarea"
                  placeholder="Any additional details..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn-auth"
                onClick={handleSubmit}
                disabled={submitLoading}
              >
                {submitLoading ? "Posting..." : "🩸 Post Request"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Request Details Modal ── */}
      {selectedRequest && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="modal-card donor-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header */}
            <div className="modal-header">
              <h2 className="modal-title">Request Details</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedRequest(null)}
              >✕</button>
            </div>

            {/* Top */}
            <div className="donor-modal-top">
              <div
                className="blood-badge"
                style={{ width: "64px", height: "64px", fontSize: "1.3rem" }}
              >
                {selectedRequest.bloodGroup}
              </div>
              <div>
                <h3 className="donor-modal-name">
                  {selectedRequest.patientName}
                </h3>
                <span className={`urgency-badge ${urgencyClass(selectedRequest.urgency)}`}>
                  {selectedRequest.urgency}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="donor-modal-grid">
              <div className="modal-info-item">
                <p className="modal-info-label">🏥 Hospital</p>
                <p className="modal-info-value">{selectedRequest.hospital}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">📍 City</p>
                <p className="modal-info-value">{selectedRequest.city}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">🩸 Blood Group</p>
                <p className="modal-info-value">{selectedRequest.bloodGroup}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">⚡ Urgency</p>
                <p className="modal-info-value">{selectedRequest.urgency}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">📞 Contact</p>
                <p className="modal-info-value">
                  {selectedRequest.user?.phone || "Not provided"}
                </p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">🕐 Posted</p>
                <p className="modal-info-value">
                  {new Date(selectedRequest.createdAt).toLocaleDateString(
                    "en-BD", {
                      year: "numeric", month: "short", day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>

            {/* Message */}
            {selectedRequest.message && (
              <div className="request-detail-message">
                <p className="modal-info-label">💬 Additional Message</p>
                <p className="request-detail-text">
                  {selectedRequest.message}
                </p>
              </div>
            )}

            {/* Status */}
            <div className="request-detail-status">
              <p className="modal-info-label">📋 Status</p>
              <span className={`table-status ${
                selectedRequest.status === "Open"
                  ? "status-active"
                  : "status-closed"
              }`}>
                {selectedRequest.status}
              </span>
            </div>

            {/* Actions */}
            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button
                className="btn-auth"
                style={{ flex: 1 }}
                onClick={() =>
                  selectedRequest.user?.phone
                    ? window.open(`tel:${selectedRequest.user.phone}`)
                    : alert("Contact info not available")
                }
              >
                📞 Respond Now
              </button>
              <button
                className="btn-become"
                style={{ flex: 1, padding: "13px" }}
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Requests;