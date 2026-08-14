import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AutoRefresh from "../components/AutoRefresh";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";
import api from "../../../shared/api/axiosInstance";
import { Await } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { confirmAction } from "../../../shared/components/ConfirmAction";
function UsersDetails() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("access_token");

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin-users");

      console.log("Users after reload:", res.data);

      setUsers(res.data);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Error loading users");
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (userid) => {
    const confirmed = await confirmAction({
      title: "Delete User?",
      text: "This action cannot be undone.",
      successTitle: "Deleted!",
      successText: "User deleted successfully.",
    });

    if (!confirmed) return;

    try {
      const res = await api.delete(`/delete_users/${userid}`);

      console.log("Delete response:", res.data);
      console.log("Delete status:", res.status);

      if (res.status === 200) {
        toast.success("Deleted successfully");

        await loadUsers();
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete");
    }
  };

  const filteredUsers = users.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const displayValue = (value) => {
    return value === null || value === undefined || value === ""
      ? "NULL"
      : value;
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredUsers.length / postPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  const totalRecords = filteredUsers.length;
  return (
    <div className="manage-container">
      <h1 className="manage-title">USERS DETAILS</h1>

      <input
        type="text"
        placeholder={`🔍 Search User By Name   TotalUsers: ${totalRecords}`}
        value={search}
        onChange={handleSearchChange}
        className="search-box"
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={item.userid}>
                <td>{indexOfFirstPost + index + 1}</td>
                <td>{displayValue(item.email)}</td>
                <td>{displayValue(item.name)}</td>
                <td>{displayValue(item.role)}</td>

                <td>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      color: "red",
                      padding: "9px",
                    }}
                    onClick={() => handleDelete(item.userid)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p style={{ textAlign: "center", padding: "20px", color: "#4B5563" }}>
            No users found
          </p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        dataPerPage={currentUsers.length}
        pageStart={indexOfFirstPost + 1}
        pageEnd={indexOfFirstPost + currentUsers.length}
        totalRecords={totalRecords}
      />
    </div>
  );
}

export default UsersDetails;
