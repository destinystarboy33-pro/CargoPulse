import Airplane from '../assets/Airplane.png'
import Airplane2 from '../assets/Airplane2.jpeg'
import Train from '../assets/Train.jpg'
import Road from '../assets/Road.jpg'
import Seacargo from '../assets/Seacargo.jpeg'
import Reveal from '../Components/Reveal'

import {
  Globe2,
  MapPin,
  ShieldCheck,
  Package,
  Search,
  ChevronRight,
  Phone,
  Mail,
  MapPinned,
  FileText,
  
} from "lucide-react";
import { NavLink } from 'react-router-dom'

const Services = () => {
  const topServices = [
    {
      title: "Worldwide",
      icon: Globe2,
      color: "bg-[#ed8b4d]",
    },
    {
      title: "Tracking",
      icon: MapPin,
      color: "bg-[#2d659f]",
    },
    {
      title: "Fast and reliable",
      icon: ShieldCheck,
      color: "bg-[#c95c18]",
    },
    {
      title: "Storage",
      icon: Globe2,
      color: "bg-[#4b9d6d]",
    },
  ];

  const serviceMenu = [
    "Air Transport",
    "Ocean Transport",
    "Railway Transport",
    "Road Transport",
  ];

  const inspectionCards = [
    {
      title: "Cargo inspection",
      text: "Cargo inspection and cargo tracking",
    },
    {
      title: "Cargo inspection",
      text: "Cargo inspection and cargo tracking",
    },
    {
      title: "Cargo inspection",
      text: "Cargo inspection and cargo tracking",
    },
  ];

  return (
    <main className="w-full overflow-hidden bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}
      <Reveal>
      <section
        className="relative h-65 md:h-82 bg-cover bg-center"
        style={{
           backgroundImage: ` linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url(${Airplane2})`  ,
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 h-full max-w-300 mx-auto px-6 flex items-end pb-10 md:pb-14">
          <div className="w-full flex items-end justify-between">

            <h1 className="text-white text-4xl md:text-5xl font-semibold">
              Service
            </h1>

            <div className="hidden sm:flex items-center text-sm text-white">
                <NavLink to="/">

              <span className=' cursor-pointer'>Home</span>
                </NavLink>
              <span className="mx-2 text-xl">→</span>
              <span className="text-orange-400">
                Service
              </span>
            </div>

          </div>
        </div>
      </section>
      </Reveal>


      {/* =====================================================
          OUR SERVICE
      ===================================================== */}
       <Reveal>
      <section
        className="relative py-10 md:py-12 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Airplane2})`,
        }}
      >
        <div className="absolute inset-0 bg-white/70" />

        <div className="relative z-10 max-w-250 mx-auto px-5">

          <p className="text-[11px] font-semibold text-gray-600 uppercase">
            Our Service
          </p>

          <h2 className="text-xl md:text-2xl text-gray-700 font-medium uppercase mt-1 mb-5">
            What we can do for you
          </h2>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

            {topServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={index}
                  className={`${service.color} h-29 md:h-31 flex flex-col items-center justify-center text-white rounded-lg`}
                >
                  <Icon
                    size={43}
                    strokeWidth={1.7}
                    className="mb-3"
                  />

                  <p className="text-xs md:text-sm font-medium text-center px-2">
                    {service.title}
                  </p>
                </div>
              );
            })}

          </div>

        </div>
      </section>
      </Reveal>


      {/* =====================================================
          STATISTICS
      ===================================================== */}
        <Reveal>
      <section className="relative bg-[#4a4a4a] text-white">

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 max-w-300 mx-auto px-5 md:px-10 py-12">

          <div className="max-w-238 mx-auto">

            <h2 className="text-xl md:text-2xl font-medium mb-1">
              Number of orders and goods in the past year
            </h2>

            <div className="w-31 h-1 bg-orange-400 mb-5" />


            <div className="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-8">

              {/* LEFT TEXT */}
              <div>

                <p className="text-[9px] text-gray-300 uppercase mb-2">
                  We are the best
                </p>

                <h3 className="text-sm font-medium mb-3">
                  About the field of delivery
                </h3>

                <p className="text-[11px] text-gray-300 leading-5">
                  The CargpPulse always puts the customer's
                  experience first, always ensures goods
                  and responsibility.
                </p>

                <NavLink to={'/contact'}>

                <button className="mt-4 bg-[#2868a5] px-5 py-2 text-[11px] cursor-pointer rounded-full">
                  Contact now
                </button>
                </NavLink>

              </div>


              {/* RIGHT BARS */}
              <div>

                <div className="space-y-4">

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Goods from the sea</span>
                      <span>90%</span>
                    </div>

                    <div className="h-3 bg-gray-600">
                      <div className="h-full w-[90%] bg-orange-400" />
                    </div>
                  </div>


                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Goods from Airport</span>
                      <span>75%</span>
                    </div>

                    <div className="h-3 bg-gray-600">
                      <div className="h-full w-[75%] bg-orange-400" />
                    </div>
                  </div>


                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Goods from Inland</span>
                      <span>75%</span>
                    </div>

                    <div className="h-3 bg-gray-600">
                      <div className="h-full w-[75%] bg-orange-400" />
                    </div>
                  </div>



                   <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Goods from Rail Station</span>
                      <span>60%</span>
                    </div>

                    <div className="h-3 bg-gray-600">
                      <div className="h-full w-[60%] bg-orange-400" />
                    </div>
                  </div>

                </div>


                {/* NUMBERS */}
                <div className="grid grid-cols-3 mt-6">

                  <div className="text-center border-r border-gray-400">
                    <h3 className="text-2xl md:text-3xl font-light">
                      12,100
                    </h3>

                    <p className="text-xs mt-1">
                      Order
                    </p>

                    <p className="text-[9px] text-gray-300 mt-3 px-3">
                      As the market leading delivery
                      service company, The Cargo Pulse
                      always strives to satisfy customers
                      for the best experience.
                    </p>
                  </div>


                  <div className="text-center border-r border-gray-400">
                    <h3 className="text-2xl md:text-3xl font-light">
                      4,000
                    </h3>

                    <p className="text-xs mt-1">
                      Ton of goods
                    </p>

                    <p className="text-[9px] text-gray-300 mt-3 px-3">
                      As the market leading delivery
                      service company, The Cargo Pulse
                      always strives to satisfy customers
                      for the best experience.
                    </p>
                  </div>


                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-light">
                      1,100
                    </h3>

                    <p className="text-xs mt-1">
                      Satisfied clients
                    </p>

                    <p className="text-[9px] text-gray-300 mt-3 px-3">
                      As the market leading delivery
                      service company, The Cargo Pulse
                      always strives to satisfy customers
                      for the best experience.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* AIRPLANE */}
        <img
          src={Airplane}
          alt="Air transport"
          className="
            absolute
            -left-20
            md:-left-10
            -bottom-14
            md:-bottom-19
            w-88
            md:w-125
            object-contain
            pointer-events-none
        z-10
          "
        />

      </section>
      </Reveal>


      {/* =====================================================
          MAIN SERVICES CONTENT
      ===================================================== */}
      <Reveal>
      <section className="py-16 md:py-20 bg-white">

        <div className="max-w-250 mx-auto px-5">

          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-7">


            {/* =================================================
                SIDEBAR
            ================================================= */}
            <aside>

              <div className="bg-[#f3f3f3]">

                <h3 className="px-4 pt-4 text-lg font-medium text-gray-600">
                  Our Services
                </h3>

                <div className="w-8 h-0.5 bg-orange-400 ml-4 mt-2 mb-2" />

                {serviceMenu.map((item, index) => (
                  <div
                    key={item}
                    className={`
                      px-4 py-3
                      flex items-center justify-between
                      text-[11px]
                      ${
                        index === 0
                          ? "bg-orange-400 text-white"
                          : "text-gray-500"
                      }
                    `}
                  >
                    <span>{item}</span>

                    <ChevronRight size={13} />
                  </div>
                ))}

              </div>


              {/* BROCHURE */}
              <div className="bg-orange-400 text-white mt-5 p-4 flex items-center justify-between">

                <div>
                  <h3 className="text-sm">
                    Our Brochures
                  </h3>

                  <p className="text-[9px] mt-1">
                    TheCargoPulseServicePDF | 2.1 MB
                  </p>
                </div>

                <FileText size={28} />

              </div>


              {/* CONTACT */}
              <div className="bg-[#f3f3f3] mt-5 p-4">

                <h3 className="text-lg text-gray-600">
                  Contact infor
                </h3>

                <div className="w-8 h-0.5 bg-orange-400 mt-2 mb-4" />

                <div className="space-y-4 text-[9px] text-gray-500">

                  <div className="flex gap-2">
                    <MapPinned size={13} />
                    <span>
                      1073/23 D. CMT8, P.7, Q.3
                      <br />
                      HCM
                    </span>
                  </div>

                  <div >
                    

                    <span>
                     <ul>
                         <li className="flex gap-1">
                                        <span className=" text-gray-500">< Mail size={18} /> {
                                           
                                        }</span>
                                        
                        
                                        <span className="text-gray-500">
                                          <a href="mailto:cargopulsefrieght@gmail.com?subject=Customer%20support">CargoPulse@gmail.com</a>
                                        </span>
                                      </li>
                     </ul>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Phone size={13} />

                    <span>
                      0901 814 144
                    </span>
                  </div>

                </div>

              </div>


              {/* MAP / CONTACT CARD */}
              <div
                className="relative mt-5 h-55 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/map.png')",
                }}
              >

                <div className="absolute inset-0 bg-white/70" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">

                  <div className="text-xl font-semibold text-gray-700">
                     CargpPulse
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    Logistics & Cargo for
                    <br />
                    Business
                  </p>

                <NavLink to="/contact">

                  <button className="mt-4 bg-orange-400 text-white rounded-full px-5 py-2 text-xs cursor-pointer">
                    Contact Us
                  </button>
                </NavLink>

                </div>

                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-orange-400" />

              </div>

            </aside>


            {/* =================================================
                CONTENT
            ================================================= */}
            <div>

              {/* AIR TRANSPORT */}
              <article>

                <h2 className="text-xl md:text-2xl font-medium text-gray-700">
                  Air Transport
                </h2>

                <div className="w-8 h-0.5 bg-orange-400 mt-2 mb-4" />

                <p className="text-[10px] md:text-xs text-gray-500 leading-5">
                  At our transportation company, we believe in delivering
                  unparalleled service to our customers. With decades of
                  experience in the industry, we have earned a reputation
                  for reliability and precision, providing timely and
                  efficient transportation solutions to businesses and
                  individuals across the country.
                </p>


                <img
                  src={Airplane2}
                  alt="Air Transport"
                  className="w-full h-55 md:h-75 object-cover mt-5 rounded-lg shadow-lg shadow-gray-600"
                />


                {/* HOW TO BENEFIT */}
                <h3 className="text-lg text-gray-700 mt-5">
                  How to benefit
                </h3>

                <p className="text-[10px] md:text-xs text-gray-500 leading-5 mt-2">
                  We are providing efficient and reliable transport
                  solutions with a commitment to excellence, customer
                  satisfaction with ensuring timely deliveries, safe
                  transportation of goods for our customers.
                </p>


                {/* INSPECTION CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                  {inspectionCards.map((card, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-100 shadow-sm p-5 text-center"
                    >

                      <div className="flex justify-center text-orange-400 mb-4">
                        <Package size={48} strokeWidth={1.3} />
                        <Search
                          size={20}
                          strokeWidth={1.5}
                          className="-ml-4 mt-6"
                        />
                      </div>

                      <h4 className="text-xs font-medium text-gray-700">
                        {card.title}
                      </h4>

                      <p className="text-[9px] text-gray-400 mt-2">
                        {card.text}
                      </p>

                    </div>
                  ))}

                </div>

              </article>


              {/* =================================================
                  RAILWAY
              ================================================= */}
              <article className="mt-10">

                <h2 className="text-xl md:text-2xl font-medium text-gray-700">
                  Railway Transport
                </h2>

                <div className="w-8 h-0.5 bg-orange-400 mt-2 mb-4" />

                <p className="text-[10px] md:text-xs text-gray-500 leading-5">
                  At our transportation company, we believe in delivering
                  unparalleled service to our customers. With decades of
                  experience in the industry, we have earned a reputation
                  for reliability and precision, providing timely and
                  efficient transportation solutions to businesses and
                  individuals across the country.
                </p>


                <img
                  src={Train}
                  alt="Railway Transport"
                  className="w-full h-55 md:h-75 object-cover mt-5 rounded-lg shadow-lg shadow-gray-600"
                />

              </article>





                          <article className="mt-10">

                <h2 className="text-xl md:text-2xl font-medium text-gray-700">
                  Sea Transoprt
                </h2>

                <div className="w-8 h-0.5 bg-orange-400 mt-2 mb-4" />

                <p className="text-[10px] md:text-xs text-gray-500 leading-5">
                 At CargoPulse, we provide dependable sea transportation solutions designed to
                move cargo safely and efficiently across international waters. From full container 
                shipments to large and specialized cargo, our ocean freight services connect businesses
                to markets around the world. With a strong focus on security, timely delivery, and efficient
                handling, we ensure every shipment reaches its destination smoothly and reliably.
                </p>


                <img
                  src={Seacargo}
                  alt="Sea Transport"
                  className="w-full h-55 md:h-75 object-cover mt-5 rounded-lg shadow-lg shadow-gray-600"
                />

              </article>


               <article className="mt-10">

                <h2 className="text-xl md:text-2xl font-medium text-gray-700">
                  Road Transport
                </h2>

                <div className="w-8 h-0.5 bg-orange-400 mt-2 mb-4" />

                <p className="text-[10px] md:text-xs text-gray-500 leading-5">
                 At CargoPulse, we deliver comprehensive land transportation solutions engineered for
                  reliability, efficiency, and operational excellence. Our road freight services facilitate
                   the seamless movement of goods across cities, regions, and borders, with a strong emphasis
                    on secure handling, optimized routing, and dependable delivery timelines.
                     From routine commercial shipments to time-sensitive and specialized cargo, we provide 
                     businesses with a trusted transportation
                  network designed to keep their supply chains moving without interruption.
                </p>


                <img
                  src={Road}
                  alt="Road Transport"
                  className="w-full h-55 md:h-75 object-cover mt-5 rounded-lg shadow-lg shadow-gray-600"
                />

              </article>




            </div>

          </div>

        </div>

      </section>
      </Reveal>

    </main>
  );
};

export default Services;


