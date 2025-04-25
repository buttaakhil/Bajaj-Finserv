import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  const { name, photo, specialities, experience, fees } = doctor;

  return (
    <div className="doctor-card" data-testid="doctor-card">
      <img src={photo} alt={name} className="doctor-photo" />
      <div className="doctor-info">
        <h3 data-testid="doctor-name">{name}</h3>
        <p data-testid="doctor-specialty">
          {specialities.map((s) => s.name).join(", ")}
        </p>
        <p data-testid="doctor-experience">{experience}</p>
        <p data-testid="doctor-fee">{fees}</p>
        <button className="appointment-btn">Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorCard;
