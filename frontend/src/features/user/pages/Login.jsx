import { useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/new2.ico";
import "../components/Login.css";
import { toast } from "react-toastify";
import heroImage from "../../../assets/hero1.png";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", res.data.name);
        // save email for later actions (e.g., password update)
        localStorage.setItem("email", email);

        if (res.data.role === "admin") {
          toast.success("Admin Login Successful");
          navigate("/admin",{replace:true});
        } else {
          toast.success("Login Successful");
          navigate("/portal", { replace: true });
        }
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);

      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="container">
        <div className="left-panel">
        <img src={heroImage} alt="Scholarship" className="hero-image" />
    </div>

      <div className="box">
        <img src={logo} alt="Scholarship Portal Logo" className="logo" />
        <h1>Login</h1>

        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br />
          <br />

          <button type="submit">Login</button>
        </form>
        <br />
        <p>
          New User?{" "}
          <Link to="/signup" replace={true}>
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
