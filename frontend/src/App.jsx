import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import UploadData from "./pages/UploadData";
import UploadedAnalysis from "./pages/UploadedAnalysis";
import UploadHistory from "./pages/UploadHistory";
import Analytics from "./pages/Analytics";
import Forecast from "./pages/Forecast";

import DashboardLayout from "./components/DashboardLayout";

import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===================== */}
        {/* Public Routes */}
        {/* ===================== */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        {/* ===================== */}
        {/* Dashboard Routes */}
        {/* ===================== */}

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/upload"
          element={
            <DashboardLayout>
              <UploadData />
            </DashboardLayout>
          }
        />

        <Route
          path="/uploaded-analysis"
          element={
            <DashboardLayout>
              <UploadedAnalysis />
            </DashboardLayout>
          }
        />

        <Route
          path="/upload-history"
          element={
            <DashboardLayout>
              <UploadHistory />
            </DashboardLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          }
        />

        <Route
          path="/forecast"
          element={
            <DashboardLayout>
              <Forecast />
            </DashboardLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;