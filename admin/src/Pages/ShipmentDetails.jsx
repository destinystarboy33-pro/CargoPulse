import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Edit,
  Package,
  MapPin,
  User,
  Weight,
  Truck,
  Calendar,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";

import TrackingMap from "../components/TrackingMap";

const ShipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchShipment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/shipments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!cancelled) {
          setShipment(response.data.shipment);
        }
      } catch (error) {
        if (cancelled) return;

        toast.error(
          error.response?.data?.message ||
            "Failed to load shipment"
        );

        navigate("/shipments");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (!token) {
      navigate("/login");
      return;
    }

    fetchShipment();

    return () => {
      cancelled = true;
    };
  }, [id, navigate, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-500">
            Loading shipment...
          </p>
        </div>
      </div>
    );
  }

  if (!shipment) {
    return null;
  }

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    "Picked Up": "bg-blue-100 text-blue-700",
    "In Transit": "bg-orange-100 text-orange-700",
    Arrived: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">

          <button
            onClick={() => navigate("/shipments")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition mb-5"
          >
            <ArrowLeft size={18} />

            Back to Shipments
          </button>


          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <div className="flex items-center gap-3">

                <Package
                  size={28}
                  className="text-orange-500"
                />

                <h1 className="text-2xl font-bold text-slate-900">
                  Shipment Details
                </h1>

              </div>

              <p className="text-gray-500 mt-2">
                Tracking Number:{" "}
                <span className="font-semibold text-slate-700">
                  {shipment.trackingNumber}
                </span>
              </p>

            </div>


            <button
              onClick={() =>
                navigate(
                  `/shipments/${shipment._id}/edit`
                )
              }
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              <Edit size={18} />

              Edit Shipment
            </button>

          </div>

        </div>
      </header>


      {/* CONTENT */}

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* TOP INFORMATION */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* TRACKING */}

          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-sm text-gray-500">
                  Tracking Number
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {shipment.trackingNumber}
                </h2>

              </div>


              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  statusStyles[shipment.status] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {shipment.status}
              </span>

            </div>


            {/* PROGRESS */}

            <div>

              <div className="flex justify-between items-center mb-2">

                <span className="text-sm font-medium text-gray-600">
                  Delivery Progress
                </span>

                <span className="text-sm font-bold text-orange-500">
                  {shipment.progress}%
                </span>

              </div>


              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${shipment.progress}%`,
                  }}
                />

              </div>

            </div>

          </div>


          {/* DELIVERY */}

          <div className="bg-slate-900 rounded-xl p-6 text-white">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Calendar
                  size={20}
                  className="text-orange-400"
                />
              </div>

              <div>

                <p className="text-slate-400 text-sm">
                  Estimated Delivery
                </p>

                <p className="font-semibold mt-1">
                  {new Date(
                    shipment.estimatedDelivery
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>


            <div className="border-t border-slate-700 pt-5">

              <p className="text-slate-400 text-sm">
                Current Location
              </p>

              <div className="flex items-center gap-2 mt-2">

                <MapPin
                  size={17}
                  className="text-orange-400"
                />

                <p className="font-semibold">
                  {shipment.currentLocation ||
                    "Location not specified"}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* MAP */}

        <section className="bg-white border border-gray-200 rounded-xl p-5 mb-6">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Live Shipment Tracking
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Current shipment position between origin and
                destination
              </p>

            </div>


            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">

              <Truck
                size={17}
                className="text-orange-500"
              />

              {shipment.progress}% complete

            </div>

          </div>


          {shipment.originCoordinates &&
          shipment.destinationCoordinates ? (
            <div className="h-113 rounded-xl overflow-hidden">

              <TrackingMap shipment={shipment} />

            </div>
          ) : (
            <div className="h-75 rounded-xl bg-gray-50 flex items-center justify-center">

              <div className="text-center">

                <MapPin
                  size={35}
                  className="mx-auto text-gray-300 mb-3"
                />

                <p className="font-medium text-gray-500">
                  Map coordinates are not available
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  This shipment needs valid origin and
                  destination coordinates.
                </p>

              </div>

            </div>
          )}

        </section>


        {/* SHIPMENT INFORMATION */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PEOPLE */}

          <section className="bg-white border border-gray-200 rounded-xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <User size={20} />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Shipment Parties
              </h2>

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


          {/* ROUTE */}

          <section className="bg-white border border-gray-200 rounded-xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <MapPin size={20} />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Route
              </h2>

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


          {/* CARGO */}

          <section className="bg-white border border-gray-200 rounded-xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <Weight size={20} />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Cargo Information
              </h2>

            </div>


            <div className="grid grid-cols-2 gap-5">

              <div>

                <p className="text-sm text-gray-500">
                  Weight
                </p>

                <p className="font-semibold text-slate-900 mt-1">
                  {shipment.weight}{" "}
                  {shipment.weightUnit}
                </p>

              </div>


              <div>

                <p className="text-sm text-gray-500">
                  Transport
                </p>

                <p className="font-semibold text-slate-900 mt-1 capitalize">
                  {shipment.transportType}
                </p>

              </div>

            </div>

          </section>


          {/* DESCRIPTION */}

          <section className="bg-white border border-gray-200 rounded-xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <FileText size={20} />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Description
              </h2>

            </div>


            <p className="text-gray-600 leading-relaxed">

              {shipment.description ||
                "No description provided for this shipment."}

            </p>

          </section>

        </div>

      </main>

    </div>
  );
};

export default ShipmentDetails;