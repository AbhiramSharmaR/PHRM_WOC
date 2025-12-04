import React from "react";

export default function ResearchDashboard() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-5">Research Dashboard</h1>

      <div className="bg-gray-800 p-5 rounded-lg mb-6">
        <h2 className="text-xl font-semibold">Research Insights 🔬</h2>
      </div>

      <div className="bg-gray-900 p-5 rounded-lg">
        <ul className="list-disc pl-5 text-gray-300">
          <li>AI Prediction Accuracy – 92%</li>
          <li>Dataset Size – 12,000 Patients</li>
          <li>New Anomaly Reports – 4 Pending Review</li>
        </ul>
      </div>

      <button
        onClick={logout}
        className="mt-6 bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
