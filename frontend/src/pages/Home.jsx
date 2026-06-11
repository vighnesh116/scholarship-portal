import { useEffect, useState } from "react";
import StudentForm from "../components/studentForm";
function Home() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/scholarships")
      .then((response) => response.json())
      .then((data) => setScholarships(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    
    <div>
      <header>
      <div class="logo">
      </div>
      <nav>
        <a href="#">👤Profile</a>
        {
        /* <a href="#">Scholarships</a>
        <a href="#">About</a>
        <a href="#">Contact</a>*/
        }
        </nav>
    </header>
      <h1>Scholarship Information Portal</h1>
      <StudentForm/>
      {scholarships.map((s) => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>Amount: ₹{s.amount}</p>
        </div>
      ))}
      <footer>
        <p> 2026 Scholarship Portal .</p>
      </footer>
    </div>
  
  );
}

export default Home;