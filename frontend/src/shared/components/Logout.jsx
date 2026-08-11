import { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
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
      const role=localStorage.getItem("role");

      if (confirmed) {
        
         localStorage.removeItem("access_token");
         localStorage.removeItem("refresh_token");
         localStorage.removeItem("role");
         localStorage.removeItem("user");
         localStorage.removeItem("email");
         localStorage.removeItem("portalForm");

        


         window.location.replace("/login");


      } else if(role=="student"){
        navigate("/portal",{replace:true});
      }

      else if(role=="admin") {
     
        navigate("/admin", { replace: true });
      }

    };

    logout();
  }, [navigate]);

  return null;
}

export default Logout;