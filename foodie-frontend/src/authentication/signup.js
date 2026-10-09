import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../components/actions/userActions";
import { toast } from "react-toastify";
import validator from "validator";

const Signup = ({ setAuthMode, authMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.error("Please fill all fields.");
    }

    if (name.trim().length < 2 || name.trim().length > 10) {
      return toast.error("Name must be between 2 and 10 characters.");
    }

    if (!validator.isEmail(email.trim())) {
      return toast.error("Please enter a valid email");
    }

    if (!email.trim().toLowerCase().endsWith("@gmail.com")) {
      return toast.error("Please use a Gmail address.");
    }

    if (password.length < 3 || password.length > 10) {
      return toast.error("Password must be between 3 and 10 characters.");
    }

    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };
    setIsSubmitting(true);
    try {
      const result = await dispatch(registerUser(user)); // thunk is handling API and toast notifications

      if (result.success) {
        setAuthMode("login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center py-6">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <section>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              required
              maxLength={10}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </section>
          <section>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="username"
              maxLength={254}
            />
          </section>
          <section>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                value={password}
                required
                minLength={3}
                maxLength={10}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="px-3 text-sm text-blue-800"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                aria-pressed={isPasswordVisible}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-800 text-white py-2 rounded-md transition duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                  aria-hidden="true"
                />
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-800 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            disabled={isSubmitting}
            className="text-blue-800 underline"
            onClick={() =>
              setAuthMode(authMode === "signup" ? "login" : "signup")
            }
          >
            Login
          </button>
        </p>
      </section>
    </section>
  );
};

export default Signup;
