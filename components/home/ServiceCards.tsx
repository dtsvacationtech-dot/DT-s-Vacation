import Image from "next/image";

const hotels = [
  {
    id: 1,
    name: "Catalonia Montego Bay",
    location: "Catalonia Montego Bay, Rosehall Parish, Half Moon St, Montego Bay, Jamaica",
    price: "112",
    image: "/images/hotel_catalonia.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Grand Palladium Jamaica",
    location: "Grand Palladium Lady Hamilton Resort & Spa, Point Lucea, Lucea, Jamaica",
    price: "145",
    image: "/images/hotel_palladium.jpg",
    featured: false,
  },
  {
    id: 3,
    name: "Grand Palladium Lady Hamilton",
    location: "Grand Palladium Lady Hamilton Resort & Spa, Point Lucea, Lucea, Jamaica",
    price: "140",
    image: "/images/hotel_lady_hamilton.jpg",
    featured: false,
  }
];

export default function ServiceCards() {
  return (
    <section className="py-24 bg-white" id="hotels">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
            Exclusive Stays
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-deep-navy mb-6 tracking-tight">
            Premium Jamaican Resorts
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Experience uncompromised luxury and breathtaking Caribbean views. We have curated the finest accommodations across Jamaica for your perfect escape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div 
              key={hotel.id}
              className="group relative bg-[#faf9f8] rounded-[2rem] overflow-hidden shadow-glass hover:shadow-2xl transition-all duration-500 ease-out flex flex-col cursor-pointer border border-gray-100"
            >
              {hotel.featured && (
                <div className="absolute top-6 left-6 z-20 bg-tropical-gold/90 backdrop-blur-md text-deep-navy text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-lg">
                  Top Choice
                </div>
              )}
              
              {/* Image Container */}
              <div className="relative w-full h-72 overflow-hidden bg-gray-200">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow relative bg-white z-10 transition-transform duration-500 group-hover:-translate-y-2 rounded-t-[2rem] -mt-6">
                <h4 className="text-2xl font-heading font-bold text-deep-navy mb-3 line-clamp-2">{hotel.name}</h4>
                
                <div className="flex items-start gap-2 mb-6 text-gray-500">
                  <svg className="w-5 h-5 text-tropical-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm leading-relaxed">{hotel.location}</span>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Rates starting from</span>
                    <div className="flex items-baseline gap-1">
                       <span className="text-lg font-bold text-deep-navy">US$</span>
                       <span className="text-3xl font-extrabold text-deep-navy">{hotel.price}</span>
                    </div>
                  </div>
                  
                  <button className="w-12 h-12 rounded-full bg-[#faf9f8] flex items-center justify-center text-deep-navy group-hover:bg-deep-navy group-hover:text-white transition-colors duration-300 shadow-sm">
                    <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
