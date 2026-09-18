import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  LogOut,
  Plus,
  ArrowRight,
  MapPin,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  const token = localStorage.getItem("adminToken");

  /*
    Load shipments

    We keep the async operation inside the effect
    so React does not complain about synchronous
    state updates inside useEffect.
  */
  useEffect(() => {
    let cancelled = false;

    const loadShipments = async () => {
      try {
        const response = await axios.get(
          "https://cargopulse.onrender.com/api/shipments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!cancelled) {
          setShipments(response.data.shipments || []);
        }
      } catch (error) {
        if (cancelled) return;

        console.error(error);

        if (error.response?.status === 401) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");

          toast.error(
            "Session expired. Please login again."
          );

          navigate("/login");
        } else {
          toast.error(
            error.response?.data?.message ||
              "Failed to load shipments"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadShipments();

    return () => {
      cancelled = true;
    };
  }, [navigate, token]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 700);
  };

  // Shipment statistics
  const totalShipments = shipments.length;

  const inTransit = shipments.filter(
    (shipment) =>
      shipment.status === "In Transit"
  ).length;

  const delivered = shipments.filter(
    (shipment) =>
      shipment.status === "Delivered"
  ).length;

  const pending = shipments.filter(
    (shipment) =>
      shipment.status === "Pending" ||
      shipment.status === "Picked Up"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}

      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white hidden lg:flex flex-col">

        {/* Logo */}
        <div className="px-6 py-7 border-b border-slate-800">

          <h1 className="text-2xl font-bold">
            Cargo
            <span className="text-orange-500">
              Pulse
            </span>
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            Administration Portal
          </p>

        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">

          {/* Dashboard */}
          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500 text-white"
          >
            <Package size={20} />

            <span className="font-medium">
              Dashboard
            </span>
          </button>

          {/* Shipments */}
          <button
            onClick={() =>
              navigate("/shipments")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white mt-2 transition"
          >
            <Truck size={20} />

            <span>
              Shipments
            </span>
          </button>

        </nav>

        {/* Admin */}
        <div className="p-4 border-t border-slate-800">

          <div className="flex items-center gap-3 mb-4 px-2">

            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">

              {admin.name
                ? admin.name
                    .charAt(0)
                    .toUpperCase()
                : "A"}

            </div>

            <div className="min-w-0">

              <p className="font-medium truncate">
                {admin.name || "Admin"}
              </p>

              <p className="text-xs text-slate-400 truncate">
                {admin.email || ""}
              </p>

            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut size={19} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="lg:ml-64">

        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-5 sm:px-8 py-5">

          <div className="flex items-center justify-between gap-4">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Dashboard
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Welcome back,{" "}
                {admin.name || "Admin"}.
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/shipments/create")
              }
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg font-medium transition"
            >
              <Plus size={19} />

              <span className="hidden sm:inline">
                Create Shipment
              </span>
            </button>

          </div>

        </header>

        {/* Content */}
        <div className="p-5 sm:p-8">

          {/* ================= STATISTICS ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* Total */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Total Shipments
                  </p>

                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {loading
                      ? "..."
                      : totalShipments}
                  </h3>

                </div>

                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                  <Package size={24} />
                </div>

              </div>

            </div>

            {/* In Transit */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    In Transit
                  </p>

                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {loading
                      ? "..."
                      : inTransit}
                  </h3>

                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Truck size={24} />
                </div>

              </div>

            </div>

            {/* Delivered */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Delivered
                  </p>

                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {loading
                      ? "..."
                      : delivered}
                  </h3>

                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>

              </div>

            </div>

            {/* Pending */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Pending
                  </p>

                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {loading
                      ? "..."
                      : pending}
                  </h3>

                </div>

                <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <Clock size={24} />
                </div>

              </div>

            </div>

          </div>

          {/* ================= RECENT SHIPMENTS ================= */}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8">

            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-gray-100">

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  Recent Shipments
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Latest shipments created in CargoPulse
                </p>

              </div>

              <button
                onClick={() =>
                  navigate("/shipment") 
                }
                className="flex items-center gap-1 text-orange-500 font-medium text-sm hover:text-orange-600"
              >
                View all

                <ArrowRight size={17} />

              </button>

            </div>

            {/* Loading */}
            {loading ? (

              <div className="py-16 text-center text-gray-500">
                Loading shipments...
              </div>

            ) : shipments.length === 0 ? (

              /* No Shipments */
              <div className="py-16 text-center">

                <Package
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <p className="text-gray-500 mt-3">
                  No shipments yet.
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/shipments/create"
                    )
                  }
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Create your first shipment
                </button>

              </div>

            ) : (

              /* Shipment Table */
              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="text-left text-xs uppercase text-gray-500 bg-gray-50">

                      <th className="px-5 sm:px-6 py-4">
                        Tracking Number
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Sender
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Destination
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Status
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Progress
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {shipments
                      .slice(0, 5)
                      .map((shipment) => (

                        <tr
                          key={shipment._id}
                          className="border-t border-gray-100 hover:bg-gray-50 transition"
                        >

                          {/* Tracking */}
                          <td className="px-5 sm:px-6 py-4">

                            <p className="font-semibold text-slate-900">
                              {shipment.trackingNumber}
                            </p>

                          </td>

                          {/* Sender */}
                          <td className="px-5 sm:px-6 py-4">

                            <p className="text-sm text-gray-700">
                              {shipment.sender}
                            </p>

                          </td>

                          {/* Destination */}
                          <td className="px-5 sm:px-6 py-4">

                            <div className="flex items-center gap-2 text-sm text-gray-700">

                              <MapPin
                                size={15}
                                className="text-orange-500"
                              />

                              {shipment.destination}

                            </div>

                          </td>

                          {/* Status */}
                          <td className="px-5 sm:px-6 py-4">

                            <span
                              className={`
                                inline-flex
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                ${
                                  shipment.status ===
                                  "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : shipment.status ===
                                      "In Transit"
                                    ? "bg-blue-100 text-blue-700"
                                    : shipment.status ===
                                        "Pending" ||
                                      shipment.status ===
                                        "Picked Up"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                                }
                              `}
                            >
                              {shipment.status}
                            </span>

                          </td>

                          {/* Progress */}
                          <td className="px-5 sm:px-6 py-4">

                            <div className="flex items-center gap-3 min-w-33">

                              <div className="flex-1 bg-gray-200 rounded-full h-2">

                                <div
                                  className="bg-orange-500 h-2 rounded-full"
                                  style={{
                                    width: `${shipment.progress || 0}%`,
                                  }}
                                />

                              </div>

                              <span className="text-xs font-semibold text-gray-600">
                                {shipment.progress || 0}%
                              </span>

                            </div>

                          </td>

                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;