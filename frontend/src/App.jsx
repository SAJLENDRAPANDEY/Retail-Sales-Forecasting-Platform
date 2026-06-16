import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Forecast from "./pages/Forecast";
import Login from "./pages/Login";
import UploadData from "./pages/UploadData";

import UploadedAnalysis from "./pages/UploadedAnalysis";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/forecast"
              element={<Forecast />}
            />

            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/uploaded-analysis"
              element={<UploadedAnalysis />}
            />

            <Route
              path="/upload"
              element={<UploadData />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;