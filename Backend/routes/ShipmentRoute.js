import express from "express";

import {
  createShipment,
  getShipments,
  getShipmentById,
  getShipmentByTrackingNumber,
  updateShipment,
  deleteShipment,
} from "../controllers/ShipmentController.js";

import authMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();


// Create shipment
router.post("/", authMiddleware, createShipment);


// Get all shipments
router.get("/",authMiddleware, getShipments);


// Get shipment by tracking number
router.get("/track/:trackingNumber", getShipmentByTrackingNumber);


// Get shipment by ID
router.get("/:id", authMiddleware, getShipmentById);


// Update shipment
router.put("/:id", authMiddleware, updateShipment);


// Delete shipment
router.delete("/:id",authMiddleware, deleteShipment);


export default router;