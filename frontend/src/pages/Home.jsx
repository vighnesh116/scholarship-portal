import { useState } from "react";
import StudentForm from "../components/StudentForm";

function Home() {

  const [eligibleScholarships, setEligibleScholarships] = useState([]);

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
          <p>
            Enter your academic and personal details to check
            available scholarships.
          </p>
        </section>

        {/* Student Form */}
        <StudentForm setEligibleScholarships={setEligibleScholarships} />

        {/* Scholarship Results */}
        <section className="results">

          <h2>Eligible Scholarships</h2>

          {eligibleScholarships.length === 0 ? (
            <p>No scholarships checked yet.</p>
          ) : (
            eligibleScholarships.map((s) => (
              <div key={s.id} className="scholarship-card">

                <h3>{s.scholarshipname}</h3>

                <p>
                  <strong>Amount:</strong> ₹{s.amount}
                </p>

                <p>
                  <strong>Category:</strong> {s.category || "All"}
                </p>

                <p>
                  <strong>Gender:</strong> {s.applicablefor || "All"}
                </p>

                <a
                  href={s.applicationlink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Apply Here
                </a>

              </div>
            ))
          )}

        </section>

      </main>

      <footer>
        <p>© 2026 Scholarship Information Portal</p>
      </footer>

    </div>
  );
}

export default Home;