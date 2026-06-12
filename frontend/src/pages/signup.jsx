import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import "./Auth.css";
function Signup() {

    const navigate = useNavigate();

    const [form,setForm] = useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const submit=async(e)=>{
        e.preventDefault();

        await axios.post(
            "http://localhost:5000/signup",
            form
        );

        alert("Registration Successful");

        navigate("/");
    };

    return(
        <div className="container">

            <div className="box">

                <h1>Register</h1>

                <form onSubmit={submit}>

                    <input
                    type="text"
                    name="name"
                    placeholder="User Name"
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    onChange={handleChange}
                    required
                    />

                    <button>
                        Register
                    </button>

                </form>

                <p>
                    Already have an account?
                    <Link to="/">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Signup;