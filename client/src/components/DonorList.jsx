import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const compatibility = {
  "A+":  { donateTo: ["A+", "AB+"],                              receiveFrom: ["A+", "A-", "O+", "O-"] },
  "A-":  { donateTo: ["A+", "A-", "AB+", "AB-"],                receiveFrom: ["A-", "O-"] },
  "B+":  { donateTo: ["B+", "AB+"],                             receiveFrom: ["B+", "B-", "O+", "O-"] },
  "B-":  { donateTo: ["B+", "B-", "AB+", "AB-"],                receiveFrom: ["B-", "O-"] },
  "O+":  { donateTo: ["A+", "B+", "O+", "AB+"],                 receiveFrom: ["O+", "O-"] },
  "O-":  { donateTo: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], receiveFrom: ["O-"] },
  "AB+": { donateTo: ["AB+"],                                   receiveFrom: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
  "AB-": { donateTo: ["AB+", "AB-"],                            receiveFrom: ["A-", "B-", "O-", "AB-"] },
};

const DonorList = () => {
  const [donors, setDonors]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate                = useNavigate();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const { data } = await API.get("/donors");
        setDonors(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  return (
    <section className="donor-list-section">
      <div className="container">
        <h2 className="section-title">Available Donors</h2>

        {loading && (
          <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>
            <div
              className="loading-spinner"
              style={{ margin: "0 auto 12px auto" }}
            ></div>
            <p>Loading donors...</p>
          </div>
        )}

        {!loading && donors.length === 0 && (
          <div className="donors-empty">
            <p className="empty-icon">🩸</p>
            <h3>No donors available</h3>
            <p>Be the first to register as a donor!</p>
          </div>
        )}

        <div className="donor-cards">
          {donors.map((donor) => (
            <div className="donor-card" key={donor._id}>
              <div className="donor-card-left">
                <div className="blood-badge">{donor.bloodGroup}</div>
                <div className="donor-info">
                  <h3 className="donor-name">{donor.name}</h3>
                  <p className="donor-meta">
                    <span className="status-dot"></span>
                    Available · {donor.city}
                  </p>
                  {donor.phone && (
                    <p className="donor-phone">📞 {donor.phone}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="donor-card-actions">
                <button
                  className="btn-view-details"
                  onClick={() => setSelected(donor)}
                >
                  View Details
                </button>
                <button
                  className="btn-contact"
                  onClick={() =>
                    donor.phone
                      ? window.open(`tel:${donor.phone}`)
                      : navigate("/donors")
                  }
                >
                  Contact
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* See All */}
        {!loading && donors.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button
              className="btn-become"
              style={{ padding: "12px 32px" }}
              onClick={() => navigate("/donors")}
            >
              See All Donors →
            </button>
          </div>
        )}

      </div>

      {/* ── Donor Details Modal ── */}
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
              <h2 className="modal-title">Donor Details</h2>
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
                <h3 className="donor-modal-name">{selected.name}</h3>
                <p className="donor-modal-sub">
                  <span className="status-dot"></span>
                  Available Donor · {selected.city}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="donor-modal-grid">
              <div className="modal-info-item">
                <p className="modal-info-label">📍 City</p>
                <p className="modal-info-value">{selected.city}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">🩸 Blood Group</p>
                <p className="modal-info-value">{selected.bloodGroup}</p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">📞 Phone</p>
                <p className="modal-info-value">
                  {selected.phone || "Not provided"}
                </p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">💉 Total Donations</p>
                <p className="modal-info-value">
                  {selected.totalDonations || 0} times
                </p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">📅 Member Since</p>
                <p className="modal-info-value">
                  {new Date(selected.createdAt).toLocaleDateString("en-BD", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              </div>
              <div className="modal-info-item">
                <p className="modal-info-label">✅ Status</p>
                <p
                  className="modal-info-value"
                  style={{ color: "#22c55e" }}
                >
                  ● Active Donor
                </p>
              </div>
            </div>

            {/* Blood Compatibility */}
            {compatibility[selected.bloodGroup] && (
              <div className="modal-compatibility">
                <p className="modal-compat-title">🔄 Blood Compatibility</p>
                <div className="modal-compat-row">
                  <div>
                    <p className="modal-compat-label">Can Donate To</p>
                    <div className="compat-tags">
                      {compatibility[selected.bloodGroup].donateTo.map((bg) => (
                        <span key={bg} className="compat-tag tag-donate">
                          {bg}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="modal-compat-label">Can Receive From</p>
                    <div className="compat-tags">
                      {compatibility[selected.bloodGroup].receiveFrom.map((bg) => (
                        <span key={bg} className="compat-tag tag-receive">
                          {bg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="modal-actions">
              <button
                className="btn-auth"
                style={{ flex: 1 }}
                onClick={() =>
                  selected.phone
                    ? window.open(`tel:${selected.phone}`)
                    : alert("No phone number available")
                }
              >
                📞 Call Donor
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

export default DonorList;