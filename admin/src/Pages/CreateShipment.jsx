import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Package,
  MapPin,
  Save,
} from "lucide-react";

const CreateShipment = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    origin: "",
    destination: "",
    weight: "",
    weightUnit: "kg",
    transportType: "road",
    estimatedDelivery: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    if (!token) {
      toast.error("Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const shipmentData = {
        sender: formData.sender,
        receiver: formData.receiver,
        origin: formData.origin,
        destination: formData.destination,

        weight: Number(formData.weight),
        weightUnit: formData.weightUnit,

        transportType: formData.transportType,

        estimatedDelivery:
          formData.estimatedDelivery,

        description: formData.description,
      };

      const response = await axios.post(
        "http://localhost:8000/api/shipments",
        shipmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `Shipment created! Tracking number: ${response.data.shipment.trackingNumber}`
      );

      setTimeout(() => {
        navigate("/shipments");
      }, 1200);
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
            "Failed to create shipment"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() => navigate("/shipments")}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Create Shipment
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Add a new shipment to CargoPulse
              </p>
            </div>

          </div>

        </div>

      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">

        <form onSubmit={handleSubmit}>

          {/* Shipment Information */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
                <Package size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Shipment Information
                </h2>

                <p className="text-sm text-gray-500">
                  Enter the shipment details
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Sender */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender
                </label>

                <input
                  type="text"
                  name="sender"
                  value={formData.sender}
                  onChange={handleChange}
                  placeholder="Enter sender name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />

              </div>

              {/* Receiver */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver
                </label>

                <input
                  type="text"
                  name="receiver"
                  value={formData.receiver}
                  onChange={handleChange}
                  placeholder="Enter receiver name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />

              </div>

              {/* Origin */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origin
                </label>

                <div className="relative">

                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    placeholder="e.g. Lagos, Nigeria"
                    required
                    className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />

                </div>

                <p className="text-xs text-gray-400 mt-1">
                  Enter a city, state, country or specific location.
                </p>

              </div>

              {/* Destination */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>

                <div className="relative">

                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. London, United Kingdom"
                    required
                    className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />

                </div>

                <p className="text-xs text-gray-400 mt-1">
                  Coordinates will be generated automatically.
                </p>

              </div>

              {/* Weight */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>

                <div className="flex">

                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter weight"
                    min="0"
                    step="any"
                    required
                    className="w-full border border-gray-300 rounded-l-lg px-4 py-3 outline-none focus:border-orange-500"
                  />

                  <select
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleChange}
                    className="border border-l-0 border-gray-300 rounded-r-lg px-3 py-3 bg-gray-50 outline-none focus:border-orange-500"
                  >

                    <option value="kg">
                      KG
                    </option>

                    <option value="g">
                      G
                    </option>

                    <option value="ton">
                      Ton
                    </option>

                    <option value="lb">
                      LB
                    </option>

                  </select>

                </div>

              </div>

              {/* Transport */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transport Type
                </label>

                <select
                  name="transportType"
                  value={formData.transportType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
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

              {/* Estimated Delivery */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Delivery
                </label>

                <input
                  type="date"
                  name="estimatedDelivery"
                  value={formData.estimatedDelivery}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />

              </div>

            </div>

          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipment Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the shipment..."
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={() => navigate("/shipments")}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-white transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {loading ? (
                "Creating Shipment..."
              ) : (
                <>
                  <Save size={19} />
                  Create Shipment
                </>
              )}

            </button>

          </div>

        </form>

      </main>

    </div>
  );
};

export default CreateShipment;