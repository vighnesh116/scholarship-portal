import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import { MoveLeft } from 'lucide-react';
function AdminNavbar() {

    const navigate = useNavigate();

    return (
        <nav className="admin-navbar">
            

            <button
                onClick={() => navigate("/admin")}
                className="admin-home-btn"
            >
                <MoveLeft /> Admin
            </button>
        </nav>
    );
}

export default AdminNavbar;