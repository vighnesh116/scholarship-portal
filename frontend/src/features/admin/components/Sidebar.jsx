import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../../assets/new2.ico";

/**
 * Reusable dashboard layout component.
 * Renders a left sidebar with navigation items and a main content area.
 *
 * Props:
 *  - title: string                    -> text shown at the top of the sidebar
 *  - navItems: [{key,label,path}]     -> list of nav buttons, each with a route path
 *  - children: node                   -> content rendered in the main panel (the <Outlet/>)
 *
 * Markup and class names are unchanged from the original, so Sidebar.css
 * applies exactly as before - only the navigation mechanism changed
 * (onSelect callback -> useNavigate, activeKey prop -> useLocation).
 */
function Sidebar({ title, navItems, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    // "/admin" is the index route, so only match it exactly.
    // Everything else (e.g. "/admin/manage") matches as a prefix so
    // sub-paths under it still highlight correctly if you add any later.
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
