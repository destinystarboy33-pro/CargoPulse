import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Services",
      path: "/services",
    },
   
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <header className="w-full bg-white shadow-sm relative z-50">
      
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-3">

        <div className="flex items-center justify-between">

          {/* ================= LOGO ================= */}
          <NavLink to="/" className="flex items-center gap-2">
            
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white font-bold">
                CP
              </span>
            </div>

            <div className="leading-tight">
              <h1 className="text-xl font-bold text-gray-800">
                CargoPulse
              </h1>

              <p className="text-[9px] text-gray-500 tracking-widest">
                LOGISTICS
              </p>
            </div>

          </NavLink>


          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:flex items-center gap-7">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-orange-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

          </nav>


          {/* ================= DESKTOP BUTTON ================= */}
          <div className="hidden md:block">

            <NavLink
              to="/tracking"
              className="bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-800 transition"
            >
              Track Shipment
            </NavLink>

          </div>


          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 text-3xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">

            <nav className="flex flex-col gap-1 pt-4">

              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium ${
                      isActive
                        ? "bg-orange-50 text-orange-500"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}


              {/* Mobile Tracking Button */}
              <NavLink
                to="/tracking"
                onClick={() => setMenuOpen(false)}
                className="mt-3 mx-4 text-center bg-blue-700 text-white px-5 py-3 rounded-full text-sm font-medium"
              >
                Track Shipment
              </NavLink>

            </nav>

          </div>
        )}

      </div>
    </header>
  );
};

export default Header;