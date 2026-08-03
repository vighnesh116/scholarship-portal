import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/ManageScholarships.css";
import { toast } from "react-toastify";
import {confirmAction} from "../../../shared/components/ConfirmAction";
import {SavePen}from 'lucide-react';
function CreateScholarship() {
  const location = useLocation();
  const navigate = useNavigate();

  const editItem = location.state?.scholarship || null;

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const[draft,setDraft]=useState(0)
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
    draft: 0,
  });

  useEffect(() => {
    if (editItem) {
      setForm({
        ...editItem,
        draft: editItem.draft || 0,
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
      draft: 0,
    });
  };

  const addScholarship = async () => {
    const confirmed =await confirmAction({
      title:"Add Scholarship",
      text:"Confirm of adding this scholarship ",
      successTitle:"Successfully Added ",
      successText:"The scholarship has been added to database ",
    });
    if(!confirmed)return;
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
    const confirmed=await confirmAction({
        title:"Update Scholarship",
        text:"This will make changes in data",
        successTitle:"Updated Successfully",
        successText:"Scholarship Updated successfully",
      });
      if(!confirmed)return;
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
        },
        
      );
      const data = await res.json();
      
      toast.success(data.message);
      clearForm();
      loadScholarships();
      navigate("/admin/view");
    } 
    catch (error) {
      toast.error("Error updating scholarship:");
      
    }
  };

 
  
  
  return (
    <div className="manage-container">
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editing) {
            updateScholarship();
          } else {
            addScholarship();
          }
        }}
      >
        <h1>{editing ? "Edit Scholarship" : "Add Scholarship"}</h1>
        <div className="form-grid">
          <input
            required
            name="sclrname"
            placeholder="Scholarship Name"
            value={form.sclrname}
            onChange={handleChange}
          />

          <input
            required
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
            type="url"
            name="application_link"
            placeholder="Application Link"
            value={form.application_link}
            onChange={handleChange}
          />

          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">All Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select name="caste" value={form.caste} onChange={handleChange}>
            <option value="">All Category</option>
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
 
        <button type="button" name="draft" className="action-btn"  value={form.draft=1} onClick={
            {
                handleChange,
                addScholarship
            }
        }>
          <SavePen color="#0d0808" />  Save As Draft
        </button> 

        <button
          style={{ backgroundColor: "green" }}
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

export default CreateScholarship;
