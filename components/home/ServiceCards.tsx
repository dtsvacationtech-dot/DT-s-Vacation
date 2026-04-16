"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const hotels = [
  {
    id: 1,
    name: "Catalonia Montego Bay",
    location: "Montego Bay, Jamaica",
    region: "Caribbean",
    flag: "🇯🇲",
    price: "112",
    image: "/images/hotel_catalonia.webp",
    badge: "DT's Pick",
  },
  {
    id: 2,
    name: "The Royal Arabian",
    location: "Palm Jumeirah, Dubai, UAE",
    region: "Middle East",
    flag: "🇦🇪",
    price: "980",
    image: "/images/hotel_dubai.webp",
    badge: null,
  },
  {
    id: 3,
    name: "Sakura Sky Lodge",
    location: "Shinjuku, Tokyo, Japan",
    region: "Asia",
    flag: "🇯🇵",
    price: "320",
    image: "/images/hotel_tokyo.webp",
    badge: null,
  },
  {
    id: 4,
    name: "Palais du Lumière",
    location: "7th Arrondissement, Paris, France",
    region: "Europe",
    flag: "🇫🇷",
    price: "750",
    image: "/images/hotel_paris.webp",
    badge: null,
  },
  {
    id: 5,
    name: "Grand Palladium Jamaica",
    location: "Point Lucea, Jamaica",
    region: "Caribbean",
    flag: "🇯🇲",
    price: "145",
    image: "/images/hotel_palladium.webp",
    badge: null,
  },
  {
    id: 6,
    name: "Atlantic Cliffs Resort",
    location: "Camps Bay, Cape Town, South Africa",
    region: "Africa",
    flag: "🇿🇦",
    price: "290",
    image: "/images/hotel_capetown.webp",
    badge: null,
  },
];

const destinations = [
  "🇯🇲 Caribbean",
  "🇫🇷 Europe",
  "🇯🇵 Asia",
  "🇦🇪 Middle East",
  "🇺🇸 Americas",
  "🇿🇦 Africa",
  "🇦🇺 Pacific",
  "🇮🇳 South Asia",
  "🇧🇷 Latin America",
  "🇬🇧 United Kingdom",
];

const stats = [
  { value: "50+", label: "Countries" },
  { value: "200+", label: "Partner Hotels" },
  { value: "6", label: "Continents" },
  { value: "24/7", label: "Concierge Support" },
];

export default function ServiceCards() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="hotels">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
            Global Collection
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-deep-navy mb-6 tracking-tight">
            Hotels Around The World
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            From Caribbean retreats to European palaces, Asian sanctuaries to
            desert icons — we partner with premium hotels across{" "}
            <span className="font-semibold text-deep-navy">50+ destinations worldwide</span>{" "}
            to craft your perfect stay.
          </p>
        </div>

        {/* ── Animated Destination Ticker ── */}
        <div className="relative mb-14 overflow-hidden">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-3 animate-ticker whitespace-nowrap">
            {[...destinations, ...destinations].map((dest, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 bg-[#faf9f8] text-deep-navy text-sm font-medium flex-shrink-0 hover:border-tropical-gold hover:bg-tropical-gold/5 transition-colors duration-200 cursor-default"
              >
                {dest}
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-6 rounded-2xl bg-[#faf9f8] border border-gray-100"
            >
              <span className="text-3xl font-extrabold text-deep-navy mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Hotel Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group relative bg-[#faf9f8] rounded-[2rem] overflow-hidden shadow-glass hover:shadow-2xl transition-all duration-500 ease-out flex flex-col cursor-pointer border border-gray-100"
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
                <h4 className="text-2xl font-heading font-bold text-deep-navy mb-3 line-clamp-2">
                  {hotel.name}
                </h4>

                <div className="flex items-start gap-2 mb-6 text-gray-500">
                  <svg
                    className="w-5 h-5 text-tropical-gold flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm leading-relaxed">{hotel.location}</span>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Rates starting from
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-deep-navy">US$</span>
                      <span className="text-3xl font-extrabold text-deep-navy">
                        {hotel.price}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-12 h-12 rounded-full bg-[#faf9f8] flex items-center justify-center text-deep-navy group-hover:bg-deep-navy group-hover:text-white transition-colors duration-300 shadow-sm"
                    aria-label={`View ${hotel.name}`}
                  >
                    <svg
                      className="w-5 h-5 -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Global CTA Strip ── */}
        <div className="relative overflow-hidden rounded-[2rem] bg-deep-navy px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Decorative world-grid SVG background */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
            viewBox="0 0 800 200"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Latitude lines */}
            {[20, 60, 100, 140, 180].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="white" strokeWidth="0.5" />
            ))}
            {/* Longitude lines */}
            {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="white" strokeWidth="0.5" />
            ))}
            {/* Globe arcs */}
            <ellipse cx="400" cy="100" rx="380" ry="90" fill="none" stroke="white" strokeWidth="0.8" />
            <ellipse cx="400" cy="100" rx="200" ry="90" fill="none" stroke="white" strokeWidth="0.5" />
            <ellipse cx="400" cy="100" rx="100" ry="90" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>

          {/* Glow accent */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-tropical-gold/20 blur-[80px] pointer-events-none" />

          {/* Left: Text */}
          <div className="relative z-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="text-2xl">🌐</span>
              <p className="text-tropical-gold text-[11px] font-bold uppercase tracking-[0.3em]">
                Your Destination, Anywhere
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3 tracking-tight">
              Don&apos;t see your destination?
            </h3>
            <p className="text-white/60 text-base font-light max-w-lg">
              We book premium hotels in virtually any country in the world.
              Just tell us where you want to go — we&apos;ll handle the rest.
            </p>
          </div>

          {/* Right: CTA */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href="mailto:dtvacationandtravel@gmail.com"
              className="inline-flex items-center gap-3 bg-tropical-gold text-deep-navy font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors duration-300 shadow-lg text-sm uppercase tracking-wider whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us to Book
            </a>
            <a
              href="tel:8768569812"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-colors duration-300 text-sm uppercase tracking-wider whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>

      </div>

      {/* ── Ticker Keyframe ── */}
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 28s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
