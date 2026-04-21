import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const UrgentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate                = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await API.get("/requests");
        setRequests(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const urgencyClass = (urgency) => {
    if (urgency === "Critical") return "badge-critical";
    if (urgency === "Urgent")   return "badge-urgent";
    return "badge-normal-green";
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60)    return "Just now";
    if (seconds < 3600)  return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <section className="urgent-section">
      <div className="container">

        <div className="urgent-header">
          <h2 className="section-title urgent-title">Urgent Requests</h2>
          <p className="urgent-subtitle">People in need of blood right now</p>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>
            <div
              className="loading-spinner"
              style={{ margin: "0 auto 12px auto" }}
            ></div>
            <p>Loading requests...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && requests.length === 0 && (
          <div className="donors-empty">
            <p className="empty-icon">🩸</p>
            <h3>No urgent requests</h3>
            <p>No active blood requests at the moment</p>
          </div>
        )}

        {/* Request Cards */}
        {!loading && requests.length > 0 && (
          <>
            <div className="request-cards">
              {requests.map((req) => (
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

                  {/* Action Buttons */}
                  <div className="request-card-actions">
                    <button
                      className="btn-view-details"
                      onClick={() => setSelected(req)}
                    >
                      Details
                    </button>
                    <button
                      className="btn-respond"
                      onClick={() =>
                        req.user?.phone
                          ? window.open(`tel:${req.user.phone}`)
                          : navigate("/requests")
                      }
                    >
                      Respond
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* See All */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <button
                className="btn-respond"
                style={{ padding: "12px 32px" }}
                onClick={() => navigate("/requests")}
              >
                See All Requests →
              </button>
            </div>
          </>
        )}

      </div>

      {/* ── Request Details Modal ── */}
      {selected && (
        <div
          className="modal-overlay"
          onClick={() => setSelected(null)}
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
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>

            {/* Top */}
            <div className="donor-modal-top">
              <div
                className="blood-badge"
                style={{ width: "64px", height: "64px", fontSize: "1.3rem" }}
              >
                {selected.bloodGroup}
              </div>
              <div>
                <h3 className="donor-modal-name">{selected.patientName}</h3>
                <span className={`urgency-badge ${urgencyClass(selected.urgency)}`}>
                  {selected.urgency}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="donor-modal-grid">
              <div className="modal-info-item">
                <p className="modal-info-label">🏥 Hospital</p>
                <p className="modal-info-value">{selected.hospital}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">📍 City</p>
                <p className="modal-info-value">{selected.city}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">🩸 Blood Group</p>
                <p className="modal-info-value">{selected.bloodGroup}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">⚡ Urgency</p>
                <p className="modal-info-value">{selected.urgency}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">📞 Contact</p>
                <p className="modal-info-value">
                  {selected.user?.phone || "Not provided"}
                </p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">🕐 Posted</p>
                <p className="modal-info-value">
                  {timeAgo(selected.createdAt)}
                </p>
              </div>
            </div>

            {/* Message */}
            {selected.message && (
              <div className="request-detail-message">
                <p className="modal-info-label">💬 Additional Message</p>
                <p className="request-detail-text">{selected.message}</p>
              </div>
            )}

            {/* Status */}
            <div className="request-detail-status">
              <p className="modal-info-label">📋 Status</p>
              <span className={`table-status ${
                selected.status === "Open"
                  ? "status-active"
                  : "status-closed"
              }`}>
                {selected.status}
              </span>
            </div>

            {/* Actions */}
            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button
                className="btn-auth"
                style={{ flex: 1 }}
                onClick={() =>
                  selected.user?.phone
                    ? window.open(`tel:${selected.user.phone}`)
                    : alert("Contact info not available")
                }
              >
                📞 Respond Now
              </button>
              <button
                className="btn-become"
                style={{ flex: 1, padding: "13px" }}
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default UrgentRequests;