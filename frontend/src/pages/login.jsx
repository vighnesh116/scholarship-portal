import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login(){

  const navigate=useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin=async(e)=>{
    e.preventDefault();

    const res=await fetch("http://127.0.0.1:5000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });

    const data=await res.json();

    if(data.success){

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/home");

    }else{

      alert("Invalid Login");
    }
  };

  return(
    <div>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>

      <p>

        New User?

        <Link to="/signup">
          Sign Up
        </Link>

      </p>

    </div>
  );
}

export default Login;