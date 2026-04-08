import React, { useState } from "react";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Search = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = () => {
    console.log("Searching:", selectedGroup, city);
    // wire to API later
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <h2 className="search-title">Search Blood Donors</h2>

        <div className="search-box">
          {/* Blood Group Dropdown */}
          <select
            className="search-select"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          {/* City Input */}
          <input
            type="text"
            className="search-input"
            placeholder="City (e.g. Dhaka)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button className="btn-search" onClick={handleSearch}>
          Search Donors
        </button>
      </div>
    </section>
  );
};

export default Search;