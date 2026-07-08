import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AutoRefresh from "../components/AutoRefresh";
import "../components/MS.css";
function ViewScholarships() {
  const [search, setSearch] = useState("");

  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    loadScholarships();
  }, []);

  const loadScholarships = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin-scholarships");
      const data = await res.json();
      setScholarships(data || []);
    } catch (error) {
      console.error("Error loading scholarships:", error);
      setScholarships([]);
    }
  };

  const filteredScholarships = scholarships.filter((item) =>
    item.sclrname?.toLowerCase().includes(search.toLowerCase()),
  );

  // Function to display NULL for empty values
  const displayValue = (value) => {
    return value === null || value === undefined || value === "" ? "NULL" : value;
  };

  return (
    <div className="manage-container">
      
      
      <h1 className="manage-title">View Scholarships</h1>

      <input
        type="text"
        placeholder="🔍 Search Scholarship..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <br />
      <br />

      <div className="table-container">
        <table>
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
            </tr>
          </thead>

          <tbody>
            {filteredScholarships.map((item) => (
              <tr key={item.sclrid}>
                <td>{displayValue(item.sclrid)}</td>
                <td>{displayValue(item.sclrname)}</td>
                <td>{displayValue(item.amount)}</td>
                <td>{displayValue(item.percentreeq)}</td>
                <td>{displayValue(item.miniincome)}</td>
                <td>{displayValue(item.gender)}</td>
                <td>{displayValue(item.caste)}</td>
                <td>{displayValue(item.educationqualifiation)}</td>
                <td>{displayValue(item.deadline)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredScholarships.length === 0 && (
          <p style={{ textAlign: "center", padding: "20px", color: "#4B5563" }}>
            No scholarships found
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewScholarships;
