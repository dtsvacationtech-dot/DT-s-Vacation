
import HotelsSearch from "./HotelsSearch";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  style: ["normal", "italic"] 
});

export default function HotelsHero() {
  return (
    <section className="relative z-20 min-h-[90vh] flex flex-col justify-center pt-32 pb-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-deep-navy">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hotel_bg_4k_compressed.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#faf9f8]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 w-full mt-20 md:mt-10 flex flex-col items-center">

        {/* Header Content */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-tropical-gold animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/90">
              Expedia partner
            </span>
          </div>

          <h1 className={`text-5xl md:text-7xl lg:text-[5.5rem] ${playfair.className} text-white leading-[1.1] mb-6 animate-fade-in-up`} style={{ animationDelay: "100ms" }}>
            <span className="font-normal text-white/90">Rest with</span> <br className="md:hidden" />
            <span className="font-medium italic text-transparent bg-clip-text bg-gradient-to-br from-tropical-gold via-yellow-200 to-tropical-gold pr-2 drop-shadow-md">Intention.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed tracking-wide animate-fade-in-up px-2 sm:px-0" style={{ animationDelay: "200ms" }}>
            Discover exceptional stays, handpicked for the discerning traveler. Search our global network with exclusive partner rates.
          </p>
        </div>

        {/* Search Widget */}
        <div className="w-full animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <HotelsSearch />
        </div>

      </div>
    </section>
  );
}
