import React, { useState } from "react";
import axios from "axios";

export default function Login({ switchToSignup, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login/`,
        { username, password }
      );

      const { user, tokens } = res.data;

      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);
      localStorage.setItem("role", user.role);

      onLogin(user.role);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-96 shadow-xl text-white">

        <div className="flex mb-6">
          <button className="w-1/2 py-2 bg-blue-600 rounded-l-lg">
            Login
          </button>
          <button
            onClick={switchToSignup}
            className="w-1/2 py-2 bg-slate-700 rounded-r-lg"
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        <input className="input" placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />

        <input className="input" type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button
          onClick={login}
          className="w-full mt-4 py-2 bg-blue-600 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
