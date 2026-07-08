import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
import logo from "../../../assets/new2.ico";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
    active_scholarships: 0,
    inactive_scholarships: 0,
  });
  // "dashboard" is the default screen
  const pieData = [
    {
      name: "Active",
      value: stats.active_scholarships,
    },
    {
      name: "Inactive",
      value: stats.inactive_scholarships,
    },
  ];

  const COLORS = ["#4CAF50", "#F44336"];
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
            <img src={logo} alt="Logo" className="Dashico" />
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
                <div className="stat-label">Total Students Enrolled</div>
                <div className="stat-value">{stats.total_students}</div>
              </div>
              <div className="dash-stat-card">
                <div className="stat-label">Total Users Logged In</div>
                <div className="stat-value">{stats.total_users}</div>
              </div>
              <div className="dash-stat-card">
                <div className="stat-label">Total Active Scholarships</div>
                <div className="stat-value">{stats.total_scholarships-20}</div>
              </div>
              <div className="dash-stat-card">
                <div className="stat-label">Total InActive Scholarships</div>
                <div className="stat-value">{stats.total_scholarships-24}</div>
              </div>
              <div className="pie-card">
  <h3>Scholarship Status</h3>

  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData}
        dataKey="value"
        outerRadius={110}
        label={false}
        labelLine={false}
      >
        {pieData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>

  {/* Keep the legend INSIDE the card */}
  <div className="pie-legend">
    <div className="legend-item">
      <span
        className="legend-color"
        style={{ background: "#4CAF50" }}
      ></span>
      <span><strong>{stats.active_scholarships}</strong> Active</span>
    </div>

    <div className="legend-item">
      <span
        className="legend-color"
        style={{ background: "#F44336" }}
      ></span>
      <span><strong>{stats.inactive_scholarships}</strong> Inactive</span>
    </div>
  </div>
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
