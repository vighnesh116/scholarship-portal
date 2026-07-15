import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Sidebar.css";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", path: "/admin" },
  { key: "view", label: "View Scholarships-Available", path: "/admin/view" },
  { key: "manage", label: "Create-Scholarships", path: "/admin/manage" },
  { key: "students", label: "View Students-DATA", path: "/admin/students" },
  { key: "users", label: "View Users-DETAILS", path: "/admin/users" },
  { key: "portal", label: "Check User-Portal", path: "/portal" },
];

function AdminLayout() {
  return (
    <Sidebar title="Admin Panel" navItems={NAV_ITEMS}>
      <Outlet />
    </Sidebar>
  );
}

export default AdminLayout;
