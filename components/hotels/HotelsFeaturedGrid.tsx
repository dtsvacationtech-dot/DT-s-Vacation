"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { buildExpediaHotelUrl } from "@/lib/expedia";

const hotels = [
  {
    id: 1,
    name: "Iberostar Grand Rose Hall",
    location: "Rose Hall, Montego Bay, Jamaica",
    region: "Caribbean",
    flag: "🇯🇲",
    price: "189",
    stars: 5,
    image: "/images/hotel_iberostar.webp",
    badge: "DT's Pick",
    denisesNote: "Stunning adults-only resort. The infinity pool at night is magical — world-class service every step of the way.",
    expediaDestination: "Iberostar Grand Rose Hall Jamaica",
  },
  {
    id: 2,
    name: "The Royal Arabian",
    location: "Palm Jumeirah, Dubai, UAE",
    region: "Middle East",
    flag: "🇦🇪",
    price: "980",
    stars: 5,
    image: "/images/hotel_dubai.webp",
    badge: null,
    denisesNote: "Unmatched luxury. Perfect for those who want to experience the absolute pinnacle of service.",
    expediaDestination: "Dubai",
  },
  {
    id: 3,
    name: "Sakura Sky Lodge",
    location: "Shinjuku, Tokyo, Japan",
    region: "Asia",
    flag: "🇯🇵",
    price: "320",
    stars: 4,
    image: "/images/hotel_tokyo.webp",
    badge: null,
    denisesNote: "Incredible city views. The location is perfect for exploring both modern and historic Tokyo.",
    expediaDestination: "Shinjuku Tokyo",
  },
  {
    id: 4,
    name: "Palais du Lumière",
    location: "7th Arrondissement, Paris, France",
    region: "Europe",
    flag: "🇫🇷",
    price: "750",
    stars: 5,
    image: "/images/hotel_paris.webp",
    badge: null,
    denisesNote: "Classic Parisian elegance. You can see the Eiffel Tower sparkling from the executive lounge.",
    expediaDestination: "Paris",
  },
  {
    id: 5,
    name: "Grand Palladium Jamaica",
    location: "Point Lucea, Jamaica",
    region: "Caribbean",
    flag: "🇯🇲",
    price: "145",
    stars: 5,
    image: "/images/hotel_palladium.webp",
    badge: null,
    denisesNote: "One of the largest pools in Jamaica. Great for both couples and large family groups.",
    expediaDestination: "Grand Palladium Jamaica",
  },
  {
    id: 6,
    name: "Atlantic Cliffs Resort",
    location: "Camps Bay, Cape Town, South Africa",
    region: "Africa",
    flag: "🇿🇦",
    price: "290",
    stars: 5,
    image: "/images/hotel_capetown.webp",
    badge: null,
    denisesNote: "The sunset views over the Atlantic here are truly life-changing. Highly recommended.",
    expediaDestination: "Camps Bay Cape Town",
  },
];

export default function HotelsFeaturedGrid() {
  const handleBook = (destination: string) => {
    const url = buildExpediaHotelUrl({ destination });
    window.open(url, "_blank");
  };

  return (
    <section className="pt-12 pb-24 bg-[#faf9f8] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
            Global Collection
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-deep-navy mb-6 tracking-tight">
            Featured Partner Hotels
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            A selection of our most highly-rated partner properties. Search live rates and availability directly on Expedia.
          </p>
        </div>

        {/* ── Hotel Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => handleBook(hotel.expediaDestination)}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-glass hover:shadow-2xl transition-all duration-500 ease-out flex flex-col cursor-pointer border border-gray-100"
            >
              {/* DT's Pick badge */}
              {hotel.badge && (
                <div className="absolute top-6 left-6 z-20 bg-tropical-gold/90 backdrop-blur-md text-deep-navy text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-lg">
                  {hotel.badge}
                </div>
              )}

              {/* Country / Region badge — top right */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 bg-[#000c1c]/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                <span className="text-sm leading-none">{hotel.flag}</span>
                <span>{hotel.region}</span>
              </div>

              {/* Image */}
              <div className="relative w-full h-72 overflow-hidden bg-gray-200">
                <ImageWithSkeleton
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow relative bg-white z-10 transition-transform duration-500 group-hover:-translate-y-2 rounded-t-[2rem] -mt-6">
                
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < hotel.stars ? "text-tropical-gold" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <h4 className="text-2xl font-heading font-bold text-deep-navy mb-3 line-clamp-2">
                  {hotel.name}
                </h4>

                <div className="flex items-start gap-2 mb-4 text-gray-500">
                  <svg className="w-5 h-5 text-tropical-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm leading-relaxed">{hotel.location}</span>
                </div>

                {/* Denise's Note */}
                <div className="bg-tropical-gold/5 border border-tropical-gold/10 rounded-xl p-4 mb-6 relative">
                  <div className="absolute -top-3 left-4 bg-white px-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-tropical-gold">Denise's Note</span>
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed">"{hotel.denisesNote}"</p>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Check rates on Expedia
                    </span>
                    <div className="flex items-center gap-1 text-deep-navy font-bold group-hover:text-tropical-gold transition-colors">
                      Search Dates
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-[#faf9f8] flex items-center justify-center text-deep-navy group-hover:bg-tropical-gold group-hover:text-white transition-colors duration-300 shadow-sm">
                    <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
