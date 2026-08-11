
import React from "react";
import { useNavigate,Navigate  } from "react-router-dom";
import "./ErrorPage.css";
import { toast } from "react-toastify";
function ErrorPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  if(!token && role){

   return <Navigate to ="/login" replace={true}/>
  }
 
  else if( role=="student"){
    
  return <Navigate to ="/portal" replace={true}/>
  }
  else  if(role=="admin"){    
  return <Navigate to="/admin" replace={true}/>
  } 
  
  else{
    return <Navigate to="/login" replace={true}/>
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