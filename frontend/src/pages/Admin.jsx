import { useState } from "react";

function Admin() {

    const [form, setForm] = useState({
        sclrname: "",
        amount: "",
        percentreeq: "",
        miniincome: "",
        deadline: "",
        application_link: ""
    });

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
    };

    return (
        <div>

            <h1>Admin Panel</h1>

            <input
                name="sclrname"
                placeholder="Scholarship Name"
                onChange={handleChange}
            />

            <input
                name="amount"
                placeholder="Amount"
                onChange={handleChange}
            />

            <input
                name="percentreeq"
                placeholder="Required Percentage"
                onChange={handleChange}
            />

            <input
                name="miniincome"
                placeholder="Income Limit"
                onChange={handleChange}
            />

            <input
                name="deadline"
                placeholder="31-Dec-2026"
                onChange={handleChange}
            />

            <input
                name="application_link"
                placeholder="Application Link"
                onChange={handleChange}
            />

            <button onClick={addScholarship}>
                Add Scholarship
            </button>

        </div>
    );
}

export default Admin;