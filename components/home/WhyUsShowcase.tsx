export default function WhyUsShowcase() {
  const features = [
    {
      title: "Personalized Service",
      description: "We pride ourselves on offering personalized service that caters to your unique travel goals. Small enough for individual attention, experienced enough for exceptional results.",
      icon: (
        <svg className="w-8 h-8 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    },
    {
      title: "Expert Knowledge",
      description: "Our team of seasoned travel experts ensures every detail is seamless. With firsthand experience and insider access, we turn your vacation dreams into reality.",
      icon: (
        <svg className="w-8 h-8 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: "Reliable Support",
      description: "Your comfort and peace of mind are our top priorities. Our dedicated support team is available to assist you before, during, and after your journey worldwide.",
      icon: (
        <svg className="w-8 h-8 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "Our Specialities",
      description: "From serene island escapes to luxury European tours or romantic getaways, we craft tailor-made experiences designed to leave lasting memories.",
      icon: (
        <svg className="w-8 h-8 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="why-us">
      {/* Decorative top border for transition */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        
        {/* Centered Header Area */}
        <div className="max-w-3xl mx-auto text-center mb-12 relative z-10">
          <h2 className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4 inline-block bg-tropical-gold/10 px-4 py-2 rounded-full">
            The DT's Standard
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-deep-navy mb-8 tracking-tight leading-[1.1]">
            Why Choose Us?
          </h3>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            We go beyond simple bookings. We are your dedicated travel architects, engineering unparalleled journeys guided by expertise, heart, and relentless attention to detail.
          </p>
        </div>

        {/* 4-Column Feature Grid (High Scannability) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group"
            >
              {/* Massive Floating Circular Icon */}
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center justify-center mb-5 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgb(235,180,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                {feature.icon}
              </div>
              
              <h4 className="text-xl md:text-2xl font-heading font-bold text-deep-navy mb-4 tracking-wide group-hover:text-tropical-gold transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base px-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Statement */}
        <div className="mt-12 text-center relative z-10 flex flex-col items-center">
          <p className="text-gray-500 font-medium mb-4">
            Ready to experience the DT's standard?
          </p>
          <button className="bg-deep-navy text-white px-10 py-4 rounded-full font-bold shadow-[0_10px_20px_rgba(0,20,49,0.2)] hover:bg-tropical-gold hover:shadow-[0_10px_20px_rgba(235,180,0,0.3)] hover:-translate-y-1 transition-all duration-300">
            Consult a Travel Expert
          </button>
        </div>

      </div>
    </section>
  );
}
