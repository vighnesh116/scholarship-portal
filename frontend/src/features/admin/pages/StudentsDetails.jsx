import { useEffect, useState } from "react";
import { toast } from "react-toastify";
//import AdminNavbar from "../components/AdminNavbar";
//import AutoRefresh from "../components/AutoRefresh";
function StudentsDetails() {
  const [search, setSearch] = useState("");

  const [editing, setEditing] = useState(false);

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    stdid: "",
    stdname: "",
    miniamount: "",
    stdpercent: "",
    stdincome: "",
    stdgender: "",
    caste: "",
    education: "",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = students.filter((student) =>
    student.stdname?.toLowerCase().includes(search.toLowerCase()),
  );

  const loadStudents = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin-students");
      const data = await res.json();
      setStudents(data || []);
    } catch (error) {
      toast.error("Error loading students:", error);
      setStudents([]);
    }
  };

  // Function to display NULL for empty values
  const displayValue = (value) => {
    return value === null || value === undefined || value === "" ? "NULL" : value;
  };

  return (
    <div className="manage-container">
      
      
      <h1 className="manage-title">View Students Details</h1>

      <input
        type="text"
        placeholder="Search Students"
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
              <th>Income</th>
              <th>Percentage</th>
              <th>Gender</th>
              <th>Caste</th>
              <th>Education</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item,index) => (
              <tr key={item.stdid}>
                <td>{index+1}</td>
                <td>{displayValue(item.stdname)}</td>
                <td>{displayValue(item.stdincome)}</td>
                <td>{displayValue(item.stdpercent)}</td>
                <td>{displayValue(item.stdgender)}</td>
                <td>{displayValue(item.caste)}</td>
                <td>{displayValue(item.education)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p style={{ textAlign: "center", padding: "20px", color: "#4B5563" }}>
            No students found
          </p>
        )}
      </div>
    </div>
  );
}
export default StudentsDetails;
