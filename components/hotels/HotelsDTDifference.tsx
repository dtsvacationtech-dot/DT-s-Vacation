export default function HotelsDTDifference() {
  const differences = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Advocacy You Can Trust",
      description: "We vet every property. If anything goes wrong during your stay, you have a real person fighting for you — not a chatbot.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Caribbean Expertise",
      description: "Jamaica is our home. Our insider knowledge means you get the hidden gems, not just the tourist traps, when booking island stays.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "TAAP Partner Rates",
      description: "As a certified Expedia TAAP travel agency, we access competitive rates and inventory combinations curated for professionals.",
    },
  ];

  return (
    <section className="py-24 bg-[#faf9f8] relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
            The DT's Difference
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-deep-navy mb-6 tracking-tight">
            Why search through us?
          </h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            Booking a hotel shouldn't just be a transaction. It should come with peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differences.map((diff, index) => (
            <div 
              key={index}
              className="group bg-white p-10 rounded-[2rem] border border-gray-100 shadow-glass hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Subtle hover accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tropical-gold to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 rounded-2xl bg-[#faf9f8] border border-gray-100 flex items-center justify-center text-tropical-gold mb-8 group-hover:scale-110 transition-transform duration-500">
                {diff.icon}
              </div>
              
              <h3 className="text-xl font-heading font-bold text-deep-navy mb-4">
                {diff.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed font-light">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
