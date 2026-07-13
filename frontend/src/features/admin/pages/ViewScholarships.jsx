import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import AutoRefresh from "../components/AutoRefresh";
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

 const handleDelete = async (sclrid) => {
    if (window.confirm("Are you sure you want to delete this scholarship?")) {
      try {
        const res = await fetch(`http://127.0.0.1:5000/delete-scholarship/${sclrid}`, {
          method: "DELETE",
        });
        const data = await res.json();
        toast.error(data.message);
       
      } catch (error) {
        toast.error("Error deleting scholarship:", error);
      }
      <AutoRefresh />
    }
     
  };
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
                <td><button style={{ backgroundColor: "#00000000", color: "Blue" ,padding: "9px" }} onClick={() => UpdateScholarship(item.sclrid)}><Pen /></button></td>
                <td><button style={{ backgroundColor: "#00000000", color: "red" ,padding: "9px" }} onClick={() => handleDelete(item.sclrid)}><Trash2 /></button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewScholarships;
