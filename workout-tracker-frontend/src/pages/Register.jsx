import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register, login } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password =
        "Password must be at least 8 chars, include uppercase, lowercase, number, special char";
    if (form.confirm !== form.password)
      newErrors.confirm = "Passwords do not match";
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
      const data = await register(form.username, form.email, form.password);
      await login(form.username, form.password);
      navigate("/dashboard"); // ✅ redirect chung
    } catch (err) {
      const message = err.response?.data?.message;
      const newErrors = {};
      switch (message) {
        case "User existed":
          newErrors.username = message;
          break;
        case "Email already existed":
          newErrors.email = message;
          break;
        case "PASSWORD_INVALID":
          newErrors.password =
            "Password must be at least 8 chars, include uppercase, lowercase, number, special char";
          break;
        default:
          setFormError(message || "Register failed, try again");
      }
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Register
        </h2>
        {formError && (
          <p className="text-red-500 text-center mb-4">{formError}</p>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-green-400"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-green-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-3 relative">
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
                : "focus:ring-green-400"
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

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            name="confirm"
            type={showConfirm ? "text" : "password"}
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${
              errors.confirm
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-green-400"
            }`}
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
          >
            {showConfirm ? "🙈" : "👁"}
          </span>
          {errors.confirm && (
            <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
