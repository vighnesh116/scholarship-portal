import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AutoRefresh from "../components/AutoRefresh";
import"../components/MS.css"
function ViewScholarships() {

    const [search, setSearch] = useState("");

    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {

        loadScholarships();

    }, []);

    const loadScholarships = async () => {

        const res = await fetch(
            "http://127.0.0.1:5000/admin-scholarships"
        );

        const data = await res.json();

        setScholarships(data);
    };

    const filteredScholarships =
        scholarships.filter((item) =>
            item.sclrname
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    return (

        <div style={{ padding: "30px" ,
            backgroundImage:"cover"

        }}>

            <AutoRefresh />
            <AdminNavbar/>
            <h1>
                View Scholarships
            </h1>

            <input style={{
                

            }}
                
                type="text"
                placeholder="🔍 Search Scholarship..."
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
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Percentage</th>
                        <th>Income</th>
                        <th>Gender</th>
                        <th>Caste</th>
                        <th>Education</th>
                        <th>Deadline</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        filteredScholarships.map((item) => (

                            <tr key={item.sclrid}>

                                <td>{item.sclrid}</td>
                                <td>{item.sclrname}</td>
                                <td>{item.amount}</td>
                                <td>{item.percentreeq}</td>
                                <td>{item.miniincome}</td>
                                <td>{item.gender}</td>
                                <td>{item.caste}</td>
                                <td>{item.educationqualifiation}</td>
                                <td>{item.deadline}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default ViewScholarships;