import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_id: 1,
    name: "",
    marks: "",
    income: "",
    caste: "",
    education: "",
    gender: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      // Save 
      await axios.post(
        "http://localhost:5000/portal",
        form
      );

      // Fetch
      const response = await axios.post(
        "http://localhost:5000/scholarships",
        form
      );

      // Redirect to scholarship results page
      navigate("/scholarships", {
        state: {
          scholarships: response.data
        }
      });
    } catch (error) {
      console.log(error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="page-container">
      <header>
        <h2>Scholarship Information Portal</h2>

        <nav>
          <a href="signup">Profile</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Find Scholarships You Are Eligible For</h1>
          <br/>
          
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

              <br />
              

              <input
                required
                type="number"
                name="marks"
                placeholder="Enter Percentage"
                onChange={handleChange}
              />

              <br />
  

              <input
                required
                type="number"
                name="income"
                placeholder="Enter Family Income"
                onChange={handleChange}
              />

            
              <br />

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

              
              <br />

              <select
                required
                name="education"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Your Class
                </option>

                <option value="11">11th</option>
                <option value="12">12th</option>
              </select>
              
              <br />

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
              
              
              <button type="submit">
                Check Eligibility
              </button>
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

export default Home;