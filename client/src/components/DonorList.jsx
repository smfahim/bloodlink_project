import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const DonorList = () => {
  const [donors, setDonors]   = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const { data } = await API.get("/donors");
        setDonors(data.slice(0, 3)); // Home page এ শুধু 3 টা দেখাবে
      } catch (err) {
        console.error("Donor fetch error:", err);
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

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>
            <div
              className="loading-spinner"
              style={{ margin: "0 auto 12px auto" }}
            ></div>
            <p>Loading donors...</p>
          </div>
        )}

        {/* Donor Cards */}
        {!loading && donors.length === 0 && (
          <div className="donors-empty">
            <p className="empty-icon">🩸</p>
            <h3>No donors available</h3>
            <p>Be the first to register as a donor!</p>
          </div>
        )}

        {!loading && donors.length > 0 && (
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
                      : navigate("/donors")
                  }
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        )}

        {/* See All Button */}
        {!loading && (
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
    </section>
  );
};

export default DonorList;