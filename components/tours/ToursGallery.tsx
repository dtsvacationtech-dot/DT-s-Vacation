"use client";

import { useState } from "react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

type Tour = {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  span?: string; // grid span class
};

const localTours: Tour[] = [
  {
    id: 1,
    title: "Dunn's River Falls",
    location: "Ocho Rios, Jamaica",
    category: "Nature & Adventure",
    image: "/images/tour_dunns_river.webp",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Ocho Rios Beach",
    location: "Ocho Rios, Jamaica",
    category: "Beach & Relaxation",
    image: "/images/tour_dunns_beach.webp",
  },
  {
    id: 3,
    title: "Rose Hall Great House",
    location: "Montego Bay, Jamaica",
    category: "Culture & Heritage",
    image: "/images/tour_rose_hall.webp",
  },
  {
    id: 4,
    title: "Bamboo River Rafting",
    location: "Martha Brae, Jamaica",
    category: "Water Adventure",
    image: "/images/tour_bamboo_raft_1776115624127.webp",
    span: "md:col-span-2",
  },
  {
    id: 5,
    title: "Jungle ATV Safari",
    location: "St. Ann, Jamaica",
    category: "Thrill Seeker",
    image: "/images/tour_jungle_atv_1776115609750.webp",
  },
  {
    id: 13,
    title: "Seven Mile Beach",
    location: "Negril, Jamaica",
    category: "Sunset Coast",
    image: "/images/tour_negril.webp",
    span: "md:col-span-2",
  },
  {
    id: 6,
    title: "Heritage Walking Tour",
    location: "Kingston, Jamaica",
    category: "History & Culture",
    image: "/images/tour_history_1776115655578.webp",
  },
];

const overseasTours: Tour[] = [
  {
    id: 7,
    title: "Santorini Sunset",
    location: "Santorini, Greece",
    category: "European Escape",
    image: "/images/tour_santorini.webp",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 8,
    title: "Machu Picchu Trek",
    location: "Cusco, Peru",
    category: "World Wonder",
    image: "/images/tour_machu_picchu.webp",
  },
  {
    id: 9,
    title: "Bali Temple Trail",
    location: "Ubud, Bali",
    category: "Spiritual Journey",
    image: "/images/tour_bali.webp",
  },
  {
    id: 10,
    title: "Grace Bay Beach",
    location: "Providenciales, Turks & Caicos",
    category: "Island Getaway",
    image: "/images/tour_turks.webp",
    span: "md:col-span-2",
  },
  {
    id: 11,
    title: "Stingray City",
    location: "Grand Cayman, Cayman Islands",
    category: "Ocean Adventure",
    image: "/images/tour_cayman.webp",
  },
  {
    id: 14,
    title: "Swiss Alps Adventure",
    location: "Zermatt, Switzerland",
    category: "Mountain Escape",
    image: "/images/tour_swiss.webp",
    span: "md:col-span-2",
  },
  {
    id: 12,
    title: "Tulum Ruins",
    location: "Riviera Maya, Mexico",
    category: "Caribbean History",
    image: "/images/tour_mexico.webp",
  },
];

export default function ToursGallery() {
  const [activeTab, setActiveTab] = useState<"local" | "overseas">("local");
  const tours = activeTab === "local" ? localTours : overseasTours;

  return (
    <section className="pt-10 pb-20 md:pb-28 bg-[#faf9f8]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-[1px] bg-tropical-gold" />
              <p className="text-tropical-gold text-[11px] font-bold uppercase tracking-[0.35em]">
                Curated Experiences
              </p>
              <div className="w-10 h-[1px] bg-tropical-gold" />
            </div>
            <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-heading font-extrabold text-deep-navy tracking-[-0.02em] leading-[1.08]">
              Unforgettable
              <br />
              <span className="text-tropical-gold">Tours.</span>
            </h1>
          </div>
          <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md md:text-right">
            From Jamaica&apos;s iconic waterfalls to the ancient wonders of the world — we craft journeys that stay with you forever.
          </p>
        </div>

        {/* ── iOS Segmented Control ── */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex bg-gray-100 rounded-2xl p-1.5 shadow-inner">
            <div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-3px)] bg-deep-navy rounded-xl shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: activeTab === "local" ? "translateX(0)" : "translateX(100%)",
              }}
            />
            <button
              onClick={() => setActiveTab("local")}
              className={`cursor-pointer relative z-10 px-8 py-3 rounded-xl text-sm font-bold tracking-wider transition-colors duration-300 min-w-[160px] ${
                activeTab === "local" ? "text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Local
            </button>
            <button
              onClick={() => setActiveTab("overseas")}
              className={`cursor-pointer relative z-10 px-8 py-3 rounded-xl text-sm font-bold tracking-wider transition-colors duration-300 min-w-[160px] ${
                activeTab === "overseas" ? "text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overseas
            </button>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] md:auto-rows-[260px] gap-4 md:gap-5">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className={`group relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,10,40,0.08)] hover:shadow-[0_20px_50px_rgba(0,10,40,0.15)] transition-all duration-700 ${tour.span || ""}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <ImageWithSkeleton
                  src={tour.image}
                  alt={tour.title}
                  fill
                  skeletonClassName="skeleton-shimmer"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Category Badge */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-block bg-white/15 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/10">
                  {tour.category}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-white text-xl md:text-2xl font-heading font-bold tracking-tight mb-1.5 drop-shadow-md">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-2 text-white/60 text-sm font-light">
                  <svg className="w-3.5 h-3.5 text-tropical-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {tour.location}
                </div>

                {/* Hover reveal arrow */}
                <div className="overflow-hidden mt-4">
                  <div className="flex items-center text-tropical-gold font-bold text-xs uppercase tracking-widest gap-2 transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Explore
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
