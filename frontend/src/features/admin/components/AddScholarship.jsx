import ManageScholarships from '../pages/ManageScholarships.jsx' 
import {useState}from "react"
import './AdminNavbar.css'
import {FilePlus} from 'lucide-react';
function AddScholarship(){
    const [show,setShow]=useState(false);
    return (
        <>
            <button  onClick={()=>setShow(true)}>  

             <h3>Add Scholarship</h3> <FilePlus size={20}/>
             
             </button>
             {show && <ManageScholarships/>}
            
        </>
    );

}
export default AddScholarship ;
