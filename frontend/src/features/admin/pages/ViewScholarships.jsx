import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import ScholarshipFilter from "../components/ScholarshipFilter";
import "../components/MS.css";
import { useNavigate } from "react-router-dom";
import { Pen, Trash2 } from "lucide-react";
import Pagination from "../components/Pagination";

function ViewScholarships() {
  const [search, setSearch] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    loadScholarships();
  }, []);

  // Reset to page 1 whenever the filtered result set changes
  // (covers both search changes and ScholarshipFilter changes)
  useEffect(() => {
    setCurrentPage(1);
  }, [filtered]);

  const onEdit = (item) => {
    navigate("/admin/manage", {
      state: { scholarship: item },
    });
  };

  const loadScholarships = async () => {
    const res = await fetch("http://127.0.0.1:5000/admin-scholarships");
    const data = await res.json();
    setScholarships(data);
  };

  const handleDelete = async (sclrid) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/delete-scholarship/${sclrid}`,
          { method: "DELETE" },
        );
        const data = await res.json();
        if (res.ok) {
          toast.error(data.message);
          await loadScholarships();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
        toast.error("Error deleting scholarship");
      }
    }
  };

  const searchFiltered = useMemo(
    () =>
      scholarships.filter((item) =>
        item.sclrname.toLowerCase().includes(search.toLowerCase()),
      ),
    [scholarships, search],
  );

  const renderValue = (value) =>
    value === null || value === undefined || value === "" ? "Null" : value;

  // Pagination now based on `filtered` — the FINAL list actually shown
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentScholarships = filtered.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filtered.length / postPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#ebebeb" }}>
      <h1>View Scholarships</h1>

     <input
        type="text"
        placeholder="🔍 Search Scholarship..."
        value={search}
        onChange={handleSearchChange}
      />

      <ScholarshipFilter scholarships={searchFiltered} onFilter={setFiltered} />
       
      <table border="1">
        <thead>
          <tr>
            <th>S.No</th>
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
            currentScholarships.map((item, index) => (
              <tr key={item.sclrid}>
                <td>{indexOfFirstPost + index + 1}</td>
                <td>{renderValue(item.sclrname)}</td>
                <td>{renderValue(item.amount)}</td>
                <td>{renderValue(item.percentreeq)}</td>
                <td>{renderValue(item.miniincome)}</td>
                <td>{renderValue(item.gender)}</td>
                <td>{renderValue(item.caste)}</td>
                <td>{renderValue(item.educationqualifiation)}</td>
                <td>{renderValue(item.deadline)}</td>

                <td>
                  <button
                    style={{ backgroundColor: "#00000000", color: "blue", padding: "9px" }}
                    onClick={() => onEdit(item)}
                  >
                    <Pen />
                  </button>
                </td>

                <td>
                  <button
                    style={{ backgroundColor: "#00000000", color: "red", padding: "9px" }}
                    onClick={() => handleDelete(item.sclrid)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ViewScholarships;