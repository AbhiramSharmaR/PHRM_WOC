import React from "react";

export default function PatientDashboard() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-10 text-light green-100x">
      <h1 className="text-3xl font-bold mb-5">Patient Dashboard</h1>

      <div className="bg-gray-800 p-5 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome 👋</h2>
        <p className="text-gray-300">You can see your details and reports below.</p>
      </div>

      <div className="bg-gray-900 p-5 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Your Medical Records</h3>
        <ul className="list-disc pl-5 text-gray-300">
          <li>Blood Test – Normal</li>
          <li>X-Ray – No issues</li>
          <li>Annual Physical Check Pending</li>
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
