import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Tran Quoc Cuong",
      company: "Fashion Store",
      image: "/images/client.jpg",
      text: "CargoPulse has made our transportation process much easier. Their service is reliable, their communication is excellent, and our shipments always arrive safely and on time.",
    },

    {
      name: "Michael James",
      company: "Global Trading",
      image: "/images/client1.jpg",
      text: "CargoPulse provides excellent logistics services. Our deliveries are handled professionally and arrive when expected.",
    },

    {
      name: "Sarah Williams",
      company: "Retail Company",
      image: "/images/client2.jpg",
      text: "We have been very impressed with the reliability and professionalism of CargoPulse. They make shipping simple for our business.",
    },
  ];

  return (
    <section className="w-full bg-white py-20">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">

          <img
            src="/images/Group.jpg"
            alt="CargoPulse"
            className="w-10 h-10 mx-auto mb-3 object-contain"
          />

          <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
            What client said
          </h2>

        </div>


        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="testimonials-swiper"
        >

          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pb-14">

                {/* Client */}
                <div className="flex justify-center">

                  <div className="w-full max-w-md border border-gray-200 rounded-full px-5 py-3 flex items-center gap-4 shadow-sm">

                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>

                  </div>

                </div>


                {/* Testimonial */}
                <div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Reliable logistics service
                  </h3>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    <span className="text-orange-400">★</span>
                    <span className="text-orange-400">★</span>
                    <span className="text-orange-400">★</span>
                    <span className="text-orange-400">★</span>
                    <span className="text-orange-400">★</span>
                  </div>

                  <p className="text-gray-500 text-sm leading-7">
                    {testimonial.text}
                  </p>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>

      </div>

    </section>
  );
};

export default Testimonials;