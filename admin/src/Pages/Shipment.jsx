import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Package,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  ArrowLeft,
  LogOut,
} from "lucide-react";

const Shipments = () => {
  const navigate = useNavigate();

  const [shipments, setShipments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("adminToken");

  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  // Fetch shipments
  useEffect(() => {
    let cancelled = false;

    const loadShipments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/shipments",
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

    if (!token) {
      navigate("/login");
      return;
    }

    loadShipments();

    return () => {
      cancelled = true;
    };
  }, [navigate, token]);

  // Delete shipment
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shipment?"
    );

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await axios.delete(
        `http://localhost:8000/api/shipments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShipments((previousShipments) =>
        previousShipments.filter(
          (shipment) => shipment._id !== id
        )
      );

      toast.success(
        "Shipment deleted successfully"
      );
    } catch (error) {
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
            "Failed to delete shipment"
        );
      }
    } finally {
      setDeletingId(null);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 700);
  };

  // Search
  const filteredShipments = shipments.filter(
    (shipment) => {
      const searchValue =
        search.toLowerCase().trim();

      return (
        shipment.trackingNumber
          ?.toLowerCase()
          .includes(searchValue) ||
        shipment.sender
          ?.toLowerCase()
          .includes(searchValue) ||
        shipment.receiver
          ?.toLowerCase()
          .includes(searchValue) ||
        shipment.origin
          ?.toLowerCase()
          .includes(searchValue) ||
        shipment.destination
          ?.toLowerCase()
          .includes(searchValue)
      );
    }
  );

  // Status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "In Transit":
        return "bg-blue-100 text-blue-700";

      case "Picked Up":
        return "bg-purple-100 text-purple-700";

      case "Arrived":
        return "bg-indigo-100 text-indigo-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition"
          >
            <Package size={20} />

            <span>
              Dashboard
            </span>
          </button>

          <button
            onClick={() =>
              navigate("/shipments")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500 text-white mt-2"
          >
            <Package size={20} />

            <span className="font-medium">
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

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-5 sm:px-8 py-5">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  navigate("/dashboard")
                }
                className="lg:hidden w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                <ArrowLeft size={19} />
              </button>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Shipments
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Manage all CargoPulse shipments
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                navigate("/shipments/create")
              }
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg font-medium transition"
            >
              <Plus size={19} />

              Create Shipment
            </button>

          </div>

        </header>

        {/* Content */}
        <div className="p-5 sm:p-8">

          {/* Search */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">

            <div className="relative max-w-xl">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search tracking number, sender, receiver, origin..."
                className="w-full border border-gray-200 rounded-lg pl-11 pr-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />

            </div>

          </div>

          {/* Shipment table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="px-5 sm:px-6 py-5 border-b border-gray-100">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-bold text-slate-900">
                    All Shipments
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {filteredShipments.length} shipment
                    {filteredShipments.length !== 1
                      ? "s"
                      : ""}
                  </p>

                </div>

              </div>

            </div>

            {/* Loading */}
            {loading ? (

              <div className="py-20 text-center text-gray-500">
                Loading shipments...
              </div>

            ) : filteredShipments.length === 0 ? (

              <div className="py-20 text-center">

                <Package
                  size={45}
                  className="mx-auto text-gray-300"
                />

                <h3 className="font-semibold text-gray-700 mt-4">
                  {search
                    ? "No shipments found"
                    : "No shipments yet"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {search
                    ? "Try a different search."
                    : "Create your first shipment to get started."}
                </p>

                {!search && (
                  <button
                    onClick={() =>
                      navigate(
                        "/shipments/create"
                      )
                    }
                    className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium"
                  >
                    Create Shipment
                  </button>
                )}

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-gray-50 text-left text-xs uppercase text-gray-500">

                      <th className="px-5 sm:px-6 py-4">
                        Tracking
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Sender
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Receiver
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Route
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Transport
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Status
                      </th>

                      <th className="px-5 sm:px-6 py-4">
                        Progress
                      </th>

                      <th className="px-5 sm:px-6 py-4 text-right">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredShipments.map(
                      (shipment) => (

                        <tr
                          key={shipment._id}
                          className="border-t border-gray-100 hover:bg-gray-50 transition"
                        >

                          {/* Tracking */}
                          <td className="px-5 sm:px-6 py-4">

                            <p className="font-semibold text-slate-900 whitespace-nowrap">
                              {shipment.trackingNumber}
                            </p>

                          </td>

                          {/* Sender */}
                          <td className="px-5 sm:px-6 py-4">

                            <p className="text-sm text-gray-700 whitespace-nowrap">
                              {shipment.sender}
                            </p>

                          </td>

                          {/* Receiver */}
                          <td className="px-5 sm:px-6 py-4">

                            <p className="text-sm text-gray-700 whitespace-nowrap">
                              {shipment.receiver}
                            </p>

                          </td>

                          {/* Route */}
                          <td className="px-5 sm:px-6 py-4">

                            <div className="text-sm min-w-45">

                              <p className="text-gray-700">
                                {shipment.origin}
                              </p>

                              <p className="text-gray-400 my-1">
                                ↓
                              </p>

                              <p className="text-gray-700">
                                {shipment.destination}
                              </p>

                            </div>

                          </td>

                          {/* Transport */}
                          <td className="px-5 sm:px-6 py-4">

                            <span className="capitalize text-sm text-gray-700">
                              {shipment.transportType}
                            </span>

                          </td>

                          {/* Status */}
                          <td className="px-5 sm:px-6 py-4">

                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                                shipment.status
                              )}`}
                            >
                              {shipment.status}
                            </span>

                          </td>

                          {/* Progress */}
                          <td className="px-5 sm:px-6 py-4">

                            <div className="flex items-center gap-2 min-w-28">

                              <div className="w-20 bg-gray-200 rounded-full h-2">

                                <div
                                  className="bg-orange-500 h-2 rounded-full"
                                  style={{
                                    width: `${shipment.progress || 0}%`,
                                  }}
                                />

                              </div>

                              <span className="text-xs font-semibold text-gray-600">
                                {shipment.progress ||
                                  0}
                                %
                              </span>

                            </div>

                          </td>

                          {/* Actions */}
                          <td className="px-5 sm:px-6 py-4">

                            <div className="flex items-center justify-end gap-2">

                              {/* View */}
                              <button
                                onClick={() =>
                                  navigate(
                                    `/shipments/${shipment._id}`
                                  )
                                }
                                title="View shipment"
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                              >
                                <Eye size={17} />
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() =>
                                  navigate(
                                    `/shipments/${shipment._id}/edit`
                                  )
                                }
                                title="Edit shipment"
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                              >
                                <Pencil size={17} />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() =>
                                  handleDelete(
                                    shipment._id
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  shipment._id
                                }
                                title="Delete shipment"
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                              >
                                <Trash2 size={17} />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

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

export default Shipments;