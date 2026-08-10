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
import ErrorPage from "../shared/pages/ErrorPage";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/error" element={<ErrorPage />} />


       <Route
        path="/scholarships"
        element={
          <ProtectedRoute
            childern={<ScholarshipResult />}
            allowedRole="student"
          />
        }
      >


      <Route
        path="update-password"
        element={
          <ProtectedRoute childern={<PasswordUpdate />} allowedRole="student" />
        }
      />

      <Route
        path="portal"
        element={<ProtectedRoute childern={<Portal />} allowedRole="student" />}
      />

     

      <Route
        path="logout"
        element={<ProtectedRoute childern={<Logout />} allowedRole="student" />}
      /> 
      </Route>
      {/*=========================Admin====================================*/}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin" childern={<AdminLayout />} />
        }
      >
        <Route
          index
          element={
            <ProtectedRoute childern={<AdminDashboard />} allowedRole="admin" />
          }
        />

        <Route
          path="manage"
          element={
            <ProtectedRoute
              childern={<CreateScholarship />}
              allowedRole="admin"
            />
          }
        />

        <Route
          path="view"
          element={
            <ProtectedRoute
              childern={<ViewScholarships />}
              allowedRole="admin"
            />
          }
        />

        <Route
          path="students"
          element={
            <ProtectedRoute
              childern={<StudentsDetails />}
              allowedRole="admin"
            />
          }
        />

        <Route
          path="users"
          element={
            <ProtectedRoute childern={<UsersDetails />} allowedRole="admin" />
          }
        />

        <Route
          path="logout"
          element={<ProtectedRoute childern={<Logout />} allowedRole="admin" />}
        />

      </Route>

      <Route path="*" element={<ErrorPage />} />

    </Routes>
  );
}

export default AppRoutes;
