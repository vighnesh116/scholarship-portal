
import React from "react";
import { useNavigate,navigate, replace } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if(token && role=="admin"){
    navigate("/admin",replace=true);
  }
  else if(token && role=="student"){
    navigate("/portal",replace=true);
  }
  else if(!token && role){
    navigate("/",replace=true);

  }
  else{
    navigate("/",replace=true);
  }
}

export default ErrorPage;





 // <div className="error-page">
    //   <div className="error-content">
    //     <h1>404</h1>

    //     <h2>Page Not Found</h2>

    //     <p>
    //       Sorry, the page you are looking for doesn't exist
    //       or may have been moved.
    //     </p>

    //     <button onClick={() => navigate("/")}>
    //       Go Back Home
    //     </button>
    //   </div>
    // </div>