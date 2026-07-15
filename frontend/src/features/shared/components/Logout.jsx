
import Swal from 'sweetalert2'
import { useNavigate} from "react-router-dom";
import {LogOut} from "lucide-react"
function Logout(){
    const navigate=useNavigate();


     const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      sessionStorage.clear();

      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/", { replace: true });
    }
  };

  return (
    <div 
       style={{
    display: "flex",
    flexDirection: "column",
    height: "150px",
    position:"fixed",
    right:"1400px",
    bottom:"200px",
  }}
         >
    <button
    onClick={handleLogout}
    style={{
      marginTop: "auto",
      marginBottom: "20px",
      marginLeft: "15px",
      marginRight: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "10px",
      background: "#1c4b2aaa",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
      <LogOut size={18}/> Logout
    </button>
    </div>
  );
}

export default Logout;