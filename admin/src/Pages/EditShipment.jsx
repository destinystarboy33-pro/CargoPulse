import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Save,
  Package,
  MapPin,
  User,
  Weight,
  Truck,
  Calendar,
  FileText,
} from "lucide-react";

const EditShipment = () => {
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
          `https://cargopulse.onrender.com/api/shipments/${id}`,
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
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

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

  return (
    <EditShipmentForm
      shipment={shipment}
      token={token}
      navigate={navigate}
    />
  );
};


const EditShipmentForm = ({
  shipment,
  token,
  navigate,
}) => {
  const [formData, setFormData] = useState({
    sender: shipment.sender || "",
    receiver: shipment.receiver || "",
    origin: shipment.origin || "",
    destination: shipment.destination || "",
    weight: shipment.weight ?? "",
    weightUnit: shipment.weightUnit || "kg",
    transportType: shipment.transportType || "road",
    estimatedDelivery: shipment.estimatedDelivery
      ? new Date(shipment.estimatedDelivery)
          .toISOString()
          .slice(0, 16)
      : "",
    currentLocation: shipment.currentLocation || "",
    description: shipment.description || "",
    progress: shipment.progress ?? 0,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProgressChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      progress: Number(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sender.trim()) {
      toast.error("Sender is required");
      return;
    }

    if (!formData.receiver.trim()) {
      toast.error("Receiver is required");
      return;
    }

    if (!formData.origin.trim()) {
      toast.error("Origin is required");
      return;
    }

    if (!formData.destination.trim()) {
      toast.error("Destination is required");
      return;
    }

    if (
      formData.weight === "" ||
      Number(formData.weight) < 0
    ) {
      toast.error("Enter a valid weight");
      return;
    }

    if (!formData.estimatedDelivery) {
      toast.error("Estimated delivery date is required");
      return;
    }

    setSaving(true);

    try {
      const shipmentData = {
        sender: formData.sender,
        receiver: formData.receiver,
        origin: formData.origin,
        destination: formData.destination,
        weight: Number(formData.weight),
        weightUnit: formData.weightUnit,
        transportType: formData.transportType,
        estimatedDelivery: formData.estimatedDelivery,
        currentLocation: formData.currentLocation,
        description: formData.description,
        progress: Number(formData.progress),
      };

      const response = await axios.put(
        `https://cargopulse.onrender.com/api/shipments/${shipment._id}`,
        shipmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response.data.message ||
          "Shipment updated successfully!"
      );

      setTimeout(() => {
        navigate(`/shipments/${shipment._id}`);
      }, 1000);
    } catch (error) {
      console.error("Update shipment error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update shipment"
      );
    } finally {
      setSaving(false);
    }
  };

  const getProgressStatus = () => {
    const progress = Number(formData.progress);

    if (progress === 0) {
      return "Pending";
    }

    if (progress < 100) {
      return "In Transit";
    }

    return "Delivered";
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">

          <button
            onClick={() => navigate("/shipments")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition mb-4"
          >
            <ArrowLeft size={18} />

            Back to Shipments
          </button>

          <div className="flex items-center justify-between gap-4">

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Edit Shipment
              </h1>

              <p className="text-gray-500 mt-1">
                Update shipment information and tracking progress.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg">
              <Package size={18} />

              <span className="font-semibold">
                {shipment.trackingNumber}
              </span>
            </div>

          </div>

        </div>
      </header>


      {/* FORM */}

      <main className="max-w-7xl mx-auto px-6 py-8">

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT */}

            <div className="lg:col-span-2 space-y-6">

              {/* PEOPLE */}

              <section className="bg-white rounded-xl border border-gray-200 p-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                    <User size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Shipment Parties
                    </h2>

                    <p className="text-sm text-gray-500">
                      Sender and receiver information
                    </p>
                  </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sender
                    </label>

                    <input
                      type="text"
                      name="sender"
                      value={formData.sender}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                      placeholder="Sender name"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Receiver
                    </label>

                    <input
                      type="text"
                      name="receiver"
                      value={formData.receiver}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                      placeholder="Receiver name"
                    />
                  </div>

                </div>

              </section>


              {/* ROUTE */}

              <section className="bg-white rounded-xl border border-gray-200 p-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Shipment Route
                    </h2>

                    <p className="text-sm text-gray-500">
                      Origin and destination
                    </p>
                  </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origin
                    </label>

                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                      placeholder="e.g. Lagos, Nigeria"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>

                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                      placeholder="e.g. London, UK"
                    />
                  </div>

                </div>

              </section>


              {/* CARGO */}

              <section className="bg-white rounded-xl border border-gray-200 p-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                    <Weight size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Cargo Information
                    </h2>

                    <p className="text-sm text-gray-500">
                      Weight and transportation details
                    </p>
                  </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight
                    </label>

                    <input
                      type="number"
                      name="weight"
                      min="0"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit
                    </label>

                    <select
                      name="weightUnit"
                      value={formData.weightUnit}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 bg-white"
                    >
                      <option value="kg">Kilograms (kg)</option>
                      <option value="g">Grams (g)</option>
                      <option value="ton">Ton</option>
                      <option value="lb">Pounds (lb)</option>
                    </select>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transport Type
                    </label>

                    <select
                      name="transportType"
                      value={formData.transportType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 bg-white"
                    >
                      <option value="road">
                        Road
                      </option>

                      <option value="air">
                        Air
                      </option>

                      <option value="sea">
                        Sea
                      </option>
                    </select>
                  </div>

                </div>

              </section>


              {/* DELIVERY */}

              <section className="bg-white rounded-xl border border-gray-200 p-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                    <Calendar size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Delivery Information
                    </h2>

                    <p className="text-sm text-gray-500">
                      Delivery date and current location
                    </p>
                  </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Delivery
                    </label>

                    <input
                      type="datetime-local"
                      name="estimatedDelivery"
                      value={formData.estimatedDelivery}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Location
                    </label>

                    <input
                      type="text"
                      name="currentLocation"
                      value={formData.currentLocation}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                      placeholder="e.g. Abuja, Nigeria"
                    />
                  </div>

                </div>

              </section>


              {/* DESCRIPTION */}

              <section className="bg-white rounded-xl border border-gray-200 p-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Description
                    </h2>

                    <p className="text-sm text-gray-500">
                      Additional shipment information
                    </p>
                  </div>

                </div>


                <textarea
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 resize-none"
                  placeholder="Enter shipment description..."
                />

              </section>

            </div>


            {/* RIGHT */}

            <div className="space-y-6">

              {/* PROGRESS */}

              <section className="bg-white rounded-xl border border-gray-200 p-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                    <Truck size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Tracking Progress
                    </h2>

                    <p className="text-sm text-gray-500">
                      Move the shipment
                    </p>
                  </div>

                </div>


                <div className="text-center mb-6">

                  <div className="text-5xl font-bold text-orange-500">
                    {formData.progress}%
                  </div>

                  <p className="text-gray-500 mt-2">
                    {getProgressStatus()}
                  </p>

                </div>


                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  name="progress"
                  value={formData.progress}
                  onChange={handleProgressChange}
                  className="w-full accent-orange-500 cursor-pointer"
                />


                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>


                <div className="mt-6 bg-orange-50 rounded-lg p-4">

                  <p className="text-sm text-orange-700 leading-relaxed">
                    Changing the progress automatically updates
                    the shipment's tracking position and status.
                  </p>

                </div>

              </section>


              {/* TRACKING NUMBER */}

              <section className="bg-slate-900 rounded-xl p-6 text-white">

                <p className="text-slate-400 text-sm mb-2">
                  Tracking Number
                </p>

                <h3 className="text-2xl font-bold break-all">
                  {shipment.trackingNumber}
                </h3>

              </section>


              {/* SAVE */}

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Save size={19} />

                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate(`/shipments/${shipment._id}`)
                }
                className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </form>

      </main>

    </div>
  );
};

export default EditShipment;