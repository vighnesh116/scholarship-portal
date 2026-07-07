import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AutoRefresh from "../components/AutoRefresh";
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
    student.stdname.toLowerCase().includes(search.toLowerCase()),
  );

  const loadStudents = async () => {
    const res = await fetch("http://127.0.0.1:5000/admin-students");

    const data = await res.json();

    setStudents(data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <AutoRefresh />
      <AdminNavbar />
      <h1>View Students Details</h1>

      <input
        type="text"
        placeholder=" Search Students"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <table border="1">
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
          {filtered.map((item) => (
            <tr key={item.stdid}>
              <td>{item.stdid}</td>
              <td>{item.stdname}</td>
              <td>{item.stdincome}</td>
              <td>{item.stdpercent}</td>
              <td>{item.stdgender}</td>
              <td>{item.caste}</td>
              <td>{item.education}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default StudentsDetails;
