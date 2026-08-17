import { Routes, Route } from "react-router-dom";
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
} from "./ImportPage";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/error" element={<ErrorPage />} />

      <Route
        path="/update-password"
        element={<ProtectedRoute childern={<PasswordUpdate />} />}
      />

      <Route
        path="/portal"
        element={<ProtectedRoute childern={<Portal />} allowedRole="student" />}
      />

      <Route
        path="/scholarships"
        element={
          <ProtectedRoute
            childern={<ScholarshipResult />}
            allowedRole="student"
          />
        }
      />

      <Route
        path="/logout"
        element={<ProtectedRoute childern={<Logout />} />}
      />

      {/*=========================Admin====================================*/}
      <Route
        path="/admin"
        element={
          <ProtectedRoute childern={<AdminLayout />} allowedRole="admin" />
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

        <Route
          path="update-password"
          element={
            <ProtectedRoute childern={<PasswordUpdate />} allowedRole="admin" />
          }
        />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;
