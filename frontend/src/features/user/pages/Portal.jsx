import { Profiler, useState } from "react";
import api from "../../../shared/api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../components/Portal.css";
import logo from "../../../assets/new2.ico";
import { CircleUser } from "lucide-react";
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="portal-page">
      <header className="portal-header">
        <div className="portal-brand-box">
          <img src={logo} alt="logo" className="p-logo" />
          <h1 className="p-brand">Scholarship Information Portal</h1>
        </div>

        <nav className="portal-nav">
          <Link to="/update-password" className="portal-nav-link"><CircleUser color="#908e8e" /></Link>
        </nav>
      </header>

      <main className="portal-main">
        <section className="portal-hero">
          <h1>Find Scholarships You Are Eligible For</h1>
        </section>

        <div className="portal-container">
          <div className="portal-form-box">
            <form onSubmit={submit}>
              <input
                required
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                required
                type="number"
                min="0"
                max="100"
                name="marks"
                placeholder="Enter Percentage"
                value={form.marks}
                onChange={handleChange}
              />

              <input
                required
                type="number"
                min="1"
                name="income"
                placeholder="Enter Family Income"
                value={form.income}
                onChange={handleChange}
              />

              <select
                required
                name="caste"
                value={form.caste}
                onChange={handleChange}
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
                value={form.education}
                onChange={handleChange}
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
                value={form.gender}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Gender
                </option>

                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <button type="submit" disabled={loading}>
                {loading ? "Checking Eligibility..." : "Check Eligibility"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="portal-footer">
        <p>© 2026 Scholarship Information Portal</p>
      </footer>
    </div>
  );
}

export default Portal;