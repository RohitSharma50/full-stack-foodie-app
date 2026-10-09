import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { googleLogin, loginUser } from "../components/actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ setAuthMode, authMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from?.pathname || "/";

  useEffect(() => {
    try {
      const user = localStorage.getItem("currentUser");
      if (user && user !== "undefined") {
        const userData = JSON.parse(user);
        if (userData?.email) navigate(returnTo, { replace: true });
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
    }
  }, [navigate, returnTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await dispatch(
        loginUser({ email: email.trim().toLowerCase(), password }),
      );
      if (result.success) {
        navigate(returnTo, { replace: true });
      } else {
        setError(result.message || "Login failed. Check your credentials and try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setError(
        "Google sign-in did not provide a credential. Please try again.",
      );
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const result = await dispatch(googleLogin(credentialResponse.credential));
      if (result.success) {
        navigate(returnTo, { replace: true });
      } else {
        setError(result.message);
      }
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            <div className="flex border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type={isPasswordVisible ? "text" : "password"}
                required
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="px-3 text-sm text-blue-800"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                aria-pressed={isPasswordVisible}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </section>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-800 text-white py-2 rounded-md transition duration-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                  aria-hidden="true"
                />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-sm text-center text-gray-800 mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            disabled={isSubmitting}
            className="text-blue-800 underline"
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
          >
            Sign up
          </button>
        </p>
        {isSubmitting && (
          <p className="mt-3 text-center text-sm" role="status">
            Signing in...
          </p>
        )}
        <div
          className={isSubmitting ? "pointer-events-none opacity-60" : ""}
          aria-disabled={isSubmitting}
        >
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              setError("Google sign-in was cancelled or failed. Please retry.");
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
