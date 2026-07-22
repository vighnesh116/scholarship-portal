import React from "react";
import "./Sidebar.css";


function Sidebar({ title, navItems, activeKey, onSelect, children }) {
  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header">{title}</div>
        <nav className="dash-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`dash-nav-item ${activeKey === item.key ? "active" : ""}`}
              onClick={() => onSelect(item.key)}
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
