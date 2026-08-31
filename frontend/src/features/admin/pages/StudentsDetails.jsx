import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";
import api from "../../../shared/api/axiosInstance";
import "../components/StudentsDetails.css";
function StudentsDetails() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      // const res = await fetch("http://127.0.0.1:5000/admin-students",{
      //   headers:{
      //             Authorization :`Bearer ${token}`,
      //   },
      // });
      const res = await api.get("/admin-students");
      const data = res.data;
      setStudents(data || []);
    } catch (error) {
      toast.error("Error loading students:", error);
      setStudents([]);
    }
  };

  const displayValue = (value) => {
    return value === null || value === undefined || value === ""
      ? "NULL"
      : value;
  };

  const filtered = students.filter((student) =>
    student.stdname?.toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentStudents = filtered.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filtered.length / postPerPage);
  
  const startRecord = filtered.length === 0 ? 0 : indexOfFirstPost + 1;
  const endRecord = Math.min(indexOfLastPost, filtered.length);
  

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  const totalRecords = filtered.length;

  return (
    <div className="manage-container2">
      <h1 className="manage-title">View Students Details</h1>

      <input
        type="text"
        placeholder={`Search Students   TotalStudents: ${totalRecords}`}
        value={search}
        onChange={handleSearchChange}
        className="search-box"
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>College Name</th>
              <th>Income</th>
              <th>Percentage</th>
              <th>Gender</th>
              <th>Caste</th>
              <th>Education</th>
            </tr>
          </thead>

          <tbody>
            {currentStudents.map((item, index) => (
              <tr key={item.stdid}>
                <td>{indexOfFirstPost + index + 1}</td>
                

                 <td className="table-name" title={item.stdname}>
                  <span>{displayValue(item.stdname)}</span>
                </td>


          
                 <td className="table-name" title={item.collegeName}>
                  <span>{displayValue(item.collegeName)}</span>
                </td>


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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        dataPerPage={currentStudents.length}
        pageStart={startRecord}
        pageEnd={startRecord + currentStudents.length - 1}
        totalRecords={totalRecords}
      />
    </div>
  );
}

export default StudentsDetails;
