import { NavLink } from "react-router-dom";
import {FaWhatsapp, FaEnvelope, FaPhone, } from "react-icons/fa"
import {FaLocationDot} from "react-icons/fa6"


const Footer = () => {
  return (
    <footer className="bg-[#14243A] text-white">

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ================= BRAND ================= */}
          <div>

            <NavLink
              to="/"
              className="inline-flex items-center gap-3 mb-5"
            >

              <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="font-bold text-lg">
                  CP
                </span>
              </div>

              <div className="leading-tight">
                <h2 className="text-xl font-bold">
                  CargoPulse
                </h2>

                <p className="text-[9px] text-gray-400 tracking-[0.25em]">
                  LOGISTICS
                </p>
              </div>

            </NavLink>

            <p className="text-gray-400 text-sm leading-7 max-w-xs">
              Reliable logistics solutions designed to move your goods
              safely, efficiently, and on time.
            </p>

          </div>


          {/* ================= QUICK LINKS ================= */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/tracking"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Track Shipment
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Contact
                </NavLink>
              </li>


               <li>
                <NavLink
                  to="/pricing"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Pricing
                </NavLink>
              </li>

            </ul>

          </div>


          {/* ================= SERVICES ================= */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Our Services
            </h3>

            <ul className="space-y-3">

              <li className="text-gray-400">
                Inland Transportation
              </li>

              <li className="text-gray-400">
                Domestic Rail
              </li>

              <li className="text-gray-400">
                Cold Chain
              </li>

              <li className="text-gray-400">
                Warehouse Management
              </li>

              <li className="text-gray-400">
                Cross Border Transportation
              </li>

              <li className="text-gray-400">
                Domestic Sea
              </li>

            </ul>

          </div>


          {/* ================= CONTACT ================= */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">

              <li className="flex gap-3">
                <span className="text-red-600"><FaLocationDot size={18} /></span>

                <span className="text-gray-400">
                  Guangdong, China
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-green-600"><FaPhone size={18} /></span>

                <span className="text-gray-400">
                  +234 800 000 0000
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-white">< FaEnvelope size={18} /> {
                   
                }</span>
                

                <span className="text-gray-400">
                  <a href="mailto:cargopulsefrieght@gmail.com?subject=Customer%20support">CargoPulse@gmail.com</a>
                </span>
              </li>

            </ul>


            {/* Social Media */}
            <div className="flex gap-3 mt-6">

              <a
                href="https://wa.me/2349075137529"
                className="w-9 h-9 rounded-full text-green-600 bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <FaWhatsapp size={24} />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
              >
                X
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
              >
                in
              </a>

              {/* <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
              >
                ◎
              </a> */}

            </div>

          </div>

        </div>

      </div>


      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-white/10">

        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-gray-500 text-sm">
            © 2026 CargoPulse. All rights reserved.
          </p>

          <div className="flex gap-5 text-sm">

            <a
              href="#"
              className="text-gray-500 hover:text-orange-500 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-orange-500 transition"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;