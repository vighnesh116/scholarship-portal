import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Sidebar.css";
import logo from "../../../assets/Adminpanel.png";

function Sidebar({ title, navItems, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/admin/";
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <div className="dash-layout">
      {/* Mobile Top Navigation Bar */}
      <div className="dash-mobile-bar">
        <div className="dash-mobile-brand">
          <img src={logo} alt="Logo" className="dash-mobile-logo" />
          <span className="dash-mobile-title">Admin Panel</span>
        </div>
        <button
          className="dash-menu-btn"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="dash-backdrop"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar (Desktop Persistent / Mobile Drawer) */}
      <aside className={`dash-sidebar ${isMobileOpen ? "open" : ""}`}>
        <div className="dash-sidebar-header">
          <img src={logo} alt="Logo" className="siderico" />
          {title && <span className="dash-title-text">{title}</span>}
        </div>
        <nav className="dash-nav">
          {navItems.map((item, index) => (
            <button
              key={item.key || item.key1 || item.key2 || index}
              className={`dash-nav-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dash-main">{children}</main>
    </div>
  );
}

export default Sidebar;
