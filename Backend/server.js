import "./config/env.js"
import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
import cors from "cors";
import shipmentRoutes from "./routes/ShipmentRoute.js";
import authRoutes from "./routes/AuthRoute.js"

// dotenv.config();

const app = express();

const alowedOrigin = ["http://localhost:5173", "http://localhost:5174", "https://cargo-pulse-gamma.vercel.app"]

// Middleware
app.use(cors({origin: alowedOrigin,}));
app.use(express.json());


// Routes
app.use("/api/shipments", shipmentRoutes);
app.use("/api/auth", authRoutes);


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "CargoPulse API is running ",
  });
});


// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ");

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed ");
    console.error(error.message);
  });