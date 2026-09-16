// const Booking = () => {
//   return (
//     <section className="w-full bg-white py-16">
//       <div className="max-w-6xl mx-auto px-6">

//         {/* Section Heading */}
//         <div className="text-center mb-10">
//           <p className="text-orange-500 font-semibold text-sm mb-2">
//             CARGOPULSE LOGISTICS
//           </p>

//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//             Book Your Shipment
//           </h2>

//           <p className="text-gray-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
//             Tell us what you need and our logistics team will help
//             you move your goods safely and efficiently.
//           </p>
//         </div>

//         {/* Form */}
//         <div className="bg-gray-50 rounded-2xl p-6 md:p-10 shadow-sm">

//           <form className="space-y-6">

//             {/* First Row */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>

//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-orange-500 transition"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-orange-500 transition"
//                 />
//               </div>

//             </div>

//             {/* Second Row */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>

//                 <input
//                   type="tel"
//                   placeholder="Enter your phone number"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-orange-500 transition"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Shipment Type
//                 </label>

//                 <select
//                   className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-orange-500 transition bg-white"
//                 >
//                   <option value="">Select shipment type</option>
//                   <option value="parcel">Parcel</option>
//                   <option value="cargo">Cargo</option>
//                   <option value="freight">Freight</option>
//                   <option value="warehouse">Warehouse</option>
//                 </select>
//               </div>

//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Shipment Description
//               </label>

//               <textarea
//                 rows="5"
//                 placeholder="Tell us about your shipment..."
//                 className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-orange-500 transition resize-none"
//               ></textarea>
//             </div>

//             {/* Submit */}
//             <div className="flex justify-center pt-2">

//               <button
//                 type="submit"
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-full font-medium transition"
//               >
//                 Submit Request
//               </button>

//             </div>

//           </form>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default Booking;


















import Banner from '../../assets/Banner.jpg'
import Truck from '../../assets/Truck.jpg'
const BookingSection = () => {
  return (
    <section className="w-full">

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

                <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition">
                    Discover Our Services
                </button>

          </div>

            <div className=" w-full h-75 md:h- overflow-hidden">


        <img
          src={Truck}
          alt="CargoPulse truck"
          className=" w-full h-full object-cover"
          />
          </div>


      </div>


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

              <button className="mt-7 bg-orange-500 text-white px-7 py-3 rounded-full hover:bg-orange-600 transition">
                See More
              </button>
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

    </section>
  );
};

export default BookingSection;