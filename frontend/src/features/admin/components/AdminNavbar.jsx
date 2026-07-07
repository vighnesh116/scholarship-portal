import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {

    const navigate = useNavigate();

    return (
        <nav className="admin-navbar">
            <h2>Scholarship Portal - Admin</h2>

            <button
                onClick={() => navigate("/admin")}
                className="admin-home-btn"
            >
                Admin Dashboard:
            </button>
        </nav>
    );
}

export default AdminNavbar;