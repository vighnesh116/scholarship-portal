import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LogOut, Settings } from "lucide-react";
import { confirmAction } from "../../../shared/components/ConfirmAction";

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
    { key: "view", label: "Scholarships", path: "/admin/view" },
    { key: "manage", label: "Create-Scholarships", path: "/admin/manage" },
    { key: "students", label: "Students-Details", path: "/admin/students" },
    { key: "users", label: "Users-Details", path: "/admin/users" },
    { key: "update-password", label: <Settings />, path: "/update-password" },
    { key: "logout", label: <LogOut />, path: "/logout" },

  ];

  return (
    <Sidebar title="" navItems={NAV_ITEMS}>
      <Outlet />
    </Sidebar>
  );
}

export default AdminLayout;
