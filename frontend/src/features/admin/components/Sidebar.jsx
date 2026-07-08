import React from "react";
import "./Sidebar.css";
import logo from "../../../assets/new2.ico";
/**
 * Reusable dashboard layout component.
 * Renders a left sidebar with navigation items and a main content area.
 * Import this anywhere you need the same sidebar shell (e.g. other admin pages).
 *
 * Props:
 *  - title: string            -> text shown at the top of the sidebar
 *  - navItems: [{key,label}]  -> list of nav buttons
 *  - activeKey: string        -> currently selected nav key (null = overview)
 *  - onSelect: (key) => void  -> called when a nav item is clicked
 *  - children: node           -> content rendered in the main panel
 */
function Sidebar({ title, navItems, activeKey, onSelect, children }) {
  return (
    
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header"><img src={logo} alt="Logo" className="hero-image" />{title}</div>
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
