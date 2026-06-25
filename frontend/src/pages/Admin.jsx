import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/MS.css"
function Admin() {

    const [stats, setStats] = useState({
        total_scholarships: 0,
        total_students: 0,
        total_users: 0
    });

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        const res = await fetch(
            "http://127.0.0.1:5000/admin-stats"
        );

        const data = await res.json();

        setStats(data);
    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>
                Admin Dashboard
            </h1>

            <hr />
            
            <div 
                style={{ 
                    backgroundColor:'#2c3e50',
                    display: "flex",
                    gap: "30px"
                }}
            >

                <div>
                    <h2>
                        {stats.total_scholarships}
                    </h2>

                    <p>
                        Scholarships-In-Data
                    </p>
                </div>

                <div>
                    <h2>
                        {stats.total_students}
                    </h2>

                    <p>
                        Students-Enrolled
                    </p>
                </div>

                <div>
                    <h2>
                        {stats.total_users}
                    </h2>

                    <p>
                        Users
                    </p>
                </div>

            </div>
    
            <hr />

            <Link to="/admin/manage">
                <button>
                    Manage ALL-Scholarships
                </button>
            </Link>

            <br /><br />

            <Link to="/admin/view">
                <button>
                    View Scholarships-Available
                </button>
            </Link>

            <br /><br />

            <Link to="/admin/students">
                <button>
                    View Students-DATA
                </button>
            </Link>

            <br /><br />
             <Link to="/admin/users">
                <button>
                    View Users-DETAILS
                </button>
            </Link>


        </div>
    );
}

export default Admin;