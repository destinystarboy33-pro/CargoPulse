import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Admin from "../models/AuthModel.js";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASSWORD exists:",
  !!process.env.EMAIL_PASSWORD
);


// ========================================
// EMAIL CONFIGURATION
// ========================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// ========================================
// REGISTER ADMIN
// ========================================

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to register admin",
    });
  }
};


// ========================================
// LOGIN ADMIN
// ========================================

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};


// ========================================
// FORGOT PASSWORD
// ========================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    // Don't reveal whether the email exists
    if (!admin) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a verification code will be sent.",
      });
    }

    // Generate a 6-digit code
    const resetCode = crypto.randomInt(100000, 1000000).toString();

    // Store code
    admin.resetPasswordCode = resetCode;

    // Code expires after 10 minutes
    admin.resetPasswordCodeExpires =
      Date.now() + 10 * 60 * 1000;

    await admin.save();

    // Send email
    await transporter.sendMail({
      from: `"CargoPulse" <${process.env.EMAIL_USER}>`,

      to: admin.email,

      subject: "CargoPulse Password Reset Code",

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">

          <h2 style="color: #f97316;">
            CargoPulse
          </h2>

          <p>Hello ${admin.name},</p>

          <p>
            We received a request to reset your CargoPulse admin password.
          </p>

          <p>
            Your verification code is:
          </p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            padding: 20px;
            background: #f5f5f5;
            text-align: center;
            margin: 20px 0;
          ">
            ${resetCode}
          </div>

          <p>
            This code will expire in <strong>10 minutes</strong>.
          </p>

          <p>
            If you did not request a password reset, you can ignore this email.
          </p>

          <p>
            — CargoPulse Team
          </p>

        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message:
        "Verification code sent to your email",
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send verification code",
    });
  }
};


// ========================================
// VERIFY RESET CODE
// ========================================

export const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    if (
      !admin.resetPasswordCode ||
      !admin.resetPasswordCodeExpires
    ) {
      return res.status(400).json({
        success: false,
        message: "No password reset request found",
      });
    }

    if (
      admin.resetPasswordCodeExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired",
      });
    }

    if (admin.resetPasswordCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    res.status(200).json({
      success: true,
      message: "Verification code is valid",
    });

  } catch (error) {
    console.error("Verify code error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to verify code",
    });
  }
};


// ========================================
// RESET PASSWORD
// ========================================

export const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email, verification code and new password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    if (
      !admin.resetPasswordCode ||
      !admin.resetPasswordCodeExpires
    ) {
      return res.status(400).json({
        success: false,
        message: "No password reset request found",
      });
    }

    if (
      admin.resetPasswordCodeExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired",
      });
    }

    if (admin.resetPasswordCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    admin.password = hashedPassword;

    // Remove reset code
    admin.resetPasswordCode = undefined;
    admin.resetPasswordCodeExpires = undefined;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};