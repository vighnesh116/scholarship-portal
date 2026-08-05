import { useState, useEffect } from "react";
import "./ScholarshipFilter.css";
import { DraftingCompass } from "lucide-react";

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
  const [draft, setDraft] = useState("");
  // const activeScholarships = scholarships.filter(item => item.days_left >= 0);
  // const inactiveScholarships = scholarships.filter(item => item.days_left < 0);
  const [status, setStatus] = useState("");
  useEffect(() => {
    let result = scholarships;

    if (gender) {
      result = result.filter(
        (item) =>
          item.gender === gender ||
          item.gender === null ||
          item.gender === undefined,
      );
    }
    if (caste) {
      result = result.filter(
        (item) =>
          item.caste === caste ||
          item.caste === null ||
          item.caste === undefined,
      );
    }
    if (education) {
      result = result.filter(
        (item) =>
          String(item.educationqualifiation) === education ||
          item.educationqualifiation === null ||
          item.educationqualifiation === undefined,
      );
    }
    if (minAmount) {
      const userIncome = Number(minAmount);

      result = result.filter((item) => {
        if (item.miniincome == null) {
          return true;
        }

        const scholarshipIncome = Number(item.miniincome);

        if (isNaN(scholarshipIncome)) {
          return false;
        }

        return userIncome <= scholarshipIncome;
      });
    }
    if (draft) {
      result = result.filter((item) => {
        if (item.draft == 0) {
          return false;
        }
        return true;
      });
    }
    if (status) {
      result = result.filter((item) => {
        if (status === "active") return item.is_active;
        if (status === "inactive") return !item.is_active;
        return true;
      });
    }

    onFilter(result);
  }, [gender, caste, education, minAmount, scholarships, draft, status]);

  const resetFilters = () => {
    setGender("");
    setCaste("");
    setEducation("");
    setMinAmount("");
    setDraft("");
    setStatus("");
  };

  const hasActiveFilter =
    gender || caste || education || minAmount || draft || status;

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

      <select
        className="filter-select"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      >
        <option value="">Completed</option>
        <option value="1">Draft</option>
      </select>

      <select
        className="filter-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Scholarships</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
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
