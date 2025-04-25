import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import DoctorList from "./components/DoctorList/DoctorList";
import "./App.css";
import { fetchDoctors } from "./api/fetchDoctors";
import { useSearchParams } from "react-router-dom";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchDoctors().then((data) => {
      setDoctors(data);
    });
  }, []);

  return (
    <div className="app-container">
      <Header doctors={doctors} setFilteredDoctors={setFilteredDoctors} />
      <div className="content-container">
        <Filters
          doctors={doctors}
          setFilteredDoctors={setFilteredDoctors}
        />
        <DoctorList doctors={filteredDoctors.length ? filteredDoctors : doctors} />
      </div>
    </div>
  );
}

export default App;
