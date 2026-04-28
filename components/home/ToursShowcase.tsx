"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { useState } from "react";
import Link from "next/link";

type Tour = {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
};

const localTours: Tour[] = [
  {
    id: 1,
    title: "Dunn's River Falls",
    location: "Ocho Rios, Jamaica",
    category: "NATURE & ADVENTURE",
    image: "/images/tour_dunns_river.webp",
  },
  {
    id: 2,
    title: "Ocho Rios Beach",
    location: "Ocho Rios, Jamaica",
    category: "BEACH & RELAXATION",
    image: "/images/tour_dunns_beach.webp",
  },
  {
    id: 3,
    title: "Rose Hall Great House",
    location: "Montego Bay, Jamaica",
    category: "CULTURE & HERITAGE",
    image: "/images/tour_rose_hall.webp",
  },
];

const overseasTours: Tour[] = [
  {
    id: 4,
    title: "Grace Bay Beach",
    location: "Providenciales, Turks & Caicos",
    category: "ISLAND GETAWAY",
    image: "/images/tour_turks.webp",
  },
  {
    id: 5,
    title: "Stingray City",
    location: "Grand Cayman, Cayman Islands",
    category: "OCEAN ADVENTURE",
    image: "/images/tour_cayman.webp",
  },
  {
    id: 6,
    title: "Tulum Ruins",
    location: "Riviera Maya, Mexico",
    category: "CARIBBEAN HISTORY",
    image: "/images/tour_mexico.webp",
  },
];

export default function ToursShowcase() {
  const [activeTab, setActiveTab] = useState<"local" | "overseas">("local");
  const tours = activeTab === "local" ? localTours : overseasTours;

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-[#faf9f8]" id="tours">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
              Curated Experiences
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-deep-navy tracking-tight leading-[1.1]">
              Unforgettable <br /> Tours.
            </h3>
          </div>
          <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm md:text-right">
            From Jamaica&apos;s iconic waterfalls to the pristine beaches of the Caribbean — we craft journeys that stay with you forever.
          </p>
        </div>

        {/* iOS-style Segmented Control */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex bg-gray-100 rounded-2xl p-1.5 shadow-inner">
            {/* Sliding pill background */}
            <div 
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-3px)] bg-deep-navy rounded-xl shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ 
                transform: activeTab === "local" ? "translateX(0)" : "translateX(100%)" 
              }}
            />
            <button 
              onClick={() => setActiveTab("local")}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold tracking-wider transition-colors duration-300 min-w-[160px] ${
                activeTab === "local" ? "text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🏝️ Local
            </button>
            <button 
              onClick={() => setActiveTab("overseas")}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold tracking-wider transition-colors duration-300 min-w-[160px] ${
                activeTab === "overseas" ? "text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🌍 Overseas
            </button>
          </div>
        </div>

        {/* Tour Cards — Expanding Flex Grid */}
        <div className="flex flex-col md:flex-row w-full min-h-[600px] md:h-[600px] gap-4 md:gap-6">
          
          {tours.map((tour, index) => (
            <Link 
              href="/tours"
              key={tour.id}
              className="relative flex-1 min-h-[200px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] md:hover:flex-[1.5] opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards] block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <ImageWithSkeleton 
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-[800ms] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 opacity-70 group-hover:opacity-90" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transform transition-transform duration-500 md:translate-y-4 group-hover:translate-y-0">
                <p className="text-tropical-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] mb-2 uppercase">
                  {tour.category}
                </p>
                <h4 className="text-white text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-1 drop-shadow-md">
                  {tour.title}
                </h4>
                <p className="text-white/60 text-sm font-light mb-4">
                  {tour.location}
                </p>

                {/* Animated hover link */}
                <div className="overflow-hidden">
                  <div className="flex items-center text-white font-medium text-sm gap-2 transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Explore Tour
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}
