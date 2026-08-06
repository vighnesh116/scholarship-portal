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
import ProtectedRoute from "./ProtectedRoutes";
import ViewScholarships from "../features/Scholarship/pages/ViewScholarships";
import Logout from "../shared/components/Logout";
import CreateScholarship from "../features/Scholarship/pages/CreateScholarship";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/logout" element={<Logout />} />


      <Route
        path="/update-password"
        element={
          <ProtectedRoute allowedRole={student}>
            <PasswordUpdate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/portal"
        element={
          <ProtectedRoute allowedRole={student}>
            <Portal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/scholarships"
        element={
          <ProtectedRoute allowedRole={student}>
            <ScholarshipResult />{" "}
          </ProtectedRoute>
        }
      />

      
      <Route path="/admin" element={<ProtectedRoute allowedRole={admin}><AdminLayout /></ProtectedRoute>}>

        <Route index element={<ProtectedRoute allowedRole={admin}><AdminDashboard /></ProtectedRoute>} />

        <Route path="manage" element={<ProtectedRoute allowedRole={admin}><CreateScholarship /></ProtectedRoute>} />

        <Route path="view" element={<ProtectedRoute allowedRole={admin}><ViewScholarships /></ProtectedRoute>} />

        <Route path="students" element={<ProtectedRoute allowedRole={admin}><StudentsDetails /></ProtectedRoute>} />

        <Route path="users" element={<ProtectedRoute allowedRole={admin}><UsersDetails /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
