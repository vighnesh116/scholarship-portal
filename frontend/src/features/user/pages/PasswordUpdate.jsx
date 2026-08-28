import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut, ArrowLeft, User } from "lucide-react";

import api from "../../../shared/api/axiosInstance";
import "../components/PasswordUpdate.css";
import logo from "../../../assets/new2.ico";

function PasswordUpdate() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pu-page">
      <header className="pu-header">
        <div className="pu-brand-box">
          <img src={logo} alt="logo" className="pu-logo" />
          <h1 className="pu-brand">Scholarship Information Portal</h1>
        </div>
      </header>

      <main className="pu-main">
        <div className="pu-card-wrapper">
          <Link to="/portal" className="pu-back-btn" title="Back to Portal">
            <ArrowLeft size={22} color="#FFFFFF" />
          </Link>

          <div className="pu-card">
            <h1 className="pu-title">Update Password</h1>

            <div className="pu-user">
              <User size={20} />
              <h3><span>{userName || "User"}</span></h3>
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
              <button type="submit" className="pu-submit-btn" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>

            <Link to="/logout" replace={true} className="pu-logout-btn">
              <h4>LogOut</h4> <LogOut size={18} />
            </Link>
          </div>
        </div>
      </main>

      <footer className="pu-footer">
        <p>© 2026 Scholarship Information Portal</p>
      </footer>
    </div>
  );
}

export default PasswordUpdate;