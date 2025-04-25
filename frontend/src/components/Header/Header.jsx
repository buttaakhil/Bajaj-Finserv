import React, { useState } from "react";
import "./Header.css";

const Header = ({ doctors, setFilteredDoctors }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (!text) return setFilteredDoctors([]);
    const result = doctors.filter((doc) =>
      doc.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctors(result);
  };

  const topSuggestions = doctors
    .filter((doc) =>
      doc.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(0, 3);

  return (
    <div className="header">
      <input
        type="text"
        className="search-bar"
        data-testid="autocomplete-input"
        placeholder="Search Symptoms, Doctors, Specialists, Clinics"
        value={searchText}
        onChange={handleSearch}
      />
      {searchText && topSuggestions.length > 0 && (
        <ul className="suggestions">
          {topSuggestions.map((doc) => (
            <li
              key={doc.id}
              className="suggestion-item"
              data-testid="suggestion-item"
              onClick={() => {
                setFilteredDoctors([doc]);
                setSearchText(doc.name);
              }}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Header;
