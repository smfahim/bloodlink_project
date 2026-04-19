import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const UrgentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);
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

        {/* No Requests */}
        {!loading && requests.length === 0 && (
          <div className="donors-empty">
            <p className="empty-icon">🩸</p>
            <h3>No urgent requests</h3>
            <p>No active blood requests at the moment</p>
          </div>
        )}

        {/* Request Cards */}
        {!loading && requests.length > 0 && (
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
                      {req.hospital} · Needs {req.bloodGroup} urgently
                    </p>
                    {req.message && (
                      <p className="request-message">💬 {req.message}</p>
                    )}
                  </div>
                </div>
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
            ))}
          </div>
        )}

        {/* See All Button */}
        {!loading && requests.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button
              className="btn-respond"
              style={{ padding: "12px 32px" }}
              onClick={() => navigate("/requests")}
            >
              See All Requests →
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default UrgentRequests;