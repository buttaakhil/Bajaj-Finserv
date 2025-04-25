// --- Filters.jsx ---

import React, { useEffect, useState } from "react";
import "./Filters.css";

const Filters = ({ doctors, setFilteredDoctors }) => {
  const [specialties, setSpecialties] = useState([]);
  const [mode, setMode] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const specs = new Set();
    doctors.forEach((doc) => {
      if (doc.speciality) specs.add(doc.speciality);
    });
    setSpecialties(Array.from(specs));
  }, [doctors]);

  const handleFilter = () => {
    let filtered = [...doctors];
    const checked = Array.from(document.querySelectorAll("input[name='speciality']:checked"))
      .map((el) => el.value);

    if (checked.length) {
      filtered = filtered.filter((doc) => checked.includes(doc.speciality));
    }

    if (mode !== "All") {
      filtered = filtered.filter((doc) => doc.mode === mode);
    }

    if (sort === "price") {
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (sort === "experience") {
      filtered.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(filtered);
  };

  return (
    <div className="filters">
      <div className="filter-section">
        <h4>Sort by</h4>
        <label><input type="radio" name="sort" value="price" onChange={(e) => setSort(e.target.value)} /> Price: Low-High</label><br/>
        <label><input type="radio" name="sort" value="experience" onChange={(e) => setSort(e.target.value)} /> Experience</label>
      </div>

      <div className="filter-section">
        <h4>Specialities</h4>
        {specialties.map((spec) => (
          <label key={spec}><input type="checkbox" name="speciality" value={spec} /> {spec}</label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Mode of Consultation</h4>
        <label><input type="radio" name="mode" value="Video Consultation" onChange={(e) => setMode(e.target.value)} /> Video Consultation</label><br/>
        <label><input type="radio" name="mode" value="In-clinic Consultation" onChange={(e) => setMode(e.target.value)} /> In-clinic Consultation</label><br/>
        <label><input type="radio" name="mode" value="All" defaultChecked onChange={(e) => setMode(e.target.value)} /> All</label>
      </div>

      <button onClick={handleFilter} className="apply-button">Apply</button>
    </div>
  );
};

export default Filters;
