import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExercisesPage from "./pages/ExercisesPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import UserManagement from "./pages/UserManagement";
import ProgressPage from "./pages/ProgressPage";
import StatsPage from "./pages/StatsPage";
function App() {
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />

        {/* ✅ User management page */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/stats" element={<StatsPage />} />
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Toast hiển thị toàn app */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
