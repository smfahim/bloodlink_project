import React from "react";

const donors = [
  {
    id: 1,
    name: "S.M. Fahim Ahmed",
    bloodGroup: "A+",
    status: "Available",
    city: "Habiganj",
  },
  {
    id: 2,
    name: "Halima Yesmin Omi",
    bloodGroup: "O+",
    status: "Available",
    city: "Sylhet",
  },
  {
    id: 3,
    name: "Tanjim Hasan",
    bloodGroup: "B+",
    status: "Available",
    city: "Chittagong",
  },
];

const DonorList = () => {
  return (
    <section className="donor-list-section">
      <div className="container">
        <h2 className="section-title">Available Donors</h2>
        <div className="donor-cards">
          {donors.map((donor) => (
            <div className="donor-card" key={donor.id}>
              <div className="donor-card-left">
                <div className="blood-badge">{donor.bloodGroup}</div>
                <div className="donor-info">
                  <h3 className="donor-name">{donor.name}</h3>
                  <p className="donor-meta">
                    <span className="status-dot"></span>
                    {donor.status} · {donor.city}
                  </p>
                </div>
              </div>
              <button className="btn-contact">Contact</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonorList;