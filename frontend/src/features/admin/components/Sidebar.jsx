import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../../assets/new2.ico";


function Sidebar({ title, navItems, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    
    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/admin/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header">
          <img src={logo} alt="Logo" className="siderico" />
          {title}
        </div>
        <nav className="dash-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`dash-nav-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="dash-main">{children}</main>
      
    </div>
    
  );
}

export default Sidebar;
