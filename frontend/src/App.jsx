import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersDetails from "./pages/UsersDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ScholarshipResult from "./pages/ScholarshipResult";
import StudentsDetails from "./pages/StudentsDetails";
import Admin from "./pages/Admin";
import ManageScholarships from "./pages/ManageScholarships";
import ViewScholarships from "./pages/ViewScholarships";

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

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin/manage"
          element={<ManageScholarships />}
        />

        <Route
          path="/admin/view"
          element={<ViewScholarships />}
        />

        <Route
          path="/admin/students"
          element={<StudentsDetails />}
        />

        
        <Route
          path="/admin/users"
          element={<UsersDetails />}
        />


      </Routes>

    </BrowserRouter>

  );
}

export default App;