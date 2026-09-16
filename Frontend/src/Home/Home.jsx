import Hero from "./Componenets/Hero";
import Booking from "./Componenets/Booking";
import Services from "./Componenets/HomeService";
import Value from "./Componenets/Value";
import Testimonials from "./Componenets/Testimonial";


const Home = () => {
  return (
    <div>
      <Hero />
      <Booking />
      {/* <Introduction /> */}
      <Services />
      <Value />
      <Testimonials />
    </div>
  )
}

export default Home
