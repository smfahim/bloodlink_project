import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Donors = () => {
  const [donors, setDonors]         = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity]             = useState("");
  const [searched, setSearched]     = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // URL params থেকে auto search — Search.jsx থেকে আসলে
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

          <button
            className="btn-search donors-btn"
            onClick={handleSearch}
          >
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

          {/* Loading */}
          {loading && (
            <div className="donors-loading">
              <div className="loading-spinner"></div>
              <p>Finding donors...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="donors-error">{error}</div>
          )}

          {/* No Results */}
          {!loading && searched && donors.length === 0 && (
            <div className="donors-empty">
              <p className="empty-icon">🩸</p>
              <h3>No donors found</h3>
              <p>Try a different blood group or city</p>
            </div>
          )}

          {/* Donor Cards */}
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
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Donors;