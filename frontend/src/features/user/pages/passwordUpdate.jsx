import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../components/UserAuth.css";
function PasswordUpdate() {
  const navigate = useNavigate();

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

      const res = await axios.post("http://localhost:5000/update-password", {
        email,
        new_password: password,
      });

      toast.success(res.data.message || "Password Updated Successfully");
      navigate("/portal", { replace: true });
    } catch (error) {
      toast.error(error);
      const msg = error?.response?.data?.message || "Failed to update password";
      toast.error(msg);
      navigate("/portal", { replace: true });
    }
  };
  return (
    <div className="container">
      <div className="box">
        <h1>Update </h1>
        <h1>Password</h1>
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
        
      </div>
      
    </div>
  );
}
export default PasswordUpdate;
