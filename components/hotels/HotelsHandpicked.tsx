"use client";

import Image from "next/image";
import { buildExpediaCollectionUrl } from "@/lib/expedia";

export default function HotelsHandpicked() {
  const collections = [
    {
      id: "jamaica-luxury",
      title: "Jamaican Luxury",
      subtitle: "DT's Homeland Picks",
      description: "Sandals, Iberostar, Grand Palladium — the best all-inclusive resorts where Denise has personally stayed.",
      image: "/images/hotel_iberostar.webp", 
      destination: "Montego Bay, Jamaica",
      badge: "DT's Homeland",
      color: "from-[#0F3B20]/90 to-black/80", // Jamaican green hue
    },
    {
      id: "romantic-escapes",
      title: "Romantic Escapes",
      subtitle: "Perfect for Couples",
      description: "Overwater bungalows, cliffside villas, and intimate boutique hotels for couples and honeymooners.",
      image: "/images/hotel_dubai.webp", 
      destination: "Maldives",
      badge: "Most Romantic",
      color: "from-[#4A154B]/90 to-black/80", // Romantic purple/rose hue
    },
    {
      id: "corporate-stays",
      title: "Business Class Stays",
      subtitle: "For The Executive Traveler",
      description: "Properties with premium business centers, executive lounges, and proximity to commercial districts.",
      image: "/images/hotel_tokyo.webp", 
      destination: "Business Hotels",
      badge: "Corporate Ready",
      color: "from-[#1A2B4C]/90 to-black/80", // Corporate navy hue
    },
    {
      id: "european-palaces",
      title: "European Palaces",
      subtitle: "Old World Grandeur",
      description: "Stay where history breathes — grand Parisian hotels, Venetian palazzos, and London townhouses.",
      image: "/images/hotel_paris.webp", 
      destination: "Paris, France",
      badge: "European Collection",
      color: "from-[#8B6508]/90 to-black/80", // Royal amber hue
    },
  ];

  const handleExplore = (destination: string) => {
    const url = buildExpediaCollectionUrl(destination);
    window.open(url, "_blank");
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
              Curated Collections
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-deep-navy tracking-tight">
              Denise's Handpicked
            </h2>
          </div>
          <p className="text-gray-500 font-light max-w-sm">
            Not sure where to go? Browse our curated collections of premium stays tailored to your travel style.
          </p>
        </div>

        {/* Horizontal scroll container on mobile, grid on desktop */}
        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 gap-6 snap-x snap-mandatory hide-scrollbar">
          {collections.map((col) => (
            <div 
              key={col.id}
              className="min-w-[85vw] sm:min-w-[300px] lg:min-w-0 flex-shrink-0 relative h-[450px] rounded-[2rem] overflow-hidden group cursor-pointer snap-center shadow-lg hover:shadow-2xl transition-all duration-500"
              onClick={() => handleExplore(col.destination)}
            >
              {/* Background Image */}
              <Image 
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 85vw, 25vw"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${col.color} opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="inline-flex px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white/90 border border-white/20 mb-4 w-fit">
                  {col.badge}
                </div>
                
                <p className="text-tropical-gold text-sm font-bold tracking-widest uppercase mb-2">
                  {col.subtitle}
                </p>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">
                  {col.title}
                </h3>
                
                {/* Description and button slide up on hover */}
                <div className="overflow-hidden">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white/80 font-light text-sm line-clamp-3 mb-6">
                      {col.description}
                    </p>
                    <button className="flex items-center gap-2 text-sm font-bold text-white group/btn">
                      Explore on Expedia
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
