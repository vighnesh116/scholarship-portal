import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import ScholarshipFilter from "../../admin/components/ScholarshipFilter";
import "../../admin/components/MS.css";
import { useNavigate } from "react-router-dom";
import {
  Pen,
  Trash2,
  ListFilterPlus,
  CircleCheck,
  SquarePen,
} from "lucide-react";
import Pagination from "../../admin/components/Pagination";
import api from "../../../shared/api/axiosInstance";
import { confirmAction } from "../../../shared/components/ConfirmAction";


// import "tailwindcss";
function ViewScholarships() {
  const [search, setSearch] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);
  const [showFilter, setShowFilter] = useState(false);

  const token = localStorage.getItem("access_token");
  useEffect(() => {
    loadScholarships();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtered]);

  const onEdit = (item) => {
    navigate("/admin/manage", {
      state: { scholarship: item },
    });
  };
  console.log(scholarships);
  // const loadScholarships = async () => {
  //   const res = await fetch("http://127.0.0.1:5000/admin-scholarships",{
  //     headers:{
  //       Authorization:`Bearer ${token}`,
  //     },
  //   });

  const loadScholarships = async () => {
    const res = await api.get("/admin-scholarships");

    const data = res.data;
    setScholarships(data);
  };

  const handleDelete = async (sclrid) => {
    const confirmed = await confirmAction({
      title: "Delete Scholarship?",
      text: "This action cannot be undone.",
      successTitle: "Deleted!",
      successText: "Scholarship deleted successfully.",
    });

    if (!confirmed) return;

    try {
      // const res = await fetch(
      //   `http://127.0.0.1:5000/delete-scholarship/${sclrid}`,
      //   {  headers:{
      //       Authorization:`Bearer ${token}`,
      //   },
      //     method: "DELETE",
      //   },
      // );

      const res = await api.delete(`/delete-scholarship/${sclrid}`);
      loadScholarships();
      const data = res.data;

      if (res.ok) {
        toast.success(data.message);
        loadScholarships();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting scholarship");
      console.error(error);
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
    value === null || value === undefined || value === "" ? "-" : value;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentScholarships = filtered.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filtered.length / postPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (

    <div style={{ padding: "30px", backgroundColor: "#ebebeb" }} className="manage-container">
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
            <th>Status</th>
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
                <td style={{ padding: "20px" }}>
                  {renderValue(item.draft) != 0 ? (
                    <SquarePen color="#c41c35" />
                  ) : (
                    <CircleCheck color="#58d57d" />
                  )}
                </td>

                <td>
                  <button
                    style={{
                      backgroundColor: "#00000000",
                      color: "blue",
                      padding: "9px",
                    }}
                    onClick={() => onEdit(item)}
                  >
                    <Pen />
                  </button>
                </td>

                <td>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      color: "red",
                      padding: "9px",
                    }}
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
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          dataPerPage={currentScholarships.length}
          pageStart={indexOfFirstPost + 1}
          pageEnd={indexOfFirstPost + currentScholarships.length}
          totalRecords={filtered.length}
        />
      </div>
    </div>
  );
}

export default ViewScholarships;
