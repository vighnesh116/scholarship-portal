import { useState, useEffect } from "react";

function Admin() {

    const [form, setForm] = useState({
        sclrname: "",
        amount: "",
        percentreeq: "",
        miniincome: "",
        deadline: "",
        application_link: ""
    });

    const [scholarships, setScholarships] = useState([]);

    const loadScholarships = async () => {

        const res = await fetch(
            "http://127.0.0.1:5000/admin-scholarships"
        );

        const data = await res.json();

        setScholarships(data);
    };

    useEffect(() => {
        loadScholarships();
    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const addScholarship = async () => {

        const res = await fetch(
            "http://127.0.0.1:5000/add-scholarship",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }
        );

        const data = await res.json();

        alert(data.message);

        loadScholarships();
    };

    const deleteScholarship = async (id) => {

        if (!window.confirm("Delete Scholarship?")) {
            return;
        }

        await fetch(
            `http://127.0.0.1:5000/delete-scholarship/${id}`,
            {
                method: "DELETE"
            }
        );

        loadScholarships();
    };

    const editScholarship = async (item) => {

        const newName = prompt(
            "Scholarship Name",
            item.sclrname
        );

        const newAmount = prompt(
            "Amount",
            item.amount
        );

        const newDeadline = prompt(
            "Deadline",
            item.deadline
        );

        if (!newName) return;

        await fetch(
            `http://127.0.0.1:5000/update-scholarship/${item.sclrid}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sclrname: newName,
                    amount: newAmount,
                    deadline: newDeadline
                })
            }
        );

        loadScholarships();
    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Admin Dashboard</h1>

            <h3>
                Total Scholarships : {scholarships.length}
            </h3>

            <hr />

            <h2>Add Scholarship</h2>

            <input
                name="sclrname"
                placeholder="Scholarship Name"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="amount"
                placeholder="Amount"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="percentreeq"
                placeholder="Required Percentage"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="miniincome"
                placeholder="Income Limit"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="deadline"
                placeholder="31-Dec-2026"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="application_link"
                placeholder="Application Link"
                onChange={handleChange}
            />

            <br /><br />

            <button onClick={addScholarship}>
                Add Scholarship
            </button>

            <hr />

            <h2>View Scholarships</h2>

            <table
                border="1"
                cellPadding="10"
                style={{
                    borderCollapse: "collapse",
                    width: "100%"
                }}
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        scholarships.map((item) => (

                            <tr key={item.sclrid}>

                                <td>{item.sclrid}</td>

                                <td>{item.sclrname}</td>

                                <td>{item.amount}</td>

                                <td>{item.deadline}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            editScholarship(item)
                                        }
                                    >
                                        Edit
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() =>
                                            deleteScholarship(item.sclrid)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default Admin;