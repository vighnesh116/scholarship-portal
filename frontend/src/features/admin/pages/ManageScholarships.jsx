import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/ManageScholarships.css";
import { toast } from "react-toastify";

function ManageScholarships() {
  const location = useLocation();
  const navigate = useNavigate();

 
  const editItem = location.state?.scholarship || null;

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
    if (editItem) {
      setForm({
        ...editItem,
        gender: editItem.gender || "",
        caste: editItem.caste || "",
        educationqualifiation: editItem.educationqualifiation || "",
      });
      setEditing(true);
    } else {
      clearForm();
    }
  }, [editItem]);

  useEffect(() => {
    loadScholarships();
  }, []);

  const loadScholarships = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/admin-scholarships");
      const data = await res.json();
      setScholarships(data || []);
    } catch (error) {
      toast.error("Error loading scholarships:", error);
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const data = await res.json();
    toast.info(data.message);
    clearForm();
    loadScholarships();
    navigate("/admin/view"); 
  };

  
  const updateScholarship = async () => {
    const dataToSend = {
      ...form,
      gender: form.gender || null,
      caste: form.caste || null,
      educationqualifiation: form.educationqualifiation || null,
    };

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/update-scholarship/${form.sclrid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      const data = await res.json();
      toast(data.message);
      clearForm();
      loadScholarships();
      navigate("/admin/view");
    } catch (error) {
      toast.error("Error updating scholarship:", error);
      toast.error("Error updating scholarship");
    }
  };

  const filteredScholarships = scholarships.filter((item) =>
    item.sclrname?.toLowerCase().includes(search.toLowerCase())
  );

  const displayValue = (value) =>
    value === null || value === undefined || value === "" ? "NULL" : value;

 
  return (
    <div className="manage-container">
      <h1 className="manage-title">Edit-Scholarships</h1>
      <form 
       onSubmit={(e)=>{
        e.preventDefault();
        if(editing){
          updateScholarship();
        }
        else{
          addScholarship();
        }
      }}>
      <div className="form-grid">
        
        <input
          required
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
          type="number"
          min="0"
          max="100"
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
    <button type="submit" className="action-btn">
      Update Scholarship
    </button>
  ) : (
    <button type="submit" className="action-btn">
      Add Scholarship
    </button>
  )}
      
       <button style={{backgroundColor:'green'}}
    type="button"
    className="clear-btn"
    onClick={clearForm}
  >
    Clear Form
  </button>
  </form>
    </div>
  );
}

export default ManageScholarships;
