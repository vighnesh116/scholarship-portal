import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  // State to store API data
  const [data, setData] = useState([]);

  // Runs automatically when the page loads
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from REST API
  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummy.restapiexample.com/api/v1/employees");

      // Save data into state
      setData(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h2>Employee List</h2>

      {/* Button to fetch data again */}
      <button onClick={fetchData}>
        Fetch Data
      </button>

      {/* Display employee names */}
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.employee_name}
          </li>
        ))}
      </ul>

    </div>
  );
}



export default App;