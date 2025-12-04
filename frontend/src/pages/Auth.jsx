import React, { useState } from "react";
import axios from "axios";

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  const API = process.env.REACT_APP_API_URL;

  // =========================
  // LOGIN REQUEST
  // =========================
  const loginHandler = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/login/`, {
        username,
        password
      });

      localStorage.setItem("access", res.data.tokens.access);
      localStorage.setItem("refresh", res.data.tokens.refresh);
      localStorage.setItem("role", res.data.user.role);

      onLogin(res.data.user.role);
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  // =========================
  // SIGNUP REQUEST
  // =========================
  const signupHandler = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/register/`, {
        username,
        email,
        password,
        role
      });

      alert("Signup successful! Please log in now.");
      setMode("login");
      setError("");
    } catch (err) {
      if (err.response) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Signup failed (network issue)");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl">

        {/* Toggle Buttons */}
        <div className="flex mb-6">
          <button
            onClick={() => setMode("login")}
            className={`w-1/2 py-3 rounded-l-xl text-white font-semibold ${
              mode === "login" ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`w-1/2 py-3 rounded-r-xl text-white font-semibold ${
              mode === "signup" ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-4">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        {error && (
          <p className="bg-red-500 text-white p-2 text-center rounded mb-4">
            {error}
          </p>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-3 rounded bg-slate-700 text-red-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email only for signup */}
        {mode === "signup" && (
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 rounded bg-black text-red"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 rounded bg-slate-700 text-red"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role only in signup */}
        {mode === "signup" && (
          <select
            className="w-full p-3 mb-4 rounded bg-slate-700 text-red-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="family">Family</option>
            <option value="doctor">Doctor</option>
            <option value="researcher">Researcher</option>
          </select>
        )}

        {/* Submit Button */}
        <button
          onClick={mode === "login" ? loginHandler : signupHandler}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
