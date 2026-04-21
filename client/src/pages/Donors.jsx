import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

// Blood compatibility data
const compatibility = {
  "A+":  { donateTo: ["A+", "AB+"],                    receiveFrom: ["A+", "A-", "O+", "O-"] },
  "A-":  { donateTo: ["A+", "A-", "AB+", "AB-"],       receiveFrom: ["A-", "O-"] },
  "B+":  { donateTo: ["B+", "AB+"],                    receiveFrom: ["B+", "B-", "O+", "O-"] },
  "B-":  { donateTo: ["B+", "B-", "AB+", "AB-"],       receiveFrom: ["B-", "O-"] },
  "O+":  { donateTo: ["A+", "B+", "O+", "AB+"],        receiveFrom: ["O+", "O-"] },
  "O-":  { donateTo: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], receiveFrom: ["O-"] },
  "AB+": { donateTo: ["AB+"],                          receiveFrom: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
  "AB-": { donateTo: ["AB+", "AB-"],                   receiveFrom: ["A-", "B-", "O-", "AB-"] },
};

const Donors = () => {
  const [donors, setDonors]         = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity]             = useState("");
  const [searched, setSearched]     = useState(false);
  const [selected, setSelected]     = useState(null); // ← Modal donor

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bg     = params.get("bloodGroup") || "";
    const ct     = params.get("city")       || "";
    setBloodGroup(bg);
    setCity(ct);
    fetchDonors(bg, ct);
  }, [location.search]);

  const fetchDonors = async (bg = "", ct = "") => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (bg) params.bloodGroup = bg;
      if (ct) params.city       = ct;
      const { data } = await API.get("/donors", { params });
      setDonors(data);
      setSearched(true);
    } catch (err) {
      setError("Failed to load donors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (bloodGroup) params.append("bloodGroup", bloodGroup);
    if (city)       params.append("city", city);
    navigate(`/donors?${params.toString()}`);
  };

  const handleReset = () => {
    setBloodGroup("");
    setCity("");
    navigate("/donors");
  };

  return (
    <div>
      <Navbar />

      <div className="donors-page">

        {/* Header */}
        <div className="donors-header">
          <h1 className="donors-title">Find Blood Donors</h1>
          <p className="donors-subtitle">
            Search from {donors.length}+ verified donors across Bangladesh
          </p>
        </div>

        {/* Search Box */}
        <div className="donors-search-box">
          <select
            className="search-select donors-select"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          <input
            type="text"
            className="search-input donors-input"
            placeholder="Search by city (e.g. Dhaka)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button className="btn-search donors-btn" onClick={handleSearch}>
            🔍 Search
          </button>

          {(bloodGroup || city) && (
            <button className="btn-reset" onClick={handleReset}>
              ✕ Reset
            </button>
          )}
        </div>

        {/* Results */}
        <div className="donors-results">

          {loading && (
            <div className="donors-loading">
              <div className="loading-spinner"></div>
              <p>Finding donors...</p>
            </div>
          )}

          {error && <div className="donors-error">{error}</div>}

          {!loading && searched && donors.length === 0 && (
            <div className="donors-empty">
              <p className="empty-icon">🩸</p>
              <h3>No donors found</h3>
              <p>Try a different blood group or city</p>
            </div>
          )}

          {!loading && donors.length > 0 && (
            <>
              <p className="donors-count">
                Showing <strong>{donors.length}</strong> donor(s)
              </p>

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
                            : alert("No phone number available")
                        }
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
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

            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">Donor Details</h2>
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>

            {/* Donor Info */}
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
                <p className="modal-info-value" style={{ color: "#22c55e" }}>
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

            {/* Action Buttons */}
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

      <Footer />
    </div>
  );
};

export default Donors;