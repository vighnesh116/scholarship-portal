import { useState } from "react";
import axios from "axios";

function Home() {

  const [form, setForm] = useState({
    user_id: 1,
    name: "",
    marks: "",
    income: "",
    caste: "",
    education: "",
    gender: ""
  });

  // Handle Input Changes
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // Submit Form
  const submit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/portal",
        form
      );

      alert(response.data.message);

      console.log(form);

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

          <h1>
            Find Scholarships You Are Eligible For
          </h1>

          <p>
            Enter your academic and personal details
            to check available scholarships.
          </p>

        </section>

        {/* FORM */}

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

              <br /><br />

              <input
                required
                type="number"
                name="marks"
                placeholder="Enter Percentage"
                onChange={handleChange}
              />

              <br /><br />

              <input
                required
                type="number"
                name="income"
                placeholder="Enter Family Income"
                onChange={handleChange}
              />

              <br /><br />

              {/* CASTE */}

              <select
                required
                name="caste"
                onChange={handleChange}
                defaultValue=""
              >

                <option value="" disabled>
                  Category
                </option>

                <option value="general">
                  General
                </option>

                <option value="obc">
                  OBC
                </option>

                <option value="sc">
                  SC
                </option>

                <option value="st">
                  ST
                </option>

                <option value="minority">
                  Minority
                </option>

              </select>

              <br /><br />

              {/* EDUCATION */}

              <select
                required
                name="education"
                onChange={handleChange}
                defaultValue=""
              >

                <option value="" disabled>
                  Select Your Class
                </option>

                <option value="11">
                  11th
                </option>

                <option value="12">
                  12th
                </option>

              </select>

              <br /><br />

              {/* GENDER */}

              <select required name="gender"
                onChange={handleChange}
                defaultValue=""
              >

                <option value="" disabled>
                  Select Gender
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>

              </select>

              <br /><br />

              <button type="submit">
                Check Eligibility
              </button>

            </form>

          </div>

        </div>

      </main>

      <footer>

        <p>
          © 2026 Scholarship Information Portal
        </p>

      </footer>

    </div>

  );
}

export default Home;