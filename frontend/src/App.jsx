import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/signup";
import Home from "./pages/Home";
import ScholarshipResult from "./pages/ScholarshipResult";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/portal"
          element={<Home />}
        />

        <Route
          path="/scholarships"
          element={<ScholarshipResult />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;