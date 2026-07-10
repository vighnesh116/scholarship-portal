import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "../components/ManageScholarships.css";
import { toast } from "react-toastify";
import { Pen, Trash2 } from 'lucide-react';
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
    application_link: "",
  });

  useEffect(() => {
    loadScholarships();
  }, []);

  const loadScholarships = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin-scholarships");
      const data = await res.json();
      setScholarships(data || []);
    } catch (error) {
      console.error("Error loading scholarships:", error);
      setScholarships([]);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
      application_link: "",
    });
  };
  const addScholarship = async () => {
    const dataToSend = {
      ...form,
      gender: form.gender || null,
      caste: form.caste || null,
      educationqualifiation: form.educationqualifiation || null,
    };

    const res = await fetch("http://127.0.0.1:5000/add-scholarship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    const data = await res.json();

    toast(data.message);

    clearForm();

    loadScholarships();
  };
  const editScholarship = (item) => {
    setForm({
      ...item,
      gender: item.gender || "",
      caste: item.caste || "",
      educationqualifiation: item.educationqualifiation || "",
    });

    setEditing(true);
  };

  const updateScholarship = async () => {
    const dataToSend = {
      ...form,
      gender: form.gender || null,
      caste: form.caste || null,
      educationqualifiation: form.educationqualifiation || null,
    };

    const res = await fetch(
      `http://127.0.0.1:5000/update-scholarship/${form.sclrid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      },
    );

    const data = await res.json();

    toast.success(data.message);

    clearForm();

    loadScholarships();
  };
  const deleteScholarship = async (sclrid) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this scholarship?",
    );

    if (!confirmDelete) {
      return;
    }

    const res = await fetch(
      `http://127.0.0.1:5000/delete-scholarship/${sclrid}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();

    toast.error(data.message);

    loadScholarships();
  };

  const filteredScholarships = scholarships.filter((item) =>
    item.sclrname?.toLowerCase().includes(search.toLowerCase()),
  );

  // Function to display NULL for empty values
  const displayValue = (value) => {
    return value === null || value === undefined || value === "" ? "NULL" : value;
  };

  return (
    <div className="manage-container">


      <h1 className="manage-title">Edit-Scholarships</h1>


      <div className="form-grid">
        <input
          name="sclrname"
          placeholder="Scholarship Name"
          value={form.sclrname}
          onChange={handleChange}
        />

        <input
          name="amount"
          placeholder="Scholarship Amount"
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

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>

          <option value="Male">Male</option>

          <option value="Female">Female</option>
        </select>

        <select name="caste" value={form.caste} onChange={handleChange}>
          <option value="">Category</option>

          <option value="General">General</option>

          <option value="OBC">OBC</option>

          <option value="SC">SC</option>

          <option value="ST">ST</option>

          <option value="Minority">Minority</option>
        </select>

        <select
          name="educationqualifiation"
          value={form.educationqualifiation}
          onChange={handleChange}
        >
          <option value="">Select Class</option>

          <option value="11">11th</option>

          <option value="12">12th</option>
        </select>
      </div>

      {editing ? (
        <button className="action-btn" onClick={updateScholarship}>
          Update Scholarship
        </button>
      ) : (
        <button className="action-btn" onClick={addScholarship}>
          Add Scholarship
        </button>
      )}


    </div>




  );
}

export default ManageScholarships;
