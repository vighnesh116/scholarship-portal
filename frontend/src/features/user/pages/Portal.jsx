import { useState } from "react";
import api from "../../../shared/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAction } from "../../../shared/components/ConfirmAction";
import "../components/Portal.css";
import logo from "../../../assets/new2.ico";
import Sidebar from "../../admin/components/Sidebar";
function Portal() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_id: 1,
    name: "",
    marks: "",
    income: "",
    caste: "",
    education: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/portal", form);

      const response = await api.post("/scholarships", form);

      navigate("/scholarships", {
        state: {
          scholarships: response.data,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Error submitting form");
    }
  };

  return (
    <div className="page-container">
      <header>
        <div className="header-brand-wrap">
          <img src={logo} alt="logo" className="p-logo" />
          <h1 className="p-brand">Scholarship Information Portal</h1>
        </div>

        <nav>
          <a href="update-password">Profile</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Find Scholarships You Are Eligible For</h1>
        </section>

        <div className="container">
          <div className="form-box">
            <form onSubmit={submit}>
              <input
                required
                type="text"
                name="name"
                placeholder="Enter Your Name"
                onChange={handleChange}
              />

              <input
                required
                type="number"
                min="0"
                max="100"
                name="marks"
                placeholder="Enter Percentage"
                onChange={handleChange}
              />

              <input
                required
                type="number"
                min="1"
                name="income"
                placeholder="Enter Family Income"
                onChange={handleChange}
              />

              <select
                required
                name="caste"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Category
                </option>

                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="Minority">Minority</option>
              </select>

              <select
                required
                name="education"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Your Class
                </option>

                <option value="11">11th Passout </option>
                <option value="12">12th Passout </option>
              </select>

              <select
                required
                name="gender"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Gender
                </option>

                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <button type="submit">Check Eligibility</button>
            </form>
          </div>
        </div>
      </main>

      <footer>
        <p>© 2026 Scholarship Information Portal</p>
      </footer>
    </div>
  );
}

export default Portal;