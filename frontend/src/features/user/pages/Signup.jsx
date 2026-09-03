import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

import logo from "../../../assets/new2.ico";
import "../components/UserAuth.css";
import api from "../../../shared/api/axiosInstance";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Please enter your name.");
    }

    if (!form.email.trim()) {
      return toast.error("Please enter your email.");
    }

    if (!form.password) {
      return toast.error("Please create a password.");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (!confirmPassword) {
      return toast.error("Please confirm your password.");
    }

    if (form.password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const response = await api.post("/signup", form);

      toast.success(response.data.message);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setConfirmPassword("");

      navigate("/login", { replace: true });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
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
          <h1>Sign-Up</h1>

          <form onSubmit={submit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                value={form.password}
                onChange={handleChange}
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

            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}
                title={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p>
            Already have an account?{" "}
            <Link to="/" replace>
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;