import { useEffect, useState, useMemo } from "react";

import ScholarshipFilter from "../components/ScholarshipFilter";
import "../components/MS.css";
import { Pen, Trash2 } from 'lucide-react';
function ViewScholarships() {
  const [search, setSearch] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    loadScholarships();
  }, []);

  const loadScholarships = async () => {
    const res = await fetch("http://127.0.0.1:5000/admin-scholarships");
    const data = await res.json();
    setScholarships(data);
  };

  // Name search applied first; ScholarshipFilter then narrows this further.
  // useMemo avoids creating a new array on every render, which would
  // otherwise re-trigger ScholarshipFilter's effect in a loop.
  const searchFiltered = useMemo(
    () =>
      scholarships.filter((item) =>
        item.sclrname.toLowerCase().includes(search.toLowerCase())
      ),
    [scholarships, search]
  );

  const renderValue = (value) =>
    value === null || value === undefined || value === "" ? "Null" : value;

  return (
    <div style={{ padding: "30px", backgroundColor: "#ebebeb" }}>


      <h1>View Scholarships</h1>

      <input
        type="text"
        placeholder="🔍 Search Scholarship..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ScholarshipFilter scholarships={searchFiltered} onFilter={setFiltered} />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Percentage</th>
            <th>Income</th>
            <th>Gender</th>
            <th>Caste</th>
            <th>Education</th>
            <th>Deadline</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="11">Null</td>
            </tr>
          ) : (
            filtered.map((item) => (
              <tr key={item.sclrid}>
                <td>{renderValue(item.sclrid)}</td>
                <td>{renderValue(item.sclrname)}</td>
                <td>{renderValue(item.amount)}</td>
                <td>{renderValue(item.percentreeq)}</td>
                <td>{renderValue(item.miniincome)}</td>
                <td>{renderValue(item.gender)}</td>
                <td>{renderValue(item.caste)}</td>
                <td>{renderValue(item.educationqualifiation)}</td>
                <td>{renderValue(item.deadline)}</td>
                <td><Pen /></td>
                <td><Trash2 /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewScholarships;
