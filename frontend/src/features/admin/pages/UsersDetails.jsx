import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AutoRefresh from "../components/AutoRefresh";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

function UsersDetails() {
  const [search, setSearch] = useState("");
 const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin-users");
      const data = await res.json();
      setUsers(data || []);
    } catch (error) {
      toast.error("Error loading users:", error);
      setUsers([]);
    }
  };

  const filteredUsers = users.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()),
  );

  // Function to display NULL for empty values
  const displayValue = (value) => {
    return value === null || value === undefined || value === ""
      ? "NULL"
      : value;
  };

   const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentStudents = filtered.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filtered.length / postPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="manage-container">
      <h1 className="manage-title">USERS DETAILS</h1>

      <input
        type="text"
        placeholder="🔍 Search User By Name"
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
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((item, index) => (
              <tr key={item.userid}>
                <td>{index + 1}</td>
                <td>{displayValue(item.email)}</td>
                <td>{displayValue(item.name)}</td>
                <td>{displayValue(item.role)}</td>
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
      />

      
    </div>
  );
}
export default UsersDetails;
