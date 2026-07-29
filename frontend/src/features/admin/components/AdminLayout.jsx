import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LogOut } from "lucide-react";
import {ConfirmAction} from "../../shared/components/ConfirmAction";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = await confirmAction({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      successTitle: "Logged Out!",
      successText: "You have been logged out successfully.",
    });

    if (!confirmed) return;

    navigate("/", { replace: true });
  };

  const NAV_ITEMS = [
    { key: "dashboard", label: "Dashboard", path: "/admin" },
    { key: "view", label: "View Scholarships-Available", path: "/admin/view" },
    { key: "manage", label: "Create-Scholarships", path: "/admin/manage" },
    { key: "students", label: "View Students-DATA", path: "/admin/students" },
    { key: "users", label: "View Users-DETAILS", path: "/admin/users" },
    { key: "logout", label: <LogOut />, path: "/logout" },
  ];

  return (
    <Sidebar title="Admin Panel" navItems={NAV_ITEMS}>
      <Outlet />
    </Sidebar>
  );
}

export default AdminLayout;
