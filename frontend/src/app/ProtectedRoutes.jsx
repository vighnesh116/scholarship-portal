import {Navigate}from "react-router-dom";

function ProtectedRoute({childern,allowedRole}){
    const token =localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if(!token){
        return<Navigate to="/login" replace={true}/>;

    }
    if(allowedRole&& role !==allowedRole){
        return <Navigate to="/error" replace={true}/>
    }
    return childern ;

}
export default ProtectedRoute;