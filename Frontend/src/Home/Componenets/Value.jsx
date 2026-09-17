import Values from '../../assets/Value.jpg'
import Reveal from '../../Components/Reveal';

const Value = () => {
  const values = [
    {
      number: "01",
      title: "Asset heavy",
      text: (
        <>
          <p>200,000+ m² of warehouse space nationwide</p>
          <p>200+ head trucks, 30+ barges, 4 ports & depots</p>
          <p>Yen Vien railway container terminal</p>
        </>
      ),
      icon: "⚙️",
    },
    {
      number: "02",
      title: "Tier 1 logistics provider",
      text: (
        <>
          <p>100% asset and workforce utilization</p>
          <p>Elimination of outsourced services</p>
          <p>Faster and more reliable service</p>
          <p>More sustainable and economical solutions</p>
        </>
      ),
      icon: "♻️",
    },
    {
      number: "03",
      title: "Environmentally friendly logistics solutions",
      text: (
        <>
          <p>Green freight Asia label level 3</p>
          <p>100% electric material handling equipment</p>
          <p>Solar panels on our warehouse</p>
        </>
      ),
      icon: "🌍",
    },
  ];

  return (
    <section className="relative w-full py-20 overflow-hidden">
        <Reveal>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={Values}
          alt=""
          className="w-full h-full object-cover"
        />

        {/* Orange Overlay */}
        <div className="absolute inset-0 bg-gray-100"></div>
      </div>


      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">

          <div className="flex justify-center mb-3">
            <img
              src="/images/logo-icon.png"
              alt="CargoPulse"
              className="w-10 h-10 object-contain"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-orange-600">
            Value CargoPulse
          </h2>

        </div>


        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {values.map((value) => (
            <div
              key={value.number}
              className="relative pt-8"
            >

              {/* Number */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl font-bold text-white/40">
                {value.number}
              </span>


              {/* Card */}
              <div className="relative bg-white border-4 border-orange-500 rounded-xl min-h-77 pt-10 px-6 pb-14 text-center shadow-lg">

                {/* Card Title */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-5 py-2 rounded-md w-[85%]">
                  <h3 className="text-sm font-semibold">
                    {value.title}
                  </h3>
                </div>


                {/* Text */}
                <div className="text-gray-600 text-xs leading-6 space-y-2 mt-3">
                  {value.text}
                </div>


                {/* Icon Circle */}
                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 w-20 h-20 bg-white border-4 border-orange-500 rounded-full flex items-center justify-center shadow-md">

                  <span className="text-3xl">
                    {value.icon}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
        </Reveal>
    </section>
  );
};

export default Value;