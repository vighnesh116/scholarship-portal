import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AutoRefresh from "../components/AutoRefresh";
import { toast } from "react-toastify";

function UsersDetails() {
  const [search, setSearch] = useState("");

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
    return value === null || value === undefined || value === "" ? "NULL" : value;
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
            {filteredUsers.map((item) => (
              <tr key={item.userid}>
                <td>{displayValue(item.userid)}</td>
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
    </div>
  );
}
export default UsersDetails;
