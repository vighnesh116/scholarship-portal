import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
import logo from "../../../assets/new2.ico";

// Adjust these import paths if your actual files live somewhere else
// (e.g. "../pages/ManageScholarships" instead of "./ManageScholarships").
import ManageScholarships from "../pages/ManageScholarships";
import ViewScholarships from "../pages/ViewScholarships";
import StudentsDetails from "../pages/StudentsDetails";
import UsersDetails from "../pages/UsersDetails";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "manage", label: "Manage ALL-Scholarships" },
  { key: "view", label: "View Scholarships-Available" },
  { key: "students", label: "View Students-DATA" },
  { key: "users", label: "View Users-DETAILS" },
  { key: "portal", label: "Check User-Portal" },
];

function Dashboard() {
  const [stats, setStats] = useState({
    total_scholarships: 0,
    total_students: 0,
    total_users: 0,
  });
  // "dashboard" is the default screen
  const [activeKey, setActiveKey] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin-stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const handleSelect = (key) => {
    // Portal lives outside /admin, so it still navigates to its own route.
    if (key === "portal") {
      navigate("/portal");
      return;
    }
    setActiveKey(key);
  };

  const renderContent = () => {
    switch (activeKey) {
      case "manage":
        return <ManageScholarships />;

      case "view":
        return <ViewScholarships />;

      case "students":
        return <StudentsDetails />;

      case "users":
        return <UsersDetails />;

      case "dashboard":
      default:
        return (
          <>
            <img src={logo} alt="Logo" className="hero-image" />
            <h1>Admin Dashboard</h1>
            <p className="subtitle">
              Plan, manage and monitor scholarships with ease.
            </p>

            <div className="dash-stats-row">
              <div className="dash-stat-card">
                <div className="stat-label">Total Scholarships</div>
                <div className="stat-value">{stats.total_scholarships}</div>
              </div>
              <div className="dash-stat-card">
                <div className="stat-label">Total Students</div>
                <div className="stat-value">{stats.total_students}</div>
              </div>
              <div className="dash-stat-card">
                <div className="stat-label">Total Users</div>
                <div className="stat-value">{stats.total_users}</div>
              </div>
              <div className="dash-stat-card">
                <div className="stat-label">Total Users</div>
                <div className="stat-value">{stats.total_users}</div>
              </div>
              <div className="dash-stat-card">
                <div className="stat-label">Total Users</div>
                <div className="stat-value">{stats.total_users}</div>
              </div>
            </div>

            
          </>
        );
    }
  };

  return (
    <Sidebar
      title="Admin Panel"
      navItems={NAV_ITEMS}
      activeKey={activeKey}
      onSelect={handleSelect}
    >
      {renderContent()}
    </Sidebar>
  );
}

export default Dashboard;
