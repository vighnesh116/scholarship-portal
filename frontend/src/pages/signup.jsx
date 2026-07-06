import {useState} from "react";
import {Link, replace, useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../components/Auth.css";
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

        toast.success("Registration Successful");

        navigate("/",{replace:true});
    };

    return(
        <div className="container">

            <div className="box">

                <h1>Sign-In</h1>

                <form onSubmit={submit}>

                    <input
                    required
                    type="text"
                    name="name"
                    placeholder="User Name"
                    onChange={handleChange}
                    required
                    />

                    <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    />

                    <input
                    required
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
                    <Link to="/"replace={true}>
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Signup;