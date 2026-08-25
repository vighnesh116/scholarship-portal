import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  User } from "lucide-react";

import api from "../../../shared/api/axiosInstance";
import "../../user/components/PasswordUpdate.css"

function AdminPassUpdate() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const role=localStorage.getItem("role");
  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const email = localStorage.getItem("email");

      if (!email) {
        toast.error("User email not found. Please login again.");
        navigate("/portal", { replace: true });
        return;
      }

      const res = await api.put("/admin-updatepassword", { email, new_password: password });

      toast.success(res.data.message || "Password Updated Successfully");
      navigate("*", { replace: true });
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to update password";
      toast.error(msg);
    }
  };

  return (
    
    <div className="pu-page">

      <main className="pu-main">
      
        <div className="pu-card">
          <h1 className="pu-title">Update-Password</h1>

          <div className="pu-user">
            <User size={20} />
            <span>{userName}</span>
          </div>

          <form className="pu-form" onSubmit={submit}>
            <input
              required
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="pu-submit-btn">
              Update Password
            </button>
          </form>

         
        </div>
      </main>

    
    </div>
  );
}

export default  AdminPassUpdate;