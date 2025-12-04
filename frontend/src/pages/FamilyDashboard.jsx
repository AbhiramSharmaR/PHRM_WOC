import React from "react";

export default function FamilyDashboard() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-5">Family Dashboard</h1>

      <div className="bg-gray-800 p-5 rounded-lg mb-6">
        <h2 className="text-xl font-semibold">Family Health Overview 👨‍👩‍👧‍👦</h2>
      </div>

      <div className="bg-gray-900 p-5 rounded-lg">
        <ul className="list-disc pl-5 text-gray-300">
          <li>Father – BP Normal</li>
          <li>Mother – Diabetes Under Control</li>
          <li>Brother – Needs Eye Exam</li>
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
