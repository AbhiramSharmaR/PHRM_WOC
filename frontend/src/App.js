import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import FamilyDashboard from "./pages/FamilyDashboard";
import ResearchDashboard from "./pages/ResearchDashboard";

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isSignup, setIsSignup] = useState(false);

  const logout = () => {
    localStorage.clear();
    setRole(null);
  };

  if (!role) {
    return isSignup ? (
      <Signup switchToLogin={() => setIsSignup(false)} />
    ) : (
      <Login switchToSignup={() => setIsSignup(true)} onLogin={setRole} />
    );
  }

  if (role === "patient") return <PatientDashboard onLogout={logout} />;
  if (role === "doctor") return <DoctorDashboard onLogout={logout} />;
  if (role === "family") return <FamilyDashboard onLogout={logout} />;
  if (role === "researcher") return <ResearchDashboard onLogout={logout} />;

  return null;
}
