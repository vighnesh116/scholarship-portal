import {useEffect, useState} from "react";
import AdminNavbar from "../components/AdminNavbar";
import AutoRefresh from "../components/AutoRefresh";

function UsersDetails() {
    
    const [search, setSearch] = useState("");

    const [users, setUsers] = useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        const res = await fetch(
            "http://127.0.0.1:5000/admin-users"
        );

        const data = await res.json();

        setUsers(data);
    };

    const filteredUsers =
        users.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        return(

            <div style={{ padding: "30px" }}>

            <AutoRefresh />
            <AdminNavbar/>
            <h1>
                USERS DETAILS 
            </h1>

            <input
                type="text"
                placeholder="Search User"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <br /><br />

            <table border="1">

                <thead>

                    <tr>

                       
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                      

                    </tr>

                </thead>

                <tbody>

                    {
                        filteredUsers.map((item) => (

                            <tr key={item.userid}>

                                <td>{item.userid}</td>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.role}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

        );
}export default UsersDetails;
