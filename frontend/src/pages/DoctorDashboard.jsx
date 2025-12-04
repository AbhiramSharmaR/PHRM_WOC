import React from "react";

export default function DoctorDashboard() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-5">Doctor Dashboard</h1>

      <div className="bg-gray-800 p-5 rounded-lg mb-6">
        <h2 className="text-xl font-semibold">Welcome Doctor 👨‍⚕️</h2>
        <p className="text-gray-300">Here are today's appointments:</p>
      </div>

      <div className="bg-gray-900 p-5 rounded-lg">
        <ul className="list-disc pl-5 text-gray-300">
          <li>10:00 AM – John Doe</li>
          <li>11:30 AM – Sarah Williams</li>
          <li>02:00 PM – David Smith</li>
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
