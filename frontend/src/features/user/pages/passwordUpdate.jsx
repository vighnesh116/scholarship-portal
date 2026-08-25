import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut, ArrowLeft, User } from "lucide-react";
import { confirmAction } from "../../../shared/components/ConfirmAction";
import api from "../../../shared/api/axiosInstance";
import "../components/PasswordUpdate.css"
import logo from "../../../assets/new2.ico";

function PasswordUpdate() {
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

      const res = await api.put("/update-password", { email, new_password: password });

      toast.success(res.data.message || "Password Updated Successfully");
      navigate("/portal", { replace: true });
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to update password";
      toast.error(msg);
    }
  };

  return (
    
    <div className="pu-page">
      <header className="pu-header">
        <img src={logo} alt="logo" className="pu-logo" />
        <h1 className="pu-brand">Scholarship-Information-Portal</h1>
      </header>

      <main className="pu-main">
        <Link to="*" replace={true} className="pu-back-btn">
          <ArrowLeft size={22} color="#FFFFFF"/>
        </Link>

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

          <Link to="/logout" replace={true} className="pu-logout-btn">
            <LogOut size={20} />
          </Link>
        </div>
      </main>

      <footer className="pu-footer">
        <p>© 2026 Scholarship Information Portal</p>
      </footer>
    </div>
  );
}

export default PasswordUpdate;