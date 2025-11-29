import React, { useState } from "react";
import axios from "axios";

export default function Signup({ switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signup = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register/`,
        { username, email, password, role }
      );

      setSuccess("Signup successful! Please login.");
      setError("");
    } catch (err) {
      setError("Signup failed. Username or email already exists.");
      console.log(err.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-96 shadow-xl text-white">

        <div className="flex mb-6">
          <button
            onClick={switchToLogin}
            className="w-1/2 py-2 bg-slate-700 rounded-l-lg"
          >
            Login
          </button>
          <button className="w-1/2 py-2 bg-blue-600 rounded-r-lg">
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        {error && <p className="text-red-400 text-center mb-2">{error}</p>}
        {success && <p className="text-green-400 text-center mb-2">{success}</p>}

        <input className="input" placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />

        <input className="input" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="input" type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <select className="input" onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="family">Family</option>
          <option value="doctor">Doctor</option>
          <option value="researcher">Researcher</option>
        </select>

        <button onClick={signup} className="w-full mt-4 py-2 bg-blue-600 rounded-lg">
          Sign Up
        </button>
      </div>
    </div>
  );
}
