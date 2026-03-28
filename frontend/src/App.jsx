import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Trainings from "./pages/dashboard/Trainings";
import Health from "./pages/dashboard/Health"
import Documents from "./pages/dashboard/Documents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" 
        element={
        <PublicRoute>
        <LoginPage />
        </PublicRoute>} 
        />

        <Route path="/dashboard" 
        element={
        <ProtectedRoute>
        <DashboardLayout />
        </ProtectedRoute>}
        >
          <Route index element={<Dashboard />} />
          <Route path="trainings" element={<Trainings />} />
          <Route path="health" element={<Health />} />
          <Route path="documents" element={<Documents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
