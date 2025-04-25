import React from "react";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors }) => {
  return (
    <div>
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))
      ) : (
        <p>No doctors match your filters.</p>
      )}
    </div>
  );
};

export default DoctorList;
