// 


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
      address.country ||
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
// LAND / ROAD ROUTE
// ======================================================
// IMPORTANT:
// This is your original OSRM road routing.
// We are keeping it for land shipments.
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
    throw new Error("Routing service failed");
  }

  const data = await response.json();

  if (
    data.code !== "Ok" ||
    !data.routes ||
    !data.routes.length
  ) {
    throw new Error(
      "Could not calculate route between the selected locations"
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
// CREATE CURVED AIR ROUTE
// ======================================================

const getAirRouteCoordinates = (
  originCoordinates,
  destinationCoordinates
) => {
  const points = [];

  const steps = 60;

  const latDifference =
    destinationCoordinates.lat -
    originCoordinates.lat;

  const lngDifference =
    destinationCoordinates.lng -
    originCoordinates.lng;

  const distance = Math.sqrt(
    latDifference * latDifference +
      lngDifference * lngDifference
  );

  /*
    Curve strength changes slightly depending
    on distance.

    This makes the aircraft route look more
    natural than a perfectly straight line.
  */

  const curve =
    Math.min(15, Math.max(4, distance * 0.12));

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    const baseLat =
      originCoordinates.lat +
      latDifference * t;

    const baseLng =
      originCoordinates.lng +
      lngDifference * t;

    const curveAmount =
      Math.sin(Math.PI * t) * curve;

    /*
      Offset perpendicular to the route.
    */

    const curvedLat =
      baseLat -
      (lngDifference / Math.max(distance, 1)) *
        curveAmount;

    const curvedLng =
      baseLng +
      (latDifference / Math.max(distance, 1)) *
        curveAmount;

    points.push({
      lat: curvedLat,
      lng: curvedLng,
    });
  }

  /*
    Guarantee exact endpoints.
  */

  points[0] = {
    lat: originCoordinates.lat,
    lng: originCoordinates.lng,
  };

  points[points.length - 1] = {
    lat: destinationCoordinates.lat,
    lng: destinationCoordinates.lng,
  };

  return points;
};

// ======================================================
// CREATE SEA ROUTE
// ======================================================

const getSeaRouteCoordinates = (
  originCoordinates,
  destinationCoordinates
) => {
  const points = [];

  const steps = 80;

  const latDifference =
    destinationCoordinates.lat -
    originCoordinates.lat;

  const lngDifference =
    destinationCoordinates.lng -
    originCoordinates.lng;

  const distance = Math.sqrt(
    latDifference * latDifference +
      lngDifference * lngDifference
  );

  /*
    A larger curve for sea routes makes the
    route look like a shipping route instead
    of a road.
  */

  const curve =
    Math.min(25, Math.max(6, distance * 0.18));

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    const baseLat =
      originCoordinates.lat +
      latDifference * t;

    const baseLng =
      originCoordinates.lng +
      lngDifference * t;

    const curveAmount =
      Math.sin(Math.PI * t) * curve;

    const curvedLat =
      baseLat -
      (lngDifference / Math.max(distance, 1)) *
        curveAmount;

    const curvedLng =
      baseLng +
      (latDifference / Math.max(distance, 1)) *
        curveAmount;

    points.push({
      lat: curvedLat,
      lng: curvedLng,
    });
  }

  /*
    Guarantee exact endpoints.
  */

  points[0] = {
    lat: originCoordinates.lat,
    lng: originCoordinates.lng,
  };

  points[points.length - 1] = {
    lat: destinationCoordinates.lat,
    lng: destinationCoordinates.lng,
  };

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
    Keep actual road routing.
  */

  if (
    transportType === "land" ||
    transportType === "road"
  ) {
    return await getLandRouteCoordinates(
      originCoordinates,
      destinationCoordinates
    );
  }

  /*
    AIR
    ---
    Don't use road routing.
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
    Don't use road routing.
  */

  if (transportType === "sea") {
    return getSeaRouteCoordinates(
      originCoordinates,
      destinationCoordinates
    );
  }

  /*
    Fallback.
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
    IMPORTANT:
    0% must ALWAYS be the first coordinate.
  */

  if (Number(progress) <= 0) {
    return routeCoordinates[0];
  }

  /*
    IMPORTANT:
    100% must ALWAYS be the final coordinate.
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
    Math.min(100, Number(progress) || 0)
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
    // GET ROUTE
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

      /*
        Fallback only.
      */

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
          ALWAYS start exactly at origin.
        */

        currentCoordinates: {
          lat: originCoordinates.lat,
          lng: originCoordinates.lng,
        },

        transportType,

        status: "Pending",

        progress: 0,

        estimatedDelivery,

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
    // ROUTE
    // ==================================================

    let routeCoordinates =
      shipment.routeCoordinates || [];

    /*
      We only regenerate the route when necessary.

      This prevents every ordinary progress update
      from unnecessarily rebuilding the route.
    */

    const transportChanged =
      req.body.transportType !== undefined;

    const originChanged =
      req.body.origin !== undefined;

    const destinationChanged =
      req.body.destination !== undefined;

    if (
      routeCoordinates.length < 2 ||
      transportChanged ||
      originChanged ||
      destinationChanged
    ) {
      try {
        /*
          If origin/destination text was changed,
          geocode the new locations first.
        */

        if (originChanged) {
          shipment.originCoordinates =
            await geocodeLocation(
              shipment.origin
            );
        }

        if (destinationChanged) {
          shipment.destinationCoordinates =
            await geocodeLocation(
              shipment.destination
            );
        }

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
      shipment.currentCoordinates = {
        lat: currentPosition.lat,
        lng: currentPosition.lng,
      };
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
      PENDING
      -------
      Never reverse-geocode.

      We KNOW the shipment is at its origin.
    */

    if (progress === 0) {
      shipment.currentLocation =
        shipment.origin;
    }

    /*
      DELIVERED
      ---------
      Never reverse-geocode.

      We KNOW the shipment is at its destination.
    */

    else if (progress === 100) {
      shipment.currentLocation =
        shipment.destination;
    }

    /*
      LAND
      ----
      Reverse-geocode the SAME coordinates
      used by the vehicle marker.

      This keeps the location and marker synchronized.
    */

    else if (
      shipment.transportType === "land" ||
      shipment.transportType === "road"
    ) {
      if (currentPosition) {
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
    }

    /*
      SEA
      ---
      A reverse-geocoder can return a nearby
      country even when the ship is actually
      offshore.

      So we DON'T pretend the ship is in that
      country.

      The coordinates on the map remain the
      real source of position.
    */

    else if (
      shipment.transportType === "sea"
    ) {
      shipment.currentLocation =
        "At Sea";
    }

    /*
      AIR
      ---
      Aircraft are not physically inside the
      country returned by reverse geocoding
      while crossing international airspace.
    */

    else if (
      shipment.transportType === "air"
    ) {
      shipment.currentLocation =
        "In Flight";
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