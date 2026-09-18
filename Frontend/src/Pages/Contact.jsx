import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  X,
} from "lucide-react";
import ContactImage from "../assets/ContactImage.jpg";
import Reveal from "../Components/Reveal";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "https://cargopulse.onrender.com/api/contact",
        formData
      );

      if (response.data.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Contact form error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-8 text-center shadow-2xl">

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={22} />
            </button>

            {/* ICON */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                <CheckCircle size={38} />
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-slate-900">
              Message Received!
            </h2>

            {/* MESSAGE */}
            <p className="text-gray-600 mt-4 leading-7">
              Thank you for contacting CargoPulse. We've received your
              information and our team will get back to you as soon as
              possible.
            </p>

            {/* BUTTON */}
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mt-7 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition"
            >
              Okay
            </button>

          </div>
        </div>
      )}

      {/* HERO */}
      <Reveal>
        <section className="relative h-88 flex items-center justify-center overflow-hidden">
          <img
            src={ContactImage}
            alt="CargoPulse contact"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 text-center text-white px-6">
            <p className="text-orange-500 font-semibold uppercase tracking-widest mb-3">
              Contact Us
            </p>

            <h1 className="text-4xl md:text-5xl font-bold">
              Get In Touch With Us
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-gray-200">
              Have a question about your shipment or our logistics services?
              Our team is ready to assist you.
            </p>
          </div>
        </section>
      </Reveal>

      {/* CONTACT SECTION */}
      <Reveal>
        <section className="py-20 px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* LEFT INFORMATION */}
              <div>

                <p className="text-orange-500 font-semibold uppercase tracking-wider mb-3">
                  Contact Information
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Let's Talk About Your Shipment
                </h2>

                <p className="text-gray-600 mt-5 leading-7">
                  Whether you need information about our transportation
                  services, shipment tracking, or logistics solutions,
                  we're here to help.
                </p>

                <div className="mt-10 space-y-7">

                  {/* ADDRESS */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                      <MapPin size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Our Location
                      </h3>

                      <p className="text-gray-600 mt-1">
                        Guangdong, China
                      </p>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                      <Phone size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Phone
                      </h3>

                      <p className="text-gray-600 mt-1">
                        +234 800 000 0000
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                      <Mail size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Email
                      </h3>

                      <div className="text-gray-600 mt-1">
                        <ul>
                          <li className="flex gap-3">
                            <span className="text-gray-400">
                              <a href="mailto:cargopulsefrieght@gmail.com?subject=Customer%20support">
                                CargoPulse@gmail.com
                              </a>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* HOURS */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                      <Clock size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Working Hours
                      </h3>

                      <p className="text-gray-600 mt-1">
                        Monday - Friday: 8:00 AM - 5:00 PM
                        <span>
                          {" "}
                          Saturday and Sunday: 12:00 PM - 5:00 PM
                        </span>
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* FORM */}
              <div className="lg:col-span-2">

                <div className="bg-gray-50 p-6 md:p-10 rounded-xl border border-gray-100">

                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Send Us A Message
                    </h2>

                    <p className="text-gray-600 mt-2">
                      Fill out the form below and our team will get back to you.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >

                    {/* NAME + EMAIL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-slate-800 mb-2"
                        >
                          Full Name
                        </label>

                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-orange-500 transition"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-800 mb-2"
                        >
                          Email Address
                        </label>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-orange-500 transition"
                        />
                      </div>

                    </div>

                    {/* PHONE + SUBJECT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-slate-800 mb-2"
                        >
                          Phone Number
                        </label>

                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-orange-500 transition"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-slate-800 mb-2"
                        >
                          Subject
                        </label>

                        <input
                          id="subject"
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this about?"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-orange-500 transition"
                        />
                      </div>

                    </div>

                    {/* MESSAGE */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-800 mb-2"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        rows="6"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-orange-500 transition resize-none"
                      ></textarea>
                    </div>

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold px-7 py-3 rounded-md transition"
                    >
                      {loading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </button>

                  </form>
                </div>

              </div>

            </div>
          </div>
        </section>
      </Reveal>

      {/* MAP */}
      <Reveal>
        <section className="px-6 md:px-10 lg:px-20 pb-20">
          <div className="max-w-7xl mx-auto">

            <div className="mb-6">
              <p className="text-orange-500 font-semibold uppercase tracking-wider">
                Find Us
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                Our Location
              </h2>
            </div>

            <div className="w-full h-100 rounded-xl overflow-hidden">
              <iframe
                title="CargoPulse Location"
                src="https://www.google.com/maps?q=Guangdong,China&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </section>
      </Reveal>

    </main>
  );
};

export default Contact;