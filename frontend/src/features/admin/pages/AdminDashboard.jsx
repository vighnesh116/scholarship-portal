import { useState, useEffect } from "react";
import logo from "../../../assets/new2.ico";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StatsCard from "../components/StatsCard";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_scholarships: 0,
    total_students: 0,
    total_users: 0,
    active_scholarships: 0,
    inactive_scholarships: 0,
  });

  const pieData = [
    { name: "Active", value: stats.active_scholarships },
    { name: "Inactive", value: stats.inactive_scholarships },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin-stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      toast.error("Failed to load stats:", err);
    }
  };

  return (
    <>
      <img src={logo} alt="Logo" className="Dashico" />
      <div className="Dashh1">
        {" "}
        <h1>Admin Dashboard</h1>{" "}
      </div>
      <p className="subtitle">
        Plan, manage and monitor scholarships with ease.
      </p>

      <div className="dash-stats-row">
        <StatsCard
          label="Total Scholarships"
          value={stats.total_scholarships}
        />

        <StatsCard
          label="Total Students enrolled"
          value={stats.total_students}
        />

        
        <StatsCard
          label="Active Scholarship"
          value={stats.active_scholarships}
        />

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

          <div className="pie-legend">
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ background: "#4CAF50" }}
              ></span>
              <span>
                <strong>{stats.active_scholarships}</strong> Active
              </span>
            </div>

            <div className="legend-item">
              <span
                className="legend-color"
                style={{ background: "#F44336" }}
              ></span>
              <span>
                <strong>{stats.inactive_scholarships}</strong> Inactive
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
