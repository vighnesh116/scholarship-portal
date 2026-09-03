import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

import logo from "../../../assets/new2.ico";
import "../components/Login.css";
import api from "../../../shared/api/axiosInstance";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("user", res.data.name);
        localStorage.setItem("email", email);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("role", res.data.role);
        if (res.data.role === "admin") {
          toast.success("Admin Login Successful");
          navigate("/admin", { replace: true });
        } else {
          toast.success("Login Successful");
          navigate("/portal", { replace: true });
        }
      } else {
        toast.error("Invalid Credentials");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="page-container auth-page">
      <header className="auth-header">
        <div className="header-brand-container">
          <img src={logo} alt="logo" className="brand-logo" />
          <h1 className="auth-text">Scholarship-Information-Portal</h1>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-card">
          <h1>Login</h1>

          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p>
            New User?{" "}
            <Link to="/signup" replace={true}>
              Register Here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;