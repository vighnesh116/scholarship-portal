import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
function ManageScholarships() {

    const [search, setSearch] = useState("");

    const [editing, setEditing] = useState(false);

    const [scholarships, setScholarships] = useState([]);

    const [form, setForm] = useState({
        sclrid: "",
        sclrname: "",
        amount: "",
        percentreeq: "",
        miniincome: "",
        gender: "",
        caste: "",
        educationqualifiation: "",
        deadline: "",
        application_link: ""
    });

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

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const clearForm = () => {

        setEditing(false);

        setForm({
            sclrid: "",
            sclrname: "",
            amount: "",
            percentreeq: "",
            miniincome: "",
            gender: "",
            caste: "",
            educationqualifiation: "",
            deadline: "",
            application_link: ""
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

        clearForm();

        loadScholarships();
    };

    const editScholarship = (item) => {

        setForm(item);

        setEditing(true);
    };

    const updateScholarship = async () => {

        const res = await fetch(
            `http://127.0.0.1:5000/update-scholarship/${form.sclrid}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }
        );

        const data = await res.json();

        alert(data.message);

        clearForm();

        loadScholarships();
    };
    const deleteScholarship = async (sclrid) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this scholarship?"
    );

    if (!confirmDelete) {
        return;
    }

    const res = await fetch(
        `http://127.0.0.1:5000/delete-scholarship/${sclrid}`,
        {
            method: "DELETE"
        }
    );

    const data = await res.json();

    alert(data.message);

    loadScholarships();
};

    const filteredScholarships =
        scholarships.filter((item) =>
            item.sclrname
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    return (

        

        <div style={{ padding: "30px" }}>
            <AdminNavbar/>
            <h1>
                Manage Scholarships
            </h1>

            <input
                type="text"
                placeholder="Search Scholarship"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <hr />

            <input
                name="sclrname"
                placeholder="Scholarship Name"
                value={form.sclrname}
                onChange={handleChange}
            />

            <input
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
            />

            <input
                name="percentreeq"
                placeholder="Percentage Required"
                value={form.percentreeq}
                onChange={handleChange}
            />

            <input
                name="miniincome"
                placeholder="Income Limit"
                value={form.miniincome}
                onChange={handleChange}
            />

            <input
                name="gender"
                placeholder="Gender"
                value={form.gender}
                onChange={handleChange}
            />

            <input
                name="caste"
                placeholder="Caste"
                value={form.caste}
                onChange={handleChange}
            />

            <input
                name="educationqualifiation"
                placeholder="Education"
                value={form.educationqualifiation}
                onChange={handleChange}
            />

            <input
                name="deadline"
                placeholder="31-Dec-2026"
                value={form.deadline}
                onChange={handleChange}
            />

            <input
                name="application_link"
                placeholder="Application Link"
                value={form.application_link}
                onChange={handleChange}
            />

            <br /><br />

            {
                editing
                ?
                <button onClick={updateScholarship}>
                    Update Scholarship
                </button>
                :
                <button onClick={addScholarship}>
                    Add Scholarship
                </button>
            }

            <hr />

            <table border="1">

                <thead>

                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        filteredScholarships.map((item) => (

                            <tr key={item.sclrid}>

                                <td>{item.sclrid}</td>

                                <td>{item.sclrname}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            editScholarship(item)
                                        }
                                    >
                                        Edit
                                    </button>

                                </td>

                                <td>

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

export default ManageScholarships;