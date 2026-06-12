import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";

import "./Auth.css";

function Login() {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const login=async(e)=>{

        e.preventDefault();

        try{

            const res = await axios.post(
                "http://localhost:5000/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "user",
                res.data.name
            );

            navigate("/portal");

        }
        catch{

            alert("Invalid Credentials");

        }
    };

    return(

        <div className="container">

            <div className="box">

                <h1>Login</h1>

                <form onSubmit={login}>

                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button>
                        Login
                    </button>

                </form>

                <p>
                    New User?
                    <Link to="/signup">
                        Register Here
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;