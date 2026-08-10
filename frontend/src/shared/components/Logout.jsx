import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {confirmAction} from "./ConfirmAction";

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
     
        navigate("/", { replace: true });

      } else {
     
        navigate("/admin", { replace: true });
      }
    };

    logout();
  }, [navigate]);

  return null;
}

export default Logout;