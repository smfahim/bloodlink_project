import React, { useState } from "react";
import { useNavigate }     from "react-router-dom";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const bdDistricts = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola",
  "Bogura", "Brahmanbaria", "Chandpur", "Chapai Nawabganj", "Chattogram",
  "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur",
  "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj",
  "Habiganj", "Jamalpur", "Jessore", "Jhalokathi", "Jhenaidah",
  "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram",
  "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura",
  "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh",
  "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore",
  "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh",
  "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati",
  "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj",
  "Sunamganj", "Sylhet", "Tangail", "Thakurgaon",
];

const Search = () => {
  const [selectedGroup, setSelectedGroup]   = useState("");
  const [city, setCity]                     = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate                            = useNavigate();

  const handleCityChange = (e) => {
    const val = e.target.value;
    setCity(val);

    if (val.length > 0) {
      const filtered = bdDistricts.filter((d) =>
        d.toLowerCase().startsWith(val.toLowerCase())
      );
      setCitySuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (district) => {
    setCity(district);
    setCitySuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedGroup) params.append("bloodGroup", selectedGroup);
    if (city)          params.append("city", city);
    navigate(`/donors?${params.toString()}`);
    setShowSuggestions(false);
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

          {/* City Input with Suggestions */}
          <div className="city-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="City (e.g. Dhaka)"
              value={city}
              onChange={handleCityChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
                if (e.key === "Escape") setShowSuggestions(false);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onFocus={() => city.length > 0 && setShowSuggestions(true)}
              autoComplete="off"
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && citySuggestions.length > 0 && (
              <ul className="city-suggestions">
                {citySuggestions.map((district) => (
                  <li
                    key={district}
                    className="city-suggestion-item"
                    onMouseDown={() => handleSelectCity(district)}
                  >
                    📍 {district}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button className="btn-search" onClick={handleSearch}>
          Search Donors
        </button>
      </div>
    </section>
  );
};

export default Search;