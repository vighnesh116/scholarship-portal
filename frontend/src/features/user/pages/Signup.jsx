import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import logo from "../../../assets/new2.ico";
import heroImage from "../../../assets/chat.png";

import "../components/UserAuth.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();

    // Validation
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

      const response = await axios.post(
        "http://localhost:5000/signup",
        form
      );

      toast.success(response.data.message);

      // Reset form
      setForm({
        name: "",
        email: "",
        password: "",
      });

      setConfirmPassword("");

      // Navigate to student portal
      navigate("/portal", { replace: true });
      

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
    <div className="container">
      <div className="Sign-panel">
        <img
          src={heroImage}
          alt="Scholarship Portal"
          className="hero-image1"
        />
      </div>

      <div className="box">
        <img
          src={logo}
          alt="Scholarship Portal Logo"
          className="logo"
        />

        <h1 >Sign-Up</h1>
        

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

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

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
    </div>
  );
}

export default Signup;