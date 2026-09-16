import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyCode = () => {
  const navigate = useNavigate();

  // Get email directly from sessionStorage
  const email = sessionStorage.getItem("resetEmail");

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Check if email exists
  useEffect(() => {
    if (!email) {
      toast.error(
        "Please request a password reset first."
      );

      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Verify code
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      toast.error(
        "Please enter the 6-digit verification code."
      );
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8000/api/auth/verify-reset-code",
        {
          email,
          code,
        }
      );

      // Save code temporarily
      sessionStorage.setItem(
        "resetCode",
        code
      );

      toast.success(
        "Verification successful!"
      );

      // Go to reset password
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid verification code"
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend verification code
  const handleResend = async () => {
    if (!email) {
      toast.error("Email not found.");
      return;
    }

    setResending(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/forgot-password",
        {
          email,
        }
      );

      // Remove old code because a new one was generated
      sessionStorage.removeItem("resetCode");

      toast.success(
        response.data.message ||
          "A new verification code has been sent."
      );

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to resend verification code"
      );
    } finally {
      setResending(false);
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
            Verify Your Email
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Enter the 6-digit verification code
            sent to
          </p>

          <p className="text-gray-800 font-medium mt-1 break-all">
            {email}
          </p>

        </div>

        {/* Verification Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => {
                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                setCode(value);
              }}
              placeholder="000000"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-2xl tracking-[0.5em] font-semibold outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />

          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Verifying..."
              : "Verify Code"}
          </button>

        </form>

        {/* Resend Code */}
        <div className="text-center mt-6">

          <p className="text-sm text-gray-500">
            Didn't receive the code?
          </p>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-orange-500 font-semibold text-sm mt-1 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resending
              ? "Sending..."
              : "Resend Code"}
          </button>

        </div>

        {/* Change Email */}
        <p className="text-center text-sm text-gray-500 mt-5">

          <Link
            to="/forgot-password"
            className="text-orange-500 font-semibold hover:underline"
          >
            Change email
          </Link>

        </p>

      </div>

    </div>
  );
};

export default VerifyCode;