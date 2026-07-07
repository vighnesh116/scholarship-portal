import {  Routes, Route } from "react-router-dom";
import Login from "../features/user/pages/Login";
import Signup from "../features/user/pages/Signup";
import Home from "../features/user/pages/Home";
import ScholarshipResult from "../features/user/pages/ScholarshipResult";
import PasswordUpdate from "../features/user/pages/PasswordUpdate";

import Admin from "../features/admin/pages/Admin";
import StudentsDetails from "../features/admin/pages/StudentsDetails";
import UsersDetails from "../features/admin/pages/UsersDetails";
import ManageScholarships from "../features/admin/pages/ManageScholarships";
import ViewScholarships from "../features/admin/pages/ViewScholarships";

function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} replace />

        <Route path="/signup" element={<Signup />} />

        <Route path="/portal" element={<Home />} />

        <Route path="/scholarships" element={<ScholarshipResult />} />

        <Route path="/admin/">
          <Route index element={<Admin />} />

          <Route path="manage" element={<ManageScholarships />} />

          <Route path="view" element={<ViewScholarships />} />

          <Route path="students" element={<StudentsDetails />} />

          <Route path="users" element={<UsersDetails />} />
        </Route>

        <Route path="/update-password" element={<PasswordUpdate />} />
      </Routes>
    
  );
}

export default AppRoutes;
