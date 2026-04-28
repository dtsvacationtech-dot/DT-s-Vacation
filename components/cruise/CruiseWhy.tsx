import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Expert Travel Advisors",
    description: "Benefit from years of dedicated cruise experience. We know exactly which ships, lines, and cabins fit your unique style and budget.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Exclusive Access",
    description: "Unlock special promotions, cabin upgrades, and generous onboard credits that you simply can't find when booking on your own.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Personalized Itineraries",
    description: "No two travelers are alike. We build comprehensive itineraries and curate shore excursions tailored precisely to your personal preferences.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Flexible Flight Arrangements",
    description: "We coordinate flights from all major airports and seamlessly arrange your ground transfers to ensure a completely stress-free embarkation.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Full-Journey Support",
    description: "Our commitment doesn't end when you set sail. We provide dedicated support before, during, and after your trip so you can travel with complete peace of mind.",
  },
];

export default function CruiseWhy() {
  return (
    <section className="relative bg-[#faf9f8]" id="why-cruise">
      
      {/* Dark Header Strip for Navbar Contrast & Title */}
      <div className="bg-deep-navy pt-40 pb-32 px-6 lg:px-16" style={{ backgroundImage: "url('/images/cruise_divina_5k.webp')", backgroundPosition: "center", backgroundSize: "cover", backgroundBlendMode: "overlay", backgroundColor: "rgba(0,12,28,0.88)" }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-[1px] bg-tropical-gold" />
            <p className="text-tropical-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]">
              The DT's Advantage
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.05] mb-6">
            Why Book With Us?
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-12">
            Make your vacation completely stress-free with our cruise packages. All you have to do is pack your bags and get ready to sail away on the experience of a lifetime.
          </p>
        </div>
      </div>

      {/* Main Content Area - overlaps the dark header */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 -mt-16 relative z-10">
        
        {/* Content Box */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12 lg:p-20">
          
          {/* 5 Pillar Cards - Light Theme */}
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] group relative p-8 lg:p-10 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
              >
                {/* Number */}
                <span className="absolute top-8 right-8 text-gray-100 font-heading font-extrabold text-6xl leading-none select-none transition-colors duration-500 group-hover:text-gray-50">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-deep-navy/5 border border-deep-navy/10 flex items-center justify-center text-deep-navy mb-6 group-hover:bg-tropical-gold group-hover:text-white transition-all duration-300 relative z-10">
                  {pillar.icon}
                </div>

                <h3 className="text-xl font-heading font-bold text-deep-navy mb-4 tracking-wide relative z-10 pr-6">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed relative z-10">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Philosophy Strip */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mt-12">
            <div className="absolute inset-0">
              <ImageWithSkeleton
                src="/images/cruise_ovation_4k.webp"
                alt="Effortless cruise travel"
                fill
                className="object-cover object-[center_30%]"
                skeletonClassName="skeleton-shimmer-dark"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/95 via-deep-navy/70 to-transparent" />
            </div>

            <div className="relative z-10 p-10 lg:p-16 flex flex-col items-start gap-6 max-w-2xl">
              <svg className="w-12 h-12 text-tropical-gold rotate-45 mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
                Effortless Travel,<br />
                <span className="text-tropical-gold">from Takeoff to Dock.</span>
              </h3>
              <p className="text-gray-300 text-lg font-light leading-relaxed">
                We'll coordinate your flights, arrange your transfers, and confirm every travel detail before you even step foot on the ship.
              </p>
              <a
                href="#cruise-enquiry"
                className="mt-4 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-deep-navy transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Plan Your Trip
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
