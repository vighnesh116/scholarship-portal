import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function StudentsDetails() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10); // no setter needed unless you want it adjustable
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

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

  const displayValue = (value) => {
    return value === null || value === undefined || value === "" ? "NULL" : value;
  };

  // 1. Filter first (same as before)
  const filtered = students.filter((student) =>
    student.stdname?.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Slice the filtered list to get only the current page's rows
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentStudents = filtered.slice(indexOfFirstPost, indexOfLastPost);

  // 3. Work out how many page buttons we need
  const totalPages = Math.ceil(filtered.length / postPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 4. Reset to page 1 whenever the search term changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="manage-container">
      <h1 className="manage-title">View Students Details</h1>

      <input
        type="text"
        placeholder="Search Students"
        value={search}
        onChange={handleSearchChange}
        className="search-box"
      />

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
            {currentStudents.map((item, index) => (
              <tr key={item.stdid}>
                <td>{indexOfFirstPost + index + 1}</td>
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

      {/* Numbered pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {pageNumbers.map((num) => (
            <button
              key={num}
              className={num === currentPage ? "active-page" : ""}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentsDetails;