import {Navigate}from "react-router-dom";

function ProtectedRoute({childern,allowedRole}){
    const token =localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    const expired =localStorage.getItem("");
    const isLoggedIn = localStorage.getItem("success");
    if(!token || isLoggedIn== false){
        return<Navigate to="/login" replace={true}/>;

    }
    if(allowedRole && role !==allowedRole || !role){
        return <Navigate to="/error" replace={true}/>
    }
   
return childern ;
    
    
}
export default ProtectedRoute;