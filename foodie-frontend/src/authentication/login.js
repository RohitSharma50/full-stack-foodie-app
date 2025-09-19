import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../components/actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthMode, authMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = localStorage.getItem("currentUser");
      if (user && user !== "undefined") {
        const userData = JSON.parse(user);
        if (userData?.email) navigate("/");
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Dispatch Redux thunk
      const result = await dispatch(loginUser({ email, password }));
      if (result.success) {
        navigate("/");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 py-6">
          Login
        </h1>
        {error && (
          <div className="mb-4 text-red-800 text-sm text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <section>
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="username"
            />
          </section>
          <section>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </section>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-800 mt-4">
          Don’t have an account?{" "}
          <button
            className="text-blue-800 underline"
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
          >
            Sign up
          </button>
        </p>
      </div>
    </section>
  );
};

export default Login;
