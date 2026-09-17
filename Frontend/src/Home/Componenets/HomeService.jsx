import Inland from "../../assets/Inland.jpg";
import Domestic from "../../assets/Domestic.jpg";
import Chain from "../../assets/Chain.jpg";
import WareHouse from "../../assets/WareHouse.jpg";
import Border from "../../assets/Border.jpg";
import Sea from "../../assets/Sea.jpg";
import Group from "../../assets/Group.jpg";
import Reveal from '../../Components/Reveal';

const Services = () => {
  const services = [
    {
      title: "Inland Transportation",
      image: Inland,
    },
    {
      title: "Domestic Rail",
      image: Domestic,
    },
    {
      title: "Cold Chain",
      image: Chain,
    },
    {
      title: "Warehouse Management",
      image: WareHouse,
    },
    {
      title: "Cross Border Transportation",
      image: Border,
    },
    {
      title: "Domestic Sea",
      image: Sea,
    },
  ];

  return (
    <section className="w-full bg-white py-16">
        <Reveal>

      <div className="w-full max-w-275 mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-10">

          <img
            src={Group}
            alt="CargoPulse"
            className="w-10 h-10 mx-auto mb-3 object-contain"
          />

          <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
            Service CargoPulse
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Reliable logistics solutions designed to keep your goods
            moving safely and efficiently.
          </p>

        </div>


        {/* SERVICES */}
        <div
          className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full "
        >

          {services.map((service) => (
            <div
              key={service.title}
              className="w-full min-w-0 max-w-full overflow-hidden"
            >

              {/* IMAGE */}
              <div className="w-full h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="
                    block
                    w-full
                    h-full
                    object-cover
                  "
                />
              </div>

              <h1 className="bg-orange-500">{service.title}</h1>


              {/* ORANGE TITLE */}
              {/* <div
                className="w-full h-8 bg-orange-500 flex items-center justify-center px-2"
              >
                <h3 className="text-white text-sm md:text-base font-medium text-center">
                  {service.title}
                </h3>
              </div> */}

            </div>
          ))}

        </div>

      </div>
      </Reveal>

    </section>
  );
};

export default Services;