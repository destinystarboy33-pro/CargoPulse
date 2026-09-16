import Delivery from '../assets/Delivery.jpeg'
import Conatainer from '../assets/Containersea.jpg'
import logo from '../assets/logo.jpeg'
import Import from '../assets/import.png'
import Export from '../assets/export.png'
import Cover from '../assets/Cover.jpg'
import Truck from '../assets/Trucks.jpg'
import Award1 from '../assets/Award1.jpg'
import Award2 from '../assets/Award2.jpg'
import Award3 from '../assets/Award3.jpg'

const About = () => {
  return (
    <div className="w-full bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section
        className="relative h-82 md:h-98 bg-cover bg-center"
        style={{
          backgroundImage: `url(${logo})`,
        }}
      >
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 max-w-6xl mx-auto h-full px-5 md:px-8 flex items-end pb-14">
          <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h1 className="text-white text-4xl md:text-5xl font-semibold">
              Introduce
            </h1>

            <div className="text-white text-sm">
              Home
              <span className="mx-2">→</span>
              <span className="text-orange-400">Introduce</span>
            </div>
          </div>
        </div>
      </section>


      {/* ================= COMPANY INTRO ================= */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* TEXT */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-5">
                About The CargoPulse Corporation
              </h2>

              <div className="space-y-4 text-gray-500 text-sm leading-6">

                <p>
                  The CargoPulse is positioned to become a sector-leading solutions
                  provider for integrated Logistics, Industrial Solutions,
                  Warehousing, Freight Management and Distribution.
                </p>

                <p>
                  With our customers at the center of everything we do, we
                  continuously develop solutions that make logistics easier,
                  faster and more efficient.
                </p>

                <p>
                  In addition, The Mona is investing to care for its future
                  logistics demands and developing new services and products
                  to provide customers with world-class solutions.
                </p>

                <p>
                  Our over-arching difference from our competitors and
                  connects with the core values of the company.
                </p>

              </div>
            </div>


            {/* IMAGE */}
            <div className="relative flex justify-center md:justify-end">

              <div className="relative">
                <img
                  src={Delivery}
                  alt="Delivery"
                  className="w-full max-w-100 h-70 md:h-83 object-cover rounded-lg"
                />

                {/* orange decoration */}
                <div className="absolute -left-5 top-16 w-8 h-24 bg-orange-500"></div>

                {/* blue decoration */}
                <div className="absolute -left-5 top-40 w-8 h-12 bg-blue-600"></div>

                {/* bottom orange decoration */}
                <div className="absolute -right-10 -bottom-5 w-40 h-8 bg-orange-500"></div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= WHY PEOPLE CHOOSE US ================= */}
      <section className="relative w-full py-16 md:py-24 ">

        <div className="max-w-5xl mx-auto px-5 md:px-8">

          <div className="relative">

            {/* MAIN IMAGE */}
            <div   className="relative w-full h-80 py-6 rounded-lg md:py-24 bg-white"
        style={{
          backgroundImage:` linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url(${Conatainer})` ,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
            >

              {/* <img
                src={Conatainer}
                alt="Truck and containers"
                className="w-full h-[420px] md:h-[520px] object-cover bg-black/25"
              /> */}

              <div className="absolute inset-0"></div>

              {/* TITLE */}
              <h2 className="flex justify-center items-center  text-center md:right-10 text-white text-xl md:text-2xl font-semibold">
                Why People Choose Us
              </h2>


              {/* STATISTICS */}
              <div className="absolute bottom-8 left-0 right-0 px-4 md:px-8">

                <div className="grid grid-cols-2 md:flex md:justify-center md:items-center md:gap-8 gap-4">

                  {[
                    ["100%", "Friendly"],
                    ["100%", "Delivery successful"],
                    ["70%", "Fast"],
                    ["100%", "Safe"],
                  
                  ].map(([number, title], index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-white"
                    >
                      <div
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 ${
                          index === 2
                            ? "border-orange-400 border-b-green-400"
                            : "border-orange-400"
                        } flex items-center justify-center`}
                      >
                        <span className="text-sm md:text-base font-semibold">
                          {number}
                        </span>
                      </div>

                      <p className="text-xs font-semibold mt-2 text-center">
                        {title}
                      </p>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= INTERNATIONAL SHIPPING ================= */}
      <section
        className="relative w-full py-16 md:py-24 bg-white"
        style={{
          backgroundImage: ` linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),  url(${Cover})`  ,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="max-w-6xl mx-auto px-5 md:px-8 mt-0">

          {/* CONTAINERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          

            <div className="relative h-65">

              <img
                src={Export}
                alt="Export container"
                className="absolute left-4 top-5 w-58 md:w-68 rotate-[-4deg]"
              />

              <img
                src={Import}
                alt="Import container"
                className="absolute left-28 md:left-44 top-20 w-58 md:w-68 rotate-3"
              />

            </div>


            {/* TEXT */}
            <div className="max-w-md">

              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Goods are shipped from abroad
              </h2>

              <p className="text-white text-sm leading-6">
                Goods will always be secured and delivered to you.
                We're even more complete the continuum of supply chain
                initiatives to ensure quality of service.
              </p>

            </div>

          </div>


          {/* ================= SERVICE NUMBERS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">

            {/* ORANGE */}
            <div className="bg-orange-500 rounded-md 42 flex flex-col items-center justify-center text-white">
              <div className="text-3xl mb-4">
                🚚
              </div>

              <h3 className="text-sm md:text-base font-medium">
                Goods from the sea
              </h3>

              <p className="text-2xl mt-4">
                1000+
              </p>
            </div>


            {/* BLUE */}
            <div className="bg-blue-600 rounded-md h-42 flex flex-col items-center justify-center text-white">
              <div className="text-3xl mb-4">
                🚢
              </div>

              <h3 className="text-sm md:text-base font-medium">
                Goods from the sea
              </h3>

              <p className="text-2xl mt-4">
                1000+
              </p>
            </div>


            {/* GREEN */}
            <div className="bg-green-500 rounded-md h-42 flex flex-col items-center justify-center text-white">
              <div className="text-3xl mb-4">
                ✈️
              </div>

              <h3 className="text-sm md:text-base font-medium">
                Goods from the sea
              </h3>

              <p className="text-2xl mt-4">
                1000+
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= VALUE ================= */}
      <section className="relative w-full py-16 md:py-24 bg-white">

        <div className="max-w-6xl mx-auto px-5 md:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* VALUE CARD */}
            <div className="bg-orange-500 rounded-2xl z-10 text-white p-7  md:p-9">

              <h2 className="text-2xl font-semibold mb-5">
                The CargoPulse Value
              </h2>

              <div className="space-y-5">

                <div>
                  <h3 className="font-semibold mb-1">
                    Vision
                  </h3>

                  <p className="text-sm leading-6 text-white/90">
                    To become a leading logistics provider in the area of
                    Indochina and for international business partners.
                  </p>
                </div>


                <div>
                  <h3 className="font-semibold mb-1">
                    Mission
                  </h3>

                  <p className="text-sm leading-6 text-white/90">
                    Provide sustainable and differentiated solutions that
                    create added value for our customers, people and the
                    community.
                  </p>
                </div>


                <div>
                  <h3 className="font-semibold mb-1">
                    The core values
                  </h3>

                  <p className="text-sm leading-6 text-white/90">
                    Customer centricity
                    <br />
                    Integrity and respect
                    <br />
                    Innovation and agility
                    <br />
                    Accountability and entrepreneurship
                  </p>
                </div>

              </div>

            </div>


            {/* TRUCK + STATS */}
            <div className="relative min-h-100 flex items-center z-0">

              <img
                src={Truck}
                alt="Cargo truck"
                className="w-full max-w-138 absolute right-15  object-contain"
              />

              {/* BLUE STAT BARS */}
              <div className="absolute left-4 md:left-20 bottom-14 right-15 space-y-3">

                <div className="bg-blue-600 text-white rounded-full px-6 py-3 w-58 md:w-70">
                  <strong className="block text-sm">
                    201.000+
                  </strong>

                  <span className="text-xs">
                    Customer choose the CargoPulse to serve
                  </span>
                </div>


                <div className="bg-blue-600 text-white rounded-full px-6 py-3 w-50 md:w-63">
                  <strong className="block text-sm">
                    14
                  </strong>

                  <span className="text-xs">
                    Warehouse system in the world
                  </span>
                </div>


                <div className="bg-blue-600 text-white rounded-full px-6 py-3 w-45 md:w-55">
                  <strong className="block text-sm">
                    250
                  </strong>

                  <span className="text-xs">
                    Trucks and prime movers
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= AWARDS ================= */}
      <section className="relative w-full bg-gray-100 py-16 md:py-20">

        <div className="max-w-6xl mx-auto px-5 md:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* AWARD INFO */}
            <div>

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-7">
                Awards and Associations
              </h2>


              <div className="flex gap-5 items-start">

                <img
                  src={Award1}
                  alt="Vietnam Value"
                  className="w-20 h-20 object-contain"
                />

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    NATIONAL BRAND - VIETNAM VALUE
                  </h3>

                  <p className="text-xs md:text-sm text-gray-500 leading-6">
                    The National Brand Award is the sole and preeminent
                    program of the Government of Vietnam to promote the image
                    of Vietnamese products and services.
                  </p>
                </div>

              </div>


              {/* LOGOS */}
              <div className="flex items-center gap-8 mt-10">

                <div className="border border-orange-300 p-4">
                  <img
                    src={Award1}
                    alt="Vietnam Value"
                    className="w-20 h-20 object-contain"
                  />
                </div>

                <img
                  src={Award2}
                  alt="VNR"
                  className="w-20 h-16 object-contain"
                />

                <img
                  src={Award3}
                  alt="Award"
                  className="w-20 h-16 object-contain"
                />

              </div>

            </div>


            {/* VIDEO */}
            {/* <div>

              <div className="relative rounded-lg overflow-hidden">

                <img
                  src="/images/award-video.jpg"
                  alt="Awards video"
                  className="w-full h-[230px] object-cover"
                />

                <button className="absolute inset-0 m-auto w-14 h-14 rounded-xl bg-red-600 text-white flex items-center justify-center text-2xl">
                  ▶
                </button>

              </div>

            
              <div className="flex justify-center gap-2 mt-5">

                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                <span className="w-3 h-3 rounded-full border border-gray-400"></span>

              </div>

            </div> */}

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;