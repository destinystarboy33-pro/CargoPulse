import Banner from '../../assets/Banner.jpg'
import Truck from '../../assets/Truck.jpg'
import { NavLink } from 'react-router-dom';
import Reveal from '../../Components/Reveal';
const BookingSection = () => {
  return (
    
    <section className="w-full">
        <Reveal>

      {/* ================= TOP BLUE AREA ================= */}
      <div className="bg-[#eef7fc] py-16 md:py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <p className="text-orange-500 text-sm font-semibold mb-3">
                BOOKING
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-[#152238] leading-tight">
                Your Cargo,
                <br />
                Our Responsibility
              </h2>

              <p className="text-gray-500 mt-5 leading-7 max-w-lg">
                We provide safe, reliable and efficient transportation
                solutions for all your logistics needs.
              </p>

              <button className="mt-7 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-full transition">
                Book Now
              </button>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                />

                <input
                  type="tel"
                  placeholder="Mobile"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  placeholder="Destination"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                />

              </div>

              <textarea
                rows="4"
                placeholder="Description"
                className="w-full mt-5 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500 resize-none"
              ></textarea>

              <button
                type="button"
                className="w-full mt-5 bg-[#152238] hover:bg-orange-500 text-white py-3 rounded-lg transition"
              >
                Submit
              </button>

            </div>

          </div>

        </div>

      </div>
      </Reveal>

        <Reveal>
      {/* ================= BIG WHITE TRUCK ================= */}
      <div className='flex flex-col md:flex-row max-w-6xl mx-auto px-6 gap-12 py-16 md:py-20'>
          <div>
            
                <p className="text-orange-500 font-semibold mb-2">
                    SMART LOGISTICS
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5">
                    Moving Your Goods,
                    <br />
                    Moving Your Business
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    At CargoPulse, we make transportation simple, reliable, and
                    efficient. From local deliveries to long-distance freight, we
                    ensure your goods get where they need to be safely and on time.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    With dependable transportation and professional service, we take
                    the stress out of logistics so you can focus on growing your
                    business.
                </p>

                <NavLink to="/services">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition cursor-pointer">
                    Discover Our Services
                </button>
                </NavLink>

          </div>

            <div className=" w-full h-75 md:h- overflow-hidden">


        <img
          src={Truck}
          alt="CargoPulse truck"
          className=" w-full h-full object-cover"
          />
          </div>


      </div>
      </Reveal>


    <Reveal>
      {/* ================= INTRODUCTION ================= */}
      <div className="bg-white py-16 md:py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-orange-500 text-sm font-semibold mb-3">
                INTRODUCTION
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-[#152238] leading-tight">
                We Are The
                <br />
                Future Of Logistics
              </h2>

              <p className="text-gray-500 leading-7 mt-5">
                CargoPulse is committed to providing dependable logistics
                solutions that connect businesses and people around the
                world.
              </p>

              <p className="text-gray-500 leading-7 mt-4">
                Our experienced team and modern transportation solutions
                allow us to deliver cargo safely, efficiently and on time.
              </p>

                <NavLink to="/services">
              <button className="mt-7 bg-orange-500 text-white px-7 py-3 rounded-full hover:bg-orange-600 transition">
                See More
              </button>
                </NavLink>
            </div>

            <div>
              <img
                src={Banner}
                alt="CargoPulse logistics"
                className="w-full h-88 md:h-107 object-cover rounded-xl"
              />
            </div>

          </div>

        </div>
        

      </div>
      </Reveal>

    </section>
  );
};

export default BookingSection;