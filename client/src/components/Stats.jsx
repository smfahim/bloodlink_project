import React from "react";

const stats = [
  { value: "1,240+", label: "Donors" },
  { value: "860+",   label: "Lives Saved" },
  { value: "64",     label: "Cities" },
];

const Stats = () => {
  return (
    <section className="stats">
      {stats.map((stat, index) => (
        <div className="stat-item" key={index}>
          <h2 className="stat-value">{stat.value}</h2>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

export default Stats;