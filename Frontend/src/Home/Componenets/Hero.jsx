import heroImage from '../../assets/images.jpg'
import { NavLink } from 'react-router-dom';
import Reveal from '../../Components/Reveal';
const Hero = () => {
  return (
    <>
     <Reveal>
    <section className="relative w-full min-h-162 flex items-center">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url( ${heroImage})`,
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">

        <div className="max-w-2xl text-white">

          <p className="text-orange-400 font-semibold text-sm md:text-base mb-4">
            CARGOPULSE LOGISTICS
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Moving Your World,
            <br />
            Delivering Your Future
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed max-w-xl mb-8">
            Reliable logistics solutions designed to move your goods
            safely, quickly, and efficiently. From local deliveries to
            large-scale transportation, CargoPulse keeps your business
            moving.
          </p>

          <div className="flex flex-wrap gap-4">

            <NavLink to={"/contact"}>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-full font-medium transition cursor-pointer">
              Get Started
            </button>
            </NavLink>

            <NavLink to={"/about"}>
            <button className="border border-white text-white hover:bg-white hover:text-gray-800 px-7 py-3 rounded-full font-medium transition cursor-pointer">
              Learn More
            </button>
            </NavLink>

          </div>

        </div>

      </div>

      {/* Bottom Orange Border */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500"></div>

    </section>
    </Reveal>
    </>
  );
};

export default Hero;