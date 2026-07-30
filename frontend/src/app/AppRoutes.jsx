import { Routes, Route } from "react-router-dom";
import Login from "../features/user/pages/Login";
import Signup from "../features/user/pages/Signup";
import Portal from "../features/user/pages/Portal";
import ScholarshipResult from "../features/user/pages/ScholarshipResult";
import PasswordUpdate from "../features/user/pages/PasswordUpdate";
import AdminLayout from "../features/admin/components/AdminLayout";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import StudentsDetails from "../features/admin/pages/StudentsDetails";
import UsersDetails from "../features/admin/pages/UsersDetails";
import ManageScholarships from "../features/admin/pages/ManageScholarships";
import ViewScholarships from "../features/admin/pages/ViewScholarships";
import Logout from "../shared/components/Logout";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/update-password" element={<PasswordUpdate />} />

      <Route path="/portal" element={<Portal />} />

      <Route path="/scholarships" element={<ScholarshipResult />} />

      <Route path='/logout' element={<Logout/>}/>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path="manage" element={<ManageScholarships />} />

        <Route path="view" element={<ViewScholarships />} />

        <Route path="students" element={<StudentsDetails />} />

        <Route path="users" element={<UsersDetails />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
