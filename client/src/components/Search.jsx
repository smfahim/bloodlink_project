function Search() {
  return (
    <section className="search-section">
      <div className="search-title">Search Blood Donors</div>

      <div className="search-box">
        <div className="search-row">
          <select>
            <option>Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
          </select>

          <input type="text" placeholder="City (e.g. Dhaka)" />
        </div>

        <button className="search-btn">Search Donors</button>
      </div>
    </section>
  );
}

export default Search;