import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAction } from "../../shared/components/ConfirmAction";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const confirmed = await confirmAction({
        title: "Logout?",
        text: "Are you sure you want to logout?",
        successTitle: "Logged Out!",
        successText: "You have been logged out successfully.",
      });

      if (confirmed) {
        // Remove login data if you have stored any
        // localStorage.removeItem("token");

        navigate("/", { replace: true });
      } else {
        // Go back to admin dashboard if user cancels
        navigate("/admin", { replace: true });
      }
    };

    logout();
  }, [navigate]);

  return null; // No UI needed
}

export default Logout;