import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut, ArrowLeft, User, GraduationCap, LogOut as LogOutIcon } from "lucide-react";
import { confirmAction } from "../../../shared/components/ConfirmAction";
import api from "../../../shared/api/axiosInstance"

import logo from "../../../assets/new2.ico";
function PasswordUpdate() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
<<<<<<< HEAD
    <div className="pu-page-container">
      {/* Header */}
      <header className="pu-header">
        <div className="pu-logo-container">
          <img src={logo} alt="Scholarship Portal Logo" />
        </div>
        <h1 className="pu-title">Scholarship-Information-Portal</h1>
      </header>

      {/* Main Content */}
      <div className="pu-main-content">
        <Link to="*" replace={true} className="pu-back-btn">
          <ArrowLeft size={30} color="#333" strokeWidth={1.5} />
        </Link>

        <div className="pu-card">
          <h2 className="pu-card-title">Update-Password</h2>

          <div className="pu-user-icon-container">
            <User size={35} color="#333" strokeWidth={1.5} />
          </div>

          <form onSubmit={submit} className="pu-form">
            <input
              required
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pu-input"
            />
            <input
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pu-input"
            />
            <button type="submit" className="pu-submit-btn">
              Update Password
            </button>
          </form>

          <div className="pu-logout-container">
            <Link to="/logout" replace={true}>
              <LogOutIcon size={30} color="#333" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
=======
    <div className="container">
      
      <div className="box">
         

        <h1>Update </h1>
        <h1>Password</h1>

        <p>
        
          <Link to="*" replace={true}>
            <ArrowLeft color="#150909" />
          </Link>
        </p>
        <h2><User color="#000000" />{userName}</h2>
        <form onSubmit={submit}>
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
          <button type="submit">Update Password</button>
        
        </form>
        <p>
        
          <Link to="/logout" replace={true}>
            <LogOut color="#150909" />
          </Link>
        </p>
     
>>>>>>> 789b0c8c3dea4bd29bfd878ffb5a0961d86abe3b
      </div>

      {/* Footer */}
      <footer className="pu-footer">
        <p>© 2026 Scholarship Information Portal</p>
      </footer>
    </div>
  );
}

export default PasswordUpdate;