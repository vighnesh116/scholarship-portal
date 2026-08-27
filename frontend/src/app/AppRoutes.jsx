import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Signup,
  Portal,
  ScholarshipResult,
  PasswordUpdate,
  AdminLayout,
  AdminDashboard,
  StudentsDetails,
  UsersDetails,
  ProtectedRoute,
  ViewScholarships,
  Logout,
  CreateScholarship,
  ErrorPage,
  AdminPassUpdate,
} from "./ImportPage";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/error" element={<ErrorPage />} />

      <Route
        path="/update-password"
        element={<ProtectedRoute children={<PasswordUpdate />} />}
      />

      <Route
        path="/portal"
        element={<ProtectedRoute children={<Portal />} allowedRole="student" />}
      />

      <Route
        path="/scholarships"
        element={
          <ProtectedRoute
            children={<ScholarshipResult />}
            allowedRole="student"
          />
        }
      />

      <Route
        path="/logout"
        element={<ProtectedRoute children={<Logout />} />}
      />

      {/*===========Admin=========*/}
      <Route
        path="/admin"
        element={
          <ProtectedRoute children={<AdminLayout />} allowedRole="admin" />
        }
      >
        <Route
          index
          element={
            <ProtectedRoute children={<AdminDashboard />} allowedRole="admin" />
          }
        />

        <Route
          path="manage"
          element={
            <ProtectedRoute
              children={<CreateScholarship />}
              allowedRole="admin"
            />
          }
        />

        <Route
          path="view"
          element={
            <ProtectedRoute
              children={<ViewScholarships />}
              allowedRole="admin"
            />
          }
        />

        <Route
          path="students"
          element={
            <ProtectedRoute
              children={<StudentsDetails />}
              allowedRole="admin"
            />
          }
        />

        <Route
          path="users"
          element={
            <ProtectedRoute children={<UsersDetails />} allowedRole="admin" />
          }
        />

        <Route
          path="logout"
          element={<ProtectedRoute children={<Logout />} allowedRole="admin" />}
        />

        <Route
          path="admin-updatepassword"
          element={
            <ProtectedRoute children={<AdminPassUpdate />} allowedRole="admin" />
          }
        />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;
