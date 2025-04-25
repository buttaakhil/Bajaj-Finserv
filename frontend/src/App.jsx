import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import Sort from "./components/Sort/Sort";
import DoctorList from "./components/DoctorList/DoctorList";
import useQuery from "./components/utils/useQuery";
import fetchDoctors from "./api/fetchDoctors";
import "./App.css";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    filters,
    setFilters,
    sort,
    setSort,
    filteredDoctors,
    loading,
    error,
  } = useQuery(searchParams, setSearchParams, fetchDoctors);
  const [mainSpec,setMainSpec]=useState([]);

  const [headerFilteredDoctors, setHeaderFilteredDoctors] = useState([]);

  const doctorsToShow = headerFilteredDoctors.length > 0
    ? headerFilteredDoctors
    : filteredDoctors;

  return (
    <div className="app-container">
      <Header doctors={filteredDoctors} setFilteredDoctors={setHeaderFilteredDoctors} />
      <div className="main-content">
        <aside>
          <Sort sort={sort} setSort={setSort} />
          <Filters doctors={filteredDoctors} setFilters={setFilters} filters={filters} setMainSpec={setMainSpec} mainSpec={mainSpec}/>
        </aside>
        <main>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <DoctorList doctors={doctorsToShow} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
