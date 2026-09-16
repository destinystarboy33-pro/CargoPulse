import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/forgot-password",
        {
          email,
        }
      );

      // Keep the email temporarily for the next step
      sessionStorage.setItem(
        "resetEmail",
        email
      );

      toast.success(
        response.data.message ||
          "Verification code sent!"
      );

      setTimeout(() => {
        navigate("/verify-code");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send verification code"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Cargo
            <span className="text-orange-500">
              Pulse
            </span>
          </h1>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            Forgot Password?
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Enter your admin email and we'll send you
            a verification code.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="admin@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Sending code..."
              : "Send Verification Code"}
          </button>

        </form>

        {/* Back */}
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

export default ForgotPassword;