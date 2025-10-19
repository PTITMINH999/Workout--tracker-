import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setFormError("");

    try {
      const data = await login(form.username, form.password);
      // ✅ LUÔN redirect vào /dashboard
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message;
      const newErrors = {};
      switch (message) {
        case "User not found":
          newErrors.username = message;
          break;
        case "Your password is incorrect":
          newErrors.password = message;
          break;
        default:
          setFormError(message || "Login failed, try again");
      }
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>
        {formError && (
          <p className="text-red-500 text-center mb-4">{formError}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            }`}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
          >
            {showPassword ? "🙈" : "👁"}
          </span>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
