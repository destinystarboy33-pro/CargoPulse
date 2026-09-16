import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      unique: true,
      trim: true,
    },

    sender: {
      type: String,
      required: true,
      trim: true,
    },

    receiver: {
      type: String,
      required: true,
      trim: true,
    },

    origin: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    weightUnit: {
      type: String,
      enum: ["kg", "g", "ton", "lb"],
      default: "kg",
    },

    originCoordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    destinationCoordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    // NEW:
    // Stores the actual route between origin and destination.
    routeCoordinates: [
      {
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
      },
    ],

    currentCoordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    transportType: {
      type: String,
      enum: ["air", "sea", "road"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Picked Up",
        "In Transit",
        "Arrived",
        "Delivered",
      ],
      default: "Pending",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    estimatedDelivery: {
      type: Date,
      required: true,
    },

    currentLocation: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shipment = mongoose.model(
  "Shipment",
  shipmentSchema
);

export default Shipment;