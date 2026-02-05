import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/homepage"; // your homepage with ContactMe
import AdminLogin from "./Pages/AdminLogin";
import AdminPanel from "./Pages/AdminPanel";

function App() {
  const [token, setToken] = useState("");

  return (
    <Router>
      <Routes>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />

        {/* Admin Login Page */}
        <Route
          path="/admin/login"
          element={<AdminLogin onLogin={setToken} />}
        />

        {/* Admin Panel Page (protected) */}
        <Route
          path="/admin/panel"
          element={
            token ? (
              <AdminPanel token={token} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Catch all: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
