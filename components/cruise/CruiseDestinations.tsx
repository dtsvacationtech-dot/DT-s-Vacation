import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const destinations = [
  {
    title: "The Caribbean",
    description: "Sun-soaked escapes to pristine tropical beaches.",
    image: "/images/cruise_bahamas_6k.webp",
    tag: "Tropical",
  },
  {
    title: "Europe",
    description: "Immersive cultural voyages across historical ports.",
    image: "/images/cruise_divina_5k.webp",
    tag: "Cultural",
  },
  {
    title: "Alaska",
    description: "Breathtaking wilderness and glacier viewing.",
    image: "/images/cruise_allure_nassau.webp",
    tag: "Scenic",
  },
];

export default function CruiseDestinations() {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-[#f5f8fc]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-tropical-gold" />
            <p className="text-tropical-gold text-xs font-bold uppercase tracking-[0.35em]">
              Featured Routes
            </p>
            <div className="w-8 h-[1px] bg-tropical-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-deep-navy tracking-tight leading-[1.1]">
            Curated Voyages
          </h2>
        </div>

        {/* 3 Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-20">
          {destinations.map((dest, idx) => (
            <div 
              key={idx}
              className="group relative w-full h-[450px] md:h-[550px] lg:h-[650px] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,10,40,0.1)] cursor-pointer"
            >
              <ImageWithSkeleton
                src={dest.image}
                alt={`Cruise to ${dest.title}`}
                fill
                skeletonClassName="skeleton-shimmer"
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/30 to-transparent transition-opacity duration-500 group-hover:from-deep-navy/95" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 lg:p-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-3 drop-shadow-md">
                  {dest.tag}
                </p>
                <h3 className="text-white text-3xl font-heading font-bold tracking-tight mb-3">
                  {dest.title}
                </h3>
                <p className="text-gray-300 font-light text-sm leading-relaxed max-w-sm">
                  {dest.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feeling Spontaneous? Strip */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-deep-navy via-[#003B7C] to-deep-navy shadow-xl border border-tropical-gold/20 flex flex-col md:flex-row items-center justify-between p-10 lg:p-16 gap-10">
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(235,180,0,0.1)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <span>Feeling Spontaneous?</span>
              <span className="hidden sm:inline-block text-tropical-gold text-2xl">🌍</span>
            </h3>
            <p className="text-blue-100 text-lg font-light leading-relaxed">
              We specialize in exclusive <strong className="text-tropical-gold font-normal">last-minute cruise deals</strong> for travelers ready to embark on an adventure at short notice. Whether you're craving a tropical escape or an exciting new discovery, our team will find the best available offers to fit your schedule and budget.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <a
              href="#cruise-enquiry"
              className="inline-flex items-center justify-center gap-3 bg-white text-deep-navy font-bold px-8 py-5 rounded-full hover:bg-tropical-gold transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.2)] text-sm uppercase tracking-wider w-full sm:w-auto overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Find Deals
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
