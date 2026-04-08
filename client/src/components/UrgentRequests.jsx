import React from "react";

const requests = [
  {
    id: 1,
    name: "Karim Hossain",
    bloodGroup: "B+",
    hospital: "Dhaka Medical",
    need: "Needs B+ urgently",
    urgency: "CRITICAL",
  },
  {
    id: 2,
    name: "Nadia Islam",
    bloodGroup: "A-",
    hospital: "Square Hospital",
    need: "Needs A- urgently",
    urgency: "CRITICAL",
  },
  {
    id: 3,
    name: "Rafiul Karim",
    bloodGroup: "O+",
    hospital: "BIRDEM Hospital",
    need: "Needs O+ urgently",
    urgency: "URGENT",
  },
];

const urgencyClass = (level) => {
  if (level === "CRITICAL") return "badge-critical";
  if (level === "URGENT") return "badge-urgent";
  return "badge-normal";
};

const UrgentRequests = () => {
  return (
    <section className="urgent-section">
      <div className="container">
        <div className="urgent-header">
          <h2 className="section-title urgent-title">Urgent Requests</h2>
          <p className="urgent-subtitle">People in need of blood right now</p>
        </div>

        <div className="request-cards">
          {requests.map((req) => (
            <div className="request-card" key={req.id}>
              <div className="request-card-left">
                <div className="blood-badge">{req.bloodGroup}</div>
                <div className="request-info">
                  <div className="request-name-row">
                    <h3 className="donor-name">{req.name}</h3>
                    <span className={`urgency-badge ${urgencyClass(req.urgency)}`}>
                      {req.urgency}
                    </span>
                  </div>
                  <p className="donor-meta">
                    {req.hospital} · {req.need}
                  </p>
                </div>
              </div>
              <button className="btn-respond">Respond</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UrgentRequests;