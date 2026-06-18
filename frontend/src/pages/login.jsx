import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Auth.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/login",
                {
                    email,
                    password
                }
            );

            if (res.data.success) {

                localStorage.setItem(
                    "user",
                    res.data.name
                );

                if (res.data.role === "admin") {

                    navigate("/admin");

                } else {

                    navigate("/portal");

                }

            } else {

                alert("Invalid Credentials");

            }

        } catch (error) {

            console.log(error);

            alert("Invalid Credentials");

        }
    };

    return (

        <div className="container">

            <div className="box">

                <h1>Login</h1>

                <form onSubmit={login}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>
                    New User?{" "}
                    <Link to="/signup">
                        Register Here
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;