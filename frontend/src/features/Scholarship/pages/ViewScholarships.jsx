import { useEffect, useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import ScholarshipFilter from "../../admin/components/ScholarshipFilter";
import "../../admin/components/MS.css";
import { useNavigate } from "react-router-dom";
import {
  Pen,
  Trash2,
  MoreVertical,
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
  const [postPerPage] = useState(10);
  
  const [actionMenu, setActionMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef({});

  useEffect(() => {
    loadScholarships();
  }, []);

  // Close the menu on outside click / scroll / resize so a stale
  // portal menu doesn't linger detached from its row.
  useEffect(() => {
    if (actionMenu === null) return;

    const handleOutsideClick = (e) => {
      const openButton = buttonRefs.current[actionMenu];
      const clickedInsideButton = openButton && openButton.contains(e.target);
      const clickedInsideMenu = e.target.closest(".action-menu");
      if (!clickedInsideButton && !clickedInsideMenu) {
        setActionMenu(null);
      }
    };
    const handleReposition = () => setActionMenu(null);

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [actionMenu]);

  const toggleActionMenu = (sclrid) => {
    if (actionMenu === sclrid) {
      setActionMenu(null);
      return;
    }
    const btn = buttonRefs.current[sclrid];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.right - 110, // 110px = .action-menu width, right-aligned to the button
      });
    }
    setActionMenu(sclrid);
  };

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

    <div style={{ padding: "30px", backgroundColor: "#ebebeb" }} className="manage-container3">
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
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="11">Null</td>
            </tr>
          ) : (
            currentScholarships.map((item, index) => (
              <tr
                key={item.sclrid}
                className={actionMenu === item.sclrid ? "action-row-open" : ""}
              >
                <td>{indexOfFirstPost + index + 1}</td>
                <td className="table-name" title={item.sclrname}>
                  <span>{renderValue(item.sclrname)}</span>
                </td>
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

                <td className="action-cell">
                  <button
                    className="action-button"
                    ref={(el) => (buttonRefs.current[item.sclrid] = el)}
                    onClick={() => toggleActionMenu(item.sclrid)}
                  >
                    <MoreVertical size={20} />
                  </button>

                  {actionMenu === item.sclrid &&
                    createPortal(
                      <div
                        className="action-menu"
                        style={{
                          position: "fixed",
                          top: menuPosition.top,
                          left: menuPosition.left,
                        }}
                      >
                        <button
                          onClick={() => {
                            onEdit(item);
                            setActionMenu(null);
                          }}
                        >
                          <Pen size={16} />
                          Edit
                        </button>

                        <button
                          className="delete-action"
                          onClick={() => {
                            handleDelete(item.sclrid);
                            setActionMenu(null);
                          }}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>,
                      document.body
                    )}
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