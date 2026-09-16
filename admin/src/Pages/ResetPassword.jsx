import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();

  // Get the temporary reset information
  const email = sessionStorage.getItem("resetEmail");
  const code = sessionStorage.getItem("resetCode");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Check if the reset session exists
  useEffect(() => {
    if (!email || !code) {
      toast.error("Your password reset session is invalid.");

      navigate("/forgot-password");
    }
  }, [email, code, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password length
    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:8000/api/auth/reset-password",
        {
          email,
          code,
          password,
        }
      );

      // Clear temporary reset information
      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("resetCode");

      toast.success(
        response.data.message ||
          "Password reset successfully!"
      );

      // Send user back to login
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Cargo
            <span className="text-orange-500">
              Pulse
            </span>
          </h1>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            Create New Password
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Enter your new admin password below.
          </p>

        </div>

        {/* Reset Password Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* New Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Minimum 6 characters"
              minLength={6}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm your password"
              minLength={6}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Resetting password..."
              : "Reset Password"}
          </button>

        </form>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-500 mt-6">

          Remember your password?{" "}

          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Back to Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default ResetPassword;