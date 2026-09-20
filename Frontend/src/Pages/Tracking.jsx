import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Search,
  Package,
  MapPin,
  Truck,
  Calendar,
  User,
  ArrowRight,
} from "lucide-react";

import TrackingMap from "../Components/TrackingMap";

const API_URL = "https://cargopulse.onrender.com/api/shipments";

const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const intervalRef = useRef(null);

  const fetchShipment = async (
    number,
    showLoading = false
  ) => {
    if (!number) return;

    if (showLoading) {
      setLoading(true);
    }

    try {
      const response = await axios.get(
        `${API_URL}/track/${encodeURIComponent(number)}`
      );

      setShipment(response.data.shipment);
      setError("");
      setLastUpdated(new Date());
    } catch (err) {
      if (showLoading) {
        setShipment(null);
        setError(
          err.response?.data?.message ||
            "Shipment not found. Please check your tracking number."
        );
      }
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const handleTrack = async (e) => {
    e.preventDefault();

    const number = trackingNumber.trim();

    if (!number) {
      setError("Please enter a tracking number.");
      setShipment(null);
      return;
    }

    setError("");

    await fetchShipment(number, true);
  };

  useEffect(() => {
    if (!shipment?.trackingNumber) {
      return undefined;
    }

    intervalRef.current = setInterval(() => {
      fetchShipment(shipment.trackingNumber);
    }, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [shipment?.trackingNumber]);

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    "Picked Up": "bg-blue-100 text-blue-700",
    "In Transit": "bg-orange-100 text-orange-700",
    Arrived: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="bg-slate-900 text-white">

        <div className="max-w-6xl mx-auto px-6 py-20 text-center">

          <div className="flex justify-center mb-5">

            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
              <Package size={32} />
            </div>

          </div>


          <h1 className="text-4xl md:text-5xl font-bold">
            Track Your Shipment
          </h1>


          <p className="text-slate-300 max-w-2xl mx-auto mt-4">
            Enter your CargoPulse tracking number to see the
            current status and location of your shipment.
          </p>

          <p className="text-slate-300 max-w-2xl mx-auto mt-4">use this tracking number for tasting<span className="font-bold text-2xl text-orange-500">CP-1354444886</span></p>


          {/* SEARCH */}

          <form
            onSubmit={handleTrack}
            className="max-w-2xl mx-auto mt-8"
          >

            <div className="bg-white rounded-xl p-2 flex flex-col sm:flex-row gap-2">

              <input
                type="text"
                value={trackingNumber}
                onChange={(e) =>
                  setTrackingNumber(e.target.value)
                }
                placeholder="Enter tracking number"
                className="flex-1 px-4 py-4 text-slate-900 outline-none rounded-lg"
              />


              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold px-7 py-4 rounded-lg flex items-center justify-center gap-2 transition"
              >

                <Search size={19} />

                {loading
                  ? "Tracking..."
                  : "Track Shipment"}

              </button>

            </div>

          </form>


          {error && (
            <p className="text-red-300 mt-4">
              {error}
            </p>
          )}

        </div>

      </section>


      {/* RESULTS */}

      {shipment && (

        <main className="max-w-6xl mx-auto px-6 py-10">

          {/* TRACKING HEADER */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <p className="text-sm text-gray-500">
                  Tracking Number
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {shipment.trackingNumber}
                </h2>

              </div>


              <div className="flex flex-col items-start md:items-end gap-2">

                <span
                  className={`px-5 py-2 rounded-full text-sm font-semibold ${
                    statusStyles[shipment.status] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {shipment.status}
                </span>


                {lastUpdated && (
                  <p className="text-xs text-gray-400">
                    Last updated{" "}
                    {lastUpdated.toLocaleTimeString()}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* PROGRESS */}

          <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">

            <div className="flex justify-between items-center mb-3">

              <h3 className="font-bold text-slate-900">
                Shipment Progress
              </h3>

              <span className="font-bold text-orange-500">
                {shipment.progress}%
              </span>

            </div>


            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">

              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-700"
                style={{
                  width: `${shipment.progress}%`,
                }}
              />

            </div>


            <div className="flex justify-between text-xs text-gray-400 mt-2">

              <span>Origin</span>

              <span>In Transit</span>

              <span>Destination</span>

            </div>

          </section>


          {/* MAP */}

          <section className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

              <div>

                <h3 className="text-xl font-bold text-slate-900">
                  Shipment Location
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Current position of your shipment
                </p>

              </div>


              <div className="flex items-center gap-2 text-sm text-gray-500">

                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />

                Live tracking

              </div>

            </div>


            {shipment.originCoordinates &&
            shipment.destinationCoordinates ? (

              <div className="h-113 rounded-xl overflow-hidden">

                <TrackingMap
                  shipment={shipment}
                />

              </div>

            ) : (

              <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">

                <p className="text-gray-500">
                  Tracking map is unavailable for this shipment.
                </p>

              </div>

            )}

          </section>


          {/* INFORMATION */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ROUTE */}

            <section className="bg-white border border-gray-200 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">

                  <MapPin size={20} />

                </div>


                <h3 className="font-bold text-slate-900">
                  Shipment Route
                </h3>

              </div>


              <div className="space-y-5">

                <div>

                  <p className="text-sm text-gray-500">
                    Origin
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {shipment.origin}
                  </p>

                </div>


                <div className="flex items-center gap-3 text-orange-500">

                  <div className="h-px bg-gray-200 flex-1" />

                  <ArrowRight size={18} />

                  <div className="h-px bg-gray-200 flex-1" />

                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    Destination
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {shipment.destination}
                  </p>

                </div>

              </div>

            </section>


            {/* DELIVERY */}

            <section className="bg-white border border-gray-200 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">

                  <Calendar size={20} />

                </div>


                <h3 className="font-bold text-slate-900">
                  Delivery Information
                </h3>

              </div>


              <div className="space-y-5">

                <div>

                  <p className="text-sm text-gray-500">
                    Estimated Delivery
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {new Date(
                      shipment.estimatedDelivery
                    ).toLocaleString()}
                  </p>

                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    Current Location
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <MapPin
                      size={17}
                      className="text-orange-500"
                    />

                    <p className="font-semibold text-slate-900">
                      {shipment.currentLocation ||
                        "Location updating"}
                    </p>

                  </div>

                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    Transport
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <Truck
                      size={17}
                      className="text-orange-500"
                    />

                    <p className="font-semibold text-slate-900 capitalize">
                      {shipment.transportType}
                    </p>

                  </div>

                </div>

              </div>

            </section>


            {/* SENDER / RECEIVER */}

            <section className="bg-white border border-gray-200 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">

                  <User size={20} />

                </div>


                <h3 className="font-bold text-slate-900">
                  Shipment Parties
                </h3>

              </div>


              <div className="space-y-5">

                <div>

                  <p className="text-sm text-gray-500">
                    Sender
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {shipment.sender}
                  </p>

                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    Receiver
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {shipment.receiver}
                  </p>

                </div>

              </div>

            </section>


            {/* CARGO */}

            <section className="bg-white border border-gray-200 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">

                  <Truck size={20} />

                </div>


                <h3 className="font-bold text-slate-900">
                  Cargo Details
                </h3>

              </div>


              <div className="space-y-5">

                <div>

                  <p className="text-sm text-gray-500">
                    Weight
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {shipment.weight}{" "}
                    {shipment.weightUnit}
                  </p>

                </div>


                {shipment.description && (

                  <div>

                    <p className="text-sm text-gray-500">
                      Description
                    </p>

                    <p className="text-gray-700 mt-1">
                      {shipment.description}
                    </p>

                  </div>

                )}

              </div>

            </section>

          </div>

        </main>

      )}

    </div>
  );
};

export default TrackShipment;