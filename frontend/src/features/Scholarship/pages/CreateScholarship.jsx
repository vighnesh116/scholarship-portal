import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/createSclr.css";
import { toast } from "react-toastify";
import { confirmAction } from "../../../shared/components/ConfirmAction";
import { SavePen } from "lucide-react";
import api from "../../../shared/api/axiosInstance";
function CreateScholarship() {
  const location = useLocation();
  const navigate = useNavigate();

  const editItem = location.state?.scholarship || null;

  const token = localStorage.getItem("access_token");
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
      // const res = await fetch("http://127.0.0.1:5000/admin-scholarships",{
      //   headers:{
      //     Authorization:`Bearer ${token}`
      //   }
      // });
      const res = await api.get("/admin-scholarships");
      const data = res.data;
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

  const validateDeadline = () => {
    const deadlinePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = form.deadline.match(deadlinePattern);

    if (!match) {
      toast.error("Deadline must be in DD-MM-YYYY format, for example 12-09-2027");
      return false;
    }

    const [, day, month, year] = match;
    const deadlineDate = new Date(`${year}-${month}-${day}T00:00:00`);
    const isValidDate =
      deadlineDate.getFullYear() === Number(year) &&
      deadlineDate.getMonth() + 1 === Number(month) &&
      deadlineDate.getDate() === Number(day);

    if (!isValidDate) {
      toast.error("Please enter a valid deadline date");
      return false;
    }

    return true;
  };

  const addScholarship = async (draftValue = 0) => {
    if (!validateDeadline()) return;

    const confirmed = await confirmAction({
      title: draftValue === 0 ? "Add-Scholarship" : "Save as Draft",
      text:
        draftValue === 0
          ? "Confirm of adding this scholarship "
          : "Confirm saving this scholarship as draft",
      successTitle: "Successfully Added ",
      successText:
        draftValue === 0
          ? "The scholarship has been added to Portal "
          : "The scholarship has been saved as draft",
    });
    if (!confirmed) return;
    const dataToSend = {
      ...form,
      draft: draftValue,
      gender: form.gender || null,
      caste: form.caste || null,
      educationqualifiation: form.educationqualifiation || null,
    };

    // const res = await fetch("http://127.0.0.1:5000/add-scholarship", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`

    //     },
    //   body: JSON.stringify(dataToSend),
    // });
    try {
      const res = await api.post("/add-scholarship", dataToSend);

      toast.success(res.data.message);

      clearForm();
      loadScholarships();
      navigate("/admin/view");
    } catch (error) {
      console.log(error);
      console.log("ADD ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("SERVER MESSAGE:", error.response?.data);

      toast.error("Error adding scholarship");
    }
  };

  const updateScholarship = async (draftValue = 0) => {
    if (!validateDeadline()) return;

    const confirmed = await confirmAction({
      title: draftValue === 0 ? "Update Scholarship" : "Save as Draft",
      text:
        draftValue === 0
          ? "Confirm updating this scholarship "
          : "Confirm saving this scholarship as draft",
      successTitle: "Successfully Updated ",
      successText:
        draftValue === 0
          ? "The scholarship has been updated successfully "
          : "The scholarship has been saved as draft",
    });
    if (!confirmed) return;
    const dataToSend = {
      ...form,
      miniincome:form.miniincome || null,
      draft: draftValue,
      gender: form.gender || null,
      caste: form.caste || null,
      educationqualifiation: form.educationqualifiation || null,
    };

    try {
      // const res = await fetch(
      //   `http://127.0.0.1:5000/update-scholarship/${form.sclrid}`,
      //   {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" ,
      //       Authorization:`Bearer ${token}`,
      //     },
      //     body: JSON.stringify(dataToSend),
      //   },
      // );
      const res = await api.put(
        `/update-scholarship/${form.sclrid}`,
        dataToSend,
      );

      toast.success(res.data.message);

      clearForm();
      loadScholarships();
      navigate("/admin/view");
    } catch (error) {
      console.log(error);
      toast.error("Error updating scholarship");
    }
  };

  return (
    <div className="cs-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editing) {
            updateScholarship(0);
          } else {
            addScholarship(0);
          }
        }}
      >
        <h1>{editing ? "Edit Scholarship" : "Add Scholarship"}</h1>

        <div className="cs-form-grid">
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
            placeholder="31-12-2026"
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

        {/* Bottom action bar: submit button centred, draft+cancel stacked on right */}
        <div className="cs-actions">
          {editing ? (
            <button type="submit" className="cs-btn-primary">
              <SavePen size={18} /> Update Scholarship
            </button>
          ) : (
            <button type="submit" className="cs-btn-primary">
              <SavePen size={18} /> Add-Scholarship
            </button>
          )}

          <div className="cs-side-actions">
            <button
              type="button"
              className="cs-btn-draft"
              onClick={() => {
                if (editing) {
                  updateScholarship(1);
                } else {
                  addScholarship(1);
                }
              }}
            >
              Save As Draft
            </button>

            <button
              type="button"
              className="cs-btn-cancel"
              onClick={clearForm}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateScholarship;
