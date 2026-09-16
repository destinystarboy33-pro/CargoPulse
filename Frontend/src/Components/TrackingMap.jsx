import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Vehicle icon
const createVehicleIcon = (transportType) => {
  let emoji = "🚚";

  if (transportType === "air") {
    emoji = "✈️";
  }

  if (transportType === "sea") {
    emoji = "🚢";
  }

  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          font-size: 28px;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 50%;
          border: 2px solid #f97316;
          box-shadow: 0 3px 10px rgba(0,0,0,0.25);
        "
      >
        ${emoji}
      </div>
    `,
    iconSize: [45, 45],
    iconAnchor: [22, 22],
  });
};

// Automatically fit map to the shipment route
const MapController = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (!route || route.length < 2) {
      return;
    }

    const bounds = L.latLngBounds(
      route.map((point) => [point.lat, point.lng])
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
    });
  }, [map, route]);

  return null;
};

// Find the vehicle position based on shipment progress
const getVehiclePosition = (route, progress) => {
  if (!route || route.length === 0) {
    return null;
  }

  if (route.length === 1) {
    return route[0];
  }

  const safeProgress = Math.max(
    0,
    Math.min(100, Number(progress) || 0)
  );

  const position =
    (safeProgress / 100) * (route.length - 1);

  const lowerIndex = Math.floor(position);

  const upperIndex = Math.min(
    lowerIndex + 1,
    route.length - 1
  );

  const fraction = position - lowerIndex;

  const start = route[lowerIndex];
  const end = route[upperIndex];

  return {
    lat:
      start.lat +
      (end.lat - start.lat) * fraction,

    lng:
      start.lng +
      (end.lng - start.lng) * fraction,
  };
};

const TrackingMap = ({ shipment }) => {
  const data = shipment?.shipment || shipment;

  // No shipment data
  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">
          Loading shipment...
        </p>
      </div>
    );
  }

  // Get route
  const route =
    Array.isArray(data.routeCoordinates)
      ? data.routeCoordinates.filter(
          (point) =>
            point &&
            typeof point.lat === "number" &&
            typeof point.lng === "number"
        )
      : [];

  // Get vehicle position
  const vehiclePosition = getVehiclePosition(
    route,
    data.progress
  );

  // Get origin and destination
  const origin = data.originCoordinates;
  const destination = data.destinationCoordinates;

  // No route
  if (route.length < 2) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">
          Route information is unavailable.
        </p>
      </div>
    );
  }

  // No vehicle position
  if (!vehiclePosition) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">
          Shipment position is unavailable.
        </p>
      </div>
    );
  }

  const vehicleIcon = createVehicleIcon(
    data.transportType
  );

  let transportName = "Road Freight";

  if (data.transportType === "air") {
    transportName = "Air Freight";
  }

  if (data.transportType === "sea") {
    transportName = "Sea Freight";
  }

  return (
    <MapContainer
      center={[
        vehiclePosition.lat,
        vehiclePosition.lng,
      ]}
      zoom={10}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController route={route} />

      {/* Shipment route */}
      <Polyline
        positions={route.map((point) => [
          point.lat,
          point.lng,
        ])}
        pathOptions={{
          color: "#f97316",
          weight: 5,
        }}
      />

      {/* Origin */}
      {origin && (
        <Marker
          position={[
            origin.lat,
            origin.lng,
          ]}
        >
          <Popup>
            <strong>Origin</strong>
            <br />
            {data.origin}
          </Popup>
        </Marker>
      )}

      {/* Destination */}
      {destination && (
        <Marker
          position={[
            destination.lat,
            destination.lng,
          ]}
        >
          <Popup>
            <strong>Destination</strong>
            <br />
            {data.destination}
          </Popup>
        </Marker>
      )}

      {/* Moving vehicle */}
      <Marker
        position={[
          vehiclePosition.lat,
          vehiclePosition.lng,
        ]}
        icon={vehicleIcon}
      >
        <Popup>
          <strong>{transportName}</strong>
          <br />
          Progress: {Number(data.progress) || 0}%
          <br />
          Current Location:{" "}
          {data.currentLocation || "In transit"}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default TrackingMap;