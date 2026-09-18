import {
  Plane,
  Ship,
  Truck,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../Components/Reveal";

const Pricing = () => {
  const pricing = [
    {
      title: "Air Freight",
      icon: Plane,
      price: "$5",
      unit: "per kg",
      description:
        "Fast and efficient shipping for goods that need to reach their destination quickly.",
      features: [
        "Fast delivery",
        "International shipping",
        "Shipment tracking",
        "Reliable handling",
      ],
    },
    {
      title: "Sea Freight",
      icon: Ship,
      price: "$2",
      unit: "per kg",
      description:
        "A cost-effective solution for larger and heavier shipments traveling internationally.",
      features: [
        "Affordable shipping",
        "Large cargo capacity",
        "International shipping",
        "Shipment tracking",
      ],
    },
    {
      title: "Land Freight",
      icon: Truck,
      price: "$3",
      unit: "per kg",
      description:
        "Reliable transportation for shipments moving by road between locations.",
      features: [
        "Reliable transportation",
        "Delivery at your door-step",
        "Shipment tracking",
        "Secure handling",
      ],
    },
  ];

  return (
    <main className="bg-white">

      {/* HERO */}
      <Reveal>
        <section className="relative bg-slate-900 py-24 px-6 md:px-10 lg:px-20 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 opacity-90"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center text-white">

            <p className="text-orange-500 font-semibold uppercase tracking-widest mb-4">
              Our Pricing
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Simple, Transparent
              <span className="text-orange-500"> Shipping Rates</span>
            </h1>

            <p className="mt-6 text-gray-300 text-base md:text-lg leading-7 max-w-2xl mx-auto">
              Choose the transportation method that best suits your shipment.
              Our rates are calculated based on the weight of your goods.
            </p>

          </div>
        </section>
      </Reveal>

      {/* PRICING CARDS */}
      <Reveal>
        <section className="py-20 px-6 md:px-10 lg:px-20">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-14">

              <p className="text-orange-500 font-semibold uppercase tracking-wider mb-3">
                Shipping Options
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Choose Your Shipping Method
              </h2>

              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Flexible transportation options designed to meet different
                shipping needs and budgets.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {pricing.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >

                    {/* ICON */}
                    <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition">
                      <Icon size={27} />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    {/* PRICE */}
                    <div className="mt-5 flex items-end gap-2">

                      <span className="text-4xl font-bold text-orange-500">
                        {item.price}
                      </span>

                      <span className="text-gray-500 mb-1">
                        {item.unit}
                      </span>

                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-gray-600 mt-5 leading-7 min-h-20">
                      {item.description}
                    </p>

                    {/* FEATURES */}
                    <div className="mt-7 border-t border-gray-100 pt-6 space-y-3">

                      {item.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle
                            size={18}
                            className="text-orange-500 shrink-0"
                          />

                          <span className="text-gray-600 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </section>
      </Reveal>

      {/* WHY OUR PRICING */}
      <Reveal>
        <section className="bg-gray-50 py-20 px-6 md:px-10 lg:px-20">

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>

              <p className="text-orange-500 font-semibold uppercase tracking-wider mb-3">
                Why CargoPulse
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Reliable Shipping Without Complicated Pricing
              </h2>

              <p className="text-gray-600 mt-5 leading-7">
                At CargoPulse, we make shipping simple. Choose the
                transportation method that fits your cargo and pay based on
                the weight of your shipment.
              </p>

              <p className="text-gray-600 mt-4 leading-7">
                From fast air freight to economical sea freight and dependable
                land transportation, our solutions are designed to make your
                logistics experience easier.
              </p>

            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">

              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Our Rates
              </h3>

              <div className="space-y-5">

                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-3">
                    <Plane size={21} className="text-orange-500" />
                    <span className="font-medium text-slate-800">
                      Air Freight
                    </span>
                  </div>

                  <span className="font-bold text-slate-900">
                    $5 / kg
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-3">
                    <Ship size={21} className="text-orange-500" />
                    <span className="font-medium text-slate-800">
                      Sea Freight
                    </span>
                  </div>

                  <span className="font-bold text-slate-900">
                    $2 / kg
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck size={21} className="text-orange-500" />
                    <span className="font-medium text-slate-800">
                      Land Freight
                    </span>
                  </div>

                  <span className="font-bold text-slate-900">
                    $3 / kg
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="py-20 px-6 md:px-10 lg:px-20">

          <div className="max-w-5xl mx-auto bg-slate-900 rounded-2xl px-8 py-14 md:px-14 text-center text-white">

            <p className="text-orange-500 font-semibold uppercase tracking-wider mb-3">
              Get Started
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Need a Shipping Quote?
            </h2>

            <p className="text-gray-300 mt-4 max-w-2xl mx-auto leading-7">
              Contact our team today and let us help you choose the right
              transportation solution for your shipment.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-md transition"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>
      </Reveal>

    </main>
  );
};

export default Pricing;