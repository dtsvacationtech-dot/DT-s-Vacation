import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import Link from "next/link";

export default function CruiseShowcase() {
  // Data derived from the official Wix content
  const cruiseDestinations = [
    { title: "Sun-Soaked Caribbean", desc: "Tropical escapes to the most pristine beaches.", icon: "🏝️" },
    { title: "Treasures of Europe", desc: "Immersive cultural voyages across historical ports.", icon: "🏛️" },
    { title: "Wonders of Alaska", desc: "Breathtaking wilderness and glacier viewing.", icon: "🏔️" }
  ];

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-[#faf9f8] relative overflow-hidden" id="cruises">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        
        {/* Centered Title & Teaser Area */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-8 md:mb-12 relative z-10">
          <h2 className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-tropical-gold/50"></span>
            On a Journey of Discovery
            <span className="w-8 h-[1px] bg-tropical-gold/50"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-deep-navy tracking-tight leading-[1.1] mb-8">
            Explore the World,<br className="hidden md:block"/> One Port at a Time.
          </h3>
          <p className="text-gray-500 font-light leading-relaxed text-lg md:text-xl max-w-2xl">
            If you’re dreaming of your next getaway but can’t decide on just one destination, a cruise seamlessly offers the best of both worlds. 
            At DT’s Vacation, we make cruise planning effortless.
          </p>
        </div>

        {/* Massive Parallax Window */}
        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Main Image with dramatic slow zoom */}
          <div className="absolute inset-0">
            <ImageWithSkeleton 
              src="/images/cruise_wonder_4k.webp"
              alt="Wonder of the Seas - World's Largest Cruise Ship"
              fill
              skeletonClassName="skeleton-shimmer-dark"
              className="object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-110"
              sizes="100vw"
              priority
            />
          </div>
          
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/30 to-transparent opacity-90 lg:opacity-60 transition-opacity duration-1000 group-hover:opacity-40"></div>

          {/* Floating Interactive Glass Panel at the bottom */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              
              {cruiseDestinations.map((destination, idx) => (
                <div 
                  key={idx}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 hover:bg-white/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex flex-col justify-end min-h-[120px] md:min-h-[160px] group/card"
                >
                  <div className="text-3xl mb-4 opacity-80 group-hover/card:scale-110 group-hover/card:opacity-100 transition-all duration-300 origin-bottom-left">{destination.icon}</div>
                  <h4 className="text-white text-xl md:text-2xl font-bold font-heading mb-2">{destination.title}</h4>
                  <p className="text-white/70 text-sm font-light leading-relaxed">{destination.desc}</p>
                </div>
              ))}

            </div>
          </div>
          
        </div>

        {/* Action Button */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link 
            href="/cruises"
            className="group relative overflow-hidden bg-deep-navy text-white px-10 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(0,20,49,0.2)] hover:bg-tropical-gold hover:shadow-[0_10px_40px_rgba(235,180,0,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer inline-block"
          >
            <span className="relative z-10 flex items-center gap-2">
              EXPLORE CRUISES
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
