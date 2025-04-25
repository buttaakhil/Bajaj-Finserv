import { useEffect, useState } from "react";

const useQuery = (searchParams, setSearchParams, fetchDoctors) => {
  const [filters, setFilters] = useState({
    specialities: searchParams.getAll("specialities") || [],
    mode: searchParams.get("mode") || "All", // Default mode is "All"
  });
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update query params in the URL when filters or sort change
  useEffect(() => {
    const params = new URLSearchParams();
    filters.specialities.forEach((s) => params.append("specialities", s));
    if (filters.mode) params.set("mode", filters.mode);
    if (sort) params.set("sort", sort);
    setSearchParams(params);
  }, [filters, sort, setSearchParams]);

  useEffect(() => {
    setLoading(true);
    fetchDoctors()
      .then((data) => {
        let doctors = [...data];

        // Filter by selected specialties
        if (filters.specialities.length) {
          doctors = doctors.filter(
            (doc) =>
              Array.isArray(doc.specialities) &&
              doc.specialities.some((s) => filters.specialities.includes(s.name))
          );
        }

        // Filter by consultation mode (moc)
        if (filters.mode !== "All") {
          doctors = doctors.filter((doc) => {
            if (filters.mode === "video_consult" && doc.video_consult) {
              return true;
            } else if (filters.mode === "in_clinic" && doc.in_clinic) {
              return true;
            }
            return false;
          });
        }

        // Sorting logic
        if (sort === "price") {
          doctors.sort((a, b) => {
            const feeA = parseInt(a.fees.replace(/[^\d]/g, ""));
            const feeB = parseInt(b.fees.replace(/[^\d]/g, ""));
            return feeA - feeB;
          });
        } else if (sort === "experience") {
          doctors.sort(
            (a, b) => parseInt(b.experience) - parseInt(a.experience)
          );
        }

        setFilteredDoctors(doctors);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load doctors");
        setLoading(false);
      });
  }, [filters, sort, fetchDoctors]);

  return {
    filters,
    setFilters,
    sort,
    setSort,
    filteredDoctors,
    loading,
    error,
  };
};

export default useQuery;
