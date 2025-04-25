import React, { useState, useEffect } from "react";
import "./Filters.css";

const Filters = ({ doctors, setFilters, filters,setMainSpec,mainSpec }) => {
  const [specialties, setSpecialties] = useState([]);
  const [selectedMoc, setSelectedMoc] = useState(filters.mode || "All");

  useEffect(() => {
    if (!doctors || !Array.isArray(doctors)) return;

    if(!mainSpec){
      const specs = new Set();

    doctors.forEach((doc) => {
      if (doc.specialities && Array.isArray(doc.specialities)) {
        doc.specialities.forEach((spec) => {
          if (spec.name) specs.add(spec.name);
        });
      }
    });

    setSpecialties(Array.from(specs));
    setMainSpec(Array.from(specs))
    
    }
  }, [doctors]);

  const handleModeChange = (e) => {
    setSelectedMoc(e.target.value);
    setFilters((prev) => ({ ...prev, mode: e.target.value }));
  };

  const handleSpecialtyChange = (e) => {
    const specialty = e.target.value;
    setFilters((prev) => {
      const updatedSpecialties = prev.specialities.includes(specialty)
        ? prev.specialities.filter((s) => s !== specialty) // Remove if unchecked
        : [...prev.specialities, specialty]; // Add if checked

      return { ...prev, specialities: updatedSpecialties };
    });
  };

  useEffect(() => {
    setSelectedMoc(filters.mode);
  }, [filters.mode]);

  return (
    <div className="filters">
      <div className="filter-section">
        <h4>Specialities</h4>
        {specialties.map((spec) => (
          <label key={spec}>
            <input
              type="checkbox"
              value={spec}
              onChange={handleSpecialtyChange}
              checked={filters.specialities.includes(spec)} // Ensure the checkbox reflects the state
            />
            {spec}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Mode of Consultation</h4>
        <label>
          <input
            type="radio"
            name="mode"
            value="video_consult"
            onChange={handleModeChange}
            checked={selectedMoc === "video_consult"}
          />
          Video Consultation
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="mode"
            value="in_clinic"
            onChange={handleModeChange}
            checked={selectedMoc === "in_clinic"}
          />
          In-clinic Consultation
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="mode"
            value="All"
            onChange={handleModeChange}
            checked={selectedMoc === "All"}
          />
          All
        </label>
      </div>
    </div>
  );
};

export default Filters;
