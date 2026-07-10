import { useState, useEffect } from "react";
import "./ScholarshipFilter.css";

/**
 * Reusable filter bar for scholarship lists.
 * Pass in the raw scholarships array; it calls onFilter(filteredArray)
 * every time a filter changes, so the parent just renders whatever comes back.
 *
 * Props:
 *  - scholarships: array of scholarship objects (already search-filtered if you like)
 *  - onFilter: (filteredArray) => void
 */
// Strips currency symbols, commas, spaces, etc. before converting to a number
// so rows with messy amount formatting (e.g. "₹20,000") don't silently drop
// out of every filter result.
const parseAmount = (value) => {
  if (value === null || value === undefined || value === "") return 0;
  const cleaned = String(value).replace(/[^0-9.-]/g, "");
  const num = Number(cleaned);
  return Number.isNaN(num) ? 0 : num;
};

function ScholarshipFilter({ scholarships, onFilter }) {
  const [gender, setGender] = useState("");
  const [caste, setCaste] = useState("");
  const [education, setEducation] = useState("");
  const [minAmount, setMinAmount] = useState("");

  useEffect(() => {
    let result = scholarships;

    if (gender) {
      result = result.filter((item) => item.gender === gender || item.gender === null || item.gender === undefined);
    }
    if (caste) {
      result = result.filter((item) => item.caste === caste || item.caste === null || item.caste === undefined);
    }
    if (education) {
      result = result.filter(
        (item) => String(item.educationqualifiation) === education || item.educationqualifiation === null || item.educationqualifiation === undefined
      );
    }
    if (minAmount) {
      result = result.filter((item) => parseAmount(item.amount) >= Number(minAmount));
    }

    onFilter(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, caste, education, minAmount, scholarships]);

  const resetFilters = () => {
    setGender("");
    setCaste("");
    setEducation("");
    setMinAmount("");
  };

  const hasActiveFilter = gender || caste || education || minAmount;

  return (
    <div className="scholarship-filter">
      <select
        className="filter-select"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        className="filter-select"
        value={caste}
        onChange={(e) => setCaste(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="General">General</option>
        <option value="OBC">OBC</option>
        <option value="SC">SC</option>
        <option value="ST">ST</option>
        <option value="Minority">Minority</option>
      </select>

      <select
        className="filter-select"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
      >
        <option value="">All Classes</option>
        <option value="11">11th</option>
        <option value="12">12th</option>
      </select>

      <input
        className="filter-input"
        type="number"
        placeholder="Minimum Amount"
        value={minAmount}
        onChange={(e) => setMinAmount(e.target.value)}
      />

      {hasActiveFilter && (
        <button className="filter-reset-btn" onClick={resetFilters}>
          Reset Filters
        </button>
      )}
    </div>
  );
}

export default ScholarshipFilter;
