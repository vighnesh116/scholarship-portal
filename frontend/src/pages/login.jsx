import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Auth.css";
import { toast } from "react-toastify";

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

                    navigate("/admin",{replace:true});

                } else {

                    navigate("/portal",{replace:true});

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
                    
                        <br/>
                        <br/>

                    <button type="submit">
                        Login
                    </button>

                </form>
                        <br/>
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