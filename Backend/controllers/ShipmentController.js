import Shipment from "../models/ShipmentModel.js";
import crypto from "crypto";

// ======================================================
// GENERATE AUTOMATIC TRACKING NUMBER
// ======================================================

const generateTrackingNumber = async () => {
  let trackingNumber;
  let exists = true;

  while (exists) {
    const randomNumber = crypto.randomInt(
      1000000000,
      10000000000
    );

    trackingNumber = `CP-${randomNumber}`;

    exists = await Shipment.exists({
      trackingNumber,
    });
  }

  return trackingNumber;
};

// ======================================================
// GEOCODE LOCATION
// ======================================================

const geocodeLocation = async (location) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      location
    )}`,
    {
      headers: {
        "User-Agent": "CargoPulse Logistics Website",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Geocoding service failed");
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error(`Could not find location: ${location}`);
  }

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
  };
};

// ======================================================
// REVERSE GEOCODE
// ======================================================

const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          "User-Agent": "CargoPulse Logistics Website",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Reverse geocoding failed");
    }

    const data = await response.json();

    if (!data || !data.address) {
      return "";
    }

    const address = data.address;

    return (
      address.city ||
      address.town ||
      address.municipality ||
      address.village ||
      address.county ||
      address.state ||
      data.display_name ||
      ""
    );
  } catch (error) {
    console.error(
      "Reverse geocoding error:",
      error.message
    );

    return "";
  }
};

// ======================================================
// GET LAND / ROAD ROUTE
// ======================================================

const getLandRouteCoordinates = async (
  originCoordinates,
  destinationCoordinates
) => {
  const originLng = originCoordinates.lng;
  const originLat = originCoordinates.lat;

  const destinationLng = destinationCoordinates.lng;
  const destinationLat = destinationCoordinates.lat;

  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${originLng},${originLat};` +
    `${destinationLng},${destinationLat}` +
    `?overview=full&geometries=geojson`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Road routing service failed");
  }

  const data = await response.json();

  if (
    data.code !== "Ok" ||
    !data.routes ||
    !data.routes.length
  ) {
    throw new Error(
      "Could not calculate road route"
    );
  }

  const coordinates =
    data.routes[0].geometry.coordinates;

  return coordinates.map(([lng, lat]) => ({
    lat: Number(lat),
    lng: Number(lng),
  }));
};

// ======================================================
// GET AIR ROUTE
// ======================================================

const getAirRouteCoordinates = (
  originCoordinates,
  destinationCoordinates
) => {
  const points = [];

  const steps = 40;

  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;

    const lat =
      originCoordinates.lat +
      (destinationCoordinates.lat -
        originCoordinates.lat) *
        progress;

    const lng =
      originCoordinates.lng +
      (destinationCoordinates.lng -
        originCoordinates.lng) *
        progress;

    points.push({
      lat,
      lng,
    });
  }

  return points;
};

// ======================================================
// GET SEA ROUTE
// ======================================================

const getSeaRouteCoordinates = (
  originCoordinates,
  destinationCoordinates
) => {
  const originLat = originCoordinates.lat;
  const originLng = originCoordinates.lng;

  const destinationLat = destinationCoordinates.lat;
  const destinationLng = destinationCoordinates.lng;

  /*
    We create an ocean-oriented route using
    intermediate waypoints.

    This prevents the ship from simply following
    a road route between the two locations.
  */

  const middleLat =
    (originLat + destinationLat) / 2;

  const middleLng =
    (originLng + destinationLng) / 2;

  const oceanOffset = 8;

  const waypoint1 = {
    lat: middleLat + oceanOffset,
    lng: middleLng,
  };

  const waypoint2 = {
    lat: middleLat,
    lng: middleLng + oceanOffset,
  };

  const points = [];

  const waypoints = [
    originCoordinates,
    waypoint1,
    waypoint2,
    destinationCoordinates,
  ];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = waypoints[i];
    const end = waypoints[i + 1];

    const steps = 15;

    for (let j = 0; j < steps; j++) {
      const progress = j / steps;

      points.push({
        lat:
          start.lat +
          (end.lat - start.lat) *
            progress,

        lng:
          start.lng +
          (end.lng - start.lng) *
            progress,
      });
    }
  }

  points.push(destinationCoordinates);

  return points;
};

// ======================================================
// GET ROUTE BASED ON TRANSPORT TYPE
// ======================================================

const getRouteCoordinates = async (
  originCoordinates,
  destinationCoordinates,
  transportType
) => {
  /*
    LAND
    ----
    Use OSRM because vehicles travel on roads.
  */

  if (transportType === "land") {
    return await getLandRouteCoordinates(
      originCoordinates,
      destinationCoordinates
    );
  }

  /*
    AIR
    ---
    Aircraft don't follow roads.
  */

  if (transportType === "air") {
    return getAirRouteCoordinates(
      originCoordinates,
      destinationCoordinates
    );
  }

  /*
    SEA
    ---
    Ships don't follow road routes.
  */

  if (transportType === "sea") {
    return getSeaRouteCoordinates(
      originCoordinates,
      destinationCoordinates
    );
  }

  /*
    Fallback
  */

  return [
    originCoordinates,
    destinationCoordinates,
  ];
};

// ======================================================
// GET POSITION ALONG ROUTE
// ======================================================

const getPositionAlongRoute = (
  routeCoordinates,
  progress
) => {
  if (
    !routeCoordinates ||
    routeCoordinates.length === 0
  ) {
    return null;
  }

  /*
    0%
    ---
    ALWAYS return the origin.
  */

  if (Number(progress) <= 0) {
    return routeCoordinates[0];
  }

  /*
    100%
    ----
    ALWAYS return destination.
  */

  if (Number(progress) >= 100) {
    return routeCoordinates[
      routeCoordinates.length - 1
    ];
  }

  if (routeCoordinates.length === 1) {
    return routeCoordinates[0];
  }

  const normalizedProgress = Math.max(
    0,
    Math.min(100, Number(progress))
  );

  const position =
    (normalizedProgress / 100) *
    (routeCoordinates.length - 1);

  const lowerIndex = Math.floor(position);

  const upperIndex = Math.min(
    lowerIndex + 1,
    routeCoordinates.length - 1
  );

  const fraction =
    position - lowerIndex;

  const start =
    routeCoordinates[lowerIndex];

  const end =
    routeCoordinates[upperIndex];

  return {
    lat:
      start.lat +
      (end.lat - start.lat) *
        fraction,

    lng:
      start.lng +
      (end.lng - start.lng) *
        fraction,
  };
};

// ======================================================
// CREATE SHIPMENT
// ======================================================

export const createShipment = async (
  req,
  res
) => {
  try {
    const {
      sender,
      receiver,
      origin,
      destination,
      weight,
      weightUnit,
      transportType,
      estimatedDelivery,
      description,
    } = req.body;

    // ==================================================
    // BASIC VALIDATION
    // ==================================================

    if (
      !sender ||
      !receiver ||
      !origin ||
      !destination ||
      weight === undefined ||
      !transportType ||
      !estimatedDelivery
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Sender, receiver, origin, destination, weight, transport type and estimated delivery are required",
      });
    }

    // ==================================================
    // GEOCODE ORIGIN
    // ==================================================

    const originCoordinates =
      await geocodeLocation(origin);

    // ==================================================
    // GEOCODE DESTINATION
    // ==================================================

    const destinationCoordinates =
      await geocodeLocation(destination);

    // ==================================================
    // GET ROUTE BASED ON TRANSPORT
    // ==================================================

    let routeCoordinates = [];

    try {
      routeCoordinates =
        await getRouteCoordinates(
          originCoordinates,
          destinationCoordinates,
          transportType
        );
    } catch (routeError) {
      console.error(
        "Route calculation error:",
        routeError.message
      );

      routeCoordinates = [
        originCoordinates,
        destinationCoordinates,
      ];
    }

    // ==================================================
    // GENERATE TRACKING NUMBER
    // ==================================================

    const trackingNumber =
      await generateTrackingNumber();

    // ==================================================
    // CREATE SHIPMENT
    // ==================================================

    const shipment =
      await Shipment.create({
        trackingNumber,

        sender,

        receiver,

        origin,

        destination,

        weight,

        weightUnit,

        originCoordinates,

        destinationCoordinates,

        routeCoordinates,

        /*
          Shipment starts EXACTLY at origin.
        */

        currentCoordinates: {
          lat: originCoordinates.lat,
          lng: originCoordinates.lng,
        },

        transportType,

        status: "Pending",

        progress: 0,

        estimatedDelivery,

        /*
          Current location starts as origin.
        */

        currentLocation: origin,

        description,
      });

    // ==================================================
    // RESPONSE
    // ==================================================

    res.status(201).json({
      success: true,
      message: "Shipment created successfully",
      shipment,
    });
  } catch (error) {
    console.error(
      "Create shipment error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create shipment",
    });
  }
};

// ======================================================
// GET ALL SHIPMENTS
// ======================================================

export const getShipments = async (
  req,
  res
) => {
  try {
    const shipments =
      await Shipment.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: shipments.length,
      shipments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get shipments",
      error: error.message,
    });
  }
};

// ======================================================
// GET SHIPMENT BY ID
// ======================================================

export const getShipmentById = async (
  req,
  res
) => {
  try {
    const shipment =
      await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      shipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get shipment",
      error: error.message,
    });
  }
};

// ======================================================
// GET SHIPMENT BY TRACKING NUMBER
// ======================================================

export const getShipmentByTrackingNumber =
  async (req, res) => {
    try {
      const shipment =
        await Shipment.findOne({
          trackingNumber:
            req.params.trackingNumber,
        });

      if (!shipment) {
        return res.status(404).json({
          success: false,
          message: "Tracking number not found",
        });
      }

      res.status(200).json({
        success: true,
        shipment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to find shipment",
        error: error.message,
      });
    }
  };

// ======================================================
// UPDATE SHIPMENT
// ======================================================

export const updateShipment = async (
  req,
  res
) => {
  try {
    const shipment =
      await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    // ==================================================
    // APPLY SUBMITTED CHANGES
    // ==================================================

    Object.assign(
      shipment,
      req.body
    );

    // ==================================================
    // KEEP PROGRESS BETWEEN 0 AND 100
    // ==================================================

    const progress = Math.max(
      0,
      Math.min(
        100,
        Number(shipment.progress) || 0
      )
    );

    shipment.progress = progress;

    // ==================================================
    // MAKE SURE ROUTE EXISTS
    // ==================================================

    let routeCoordinates =
      shipment.routeCoordinates || [];

    /*
      Generate the correct type of route.

      This is important for older shipments that
      were created using the old road-only system.
    */

    if (
      routeCoordinates.length < 2 ||
      req.body.transportType ||
      req.body.origin ||
      req.body.destination
    ) {
      try {
        routeCoordinates =
          await getRouteCoordinates(
            shipment.originCoordinates,
            shipment.destinationCoordinates,
            shipment.transportType
          );

        shipment.routeCoordinates =
          routeCoordinates;
      } catch (routeError) {
        console.error(
          "Route generation during update failed:",
          routeError.message
        );

        routeCoordinates = [
          shipment.originCoordinates,
          shipment.destinationCoordinates,
        ];

        shipment.routeCoordinates =
          routeCoordinates;
      }
    }

    // ==================================================
    // CALCULATE CURRENT POSITION
    // ==================================================

    const currentPosition =
      getPositionAlongRoute(
        routeCoordinates,
        progress
      );

    // ==================================================
    // UPDATE CURRENT COORDINATES
    // ==================================================

    if (currentPosition) {
      shipment.currentCoordinates =
        currentPosition;
    }

    // ==================================================
    // AUTOMATIC STATUS
    // ==================================================

    if (progress === 0) {
      shipment.status = "Pending";
    } else if (progress < 100) {
      shipment.status = "In Transit";
    } else {
      shipment.status = "Delivered";
    }

    // ==================================================
    // CURRENT LOCATION
    // ==================================================

    /*
      At 0%, don't reverse-geocode.

      We already know exactly where the shipment is:
      the origin.
    */

    if (progress === 0) {
      shipment.currentLocation =
        shipment.origin;
    }

    /*
      At 100%, don't reverse-geocode.

      We already know exactly where the shipment is:
      the destination.
    */

    else if (progress === 100) {
      shipment.currentLocation =
        shipment.destination;
    }

    /*
      During transit, reverse-geocode the SAME
      coordinates used by the vehicle marker.
    */

    else if (currentPosition) {
      const currentLocation =
        await reverseGeocode(
          currentPosition.lat,
          currentPosition.lng
        );

      if (currentLocation) {
        shipment.currentLocation =
          currentLocation;
      }
    }

    // ==================================================
    // SAVE
    // ==================================================

    await shipment.save();

    // ==================================================
    // RESPONSE
    // ==================================================

    res.status(200).json({
      success: true,
      message:
        "Shipment updated successfully",
      shipment,
    });
  } catch (error) {
    console.error(
      "Update shipment error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update shipment",
    });
  }
};

// ======================================================
// DELETE SHIPMENT
// ======================================================

export const deleteShipment = async (
  req,
  res
) => {
  try {
    const shipment =
      await Shipment.findByIdAndDelete(
        req.params.id
      );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Shipment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to delete shipment",
      error: error.message,
    });
  }
};