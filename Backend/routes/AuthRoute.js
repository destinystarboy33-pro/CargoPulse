import express from "express";

import {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-code", verifyResetCode);

router.put("/reset-password", resetPassword);

export default router;