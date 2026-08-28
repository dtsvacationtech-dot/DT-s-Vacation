"use client";

import { useState } from "react";
import { heroSlides } from "@/lib/mockData";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import Link from "next/link";
import { useEnquiry } from "@/context/EnquiryContext";

export default function HeroCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { openPromotions } = useEnquiry();

  const currentSlide = heroSlides[activeIdx] || heroSlides[0];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full overflow-hidden bg-deep-navy font-body flex flex-col justify-between pt-32 sm:pt-36 md:pt-40 lg:pt-48 pb-8 lg:pb-12">
      
      {/* ── Background Slides (Cinematic Cross-Fade) ── */}
      {heroSlides.map((slide, index) => {
        const isActive = index === activeIdx;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <ImageWithSkeleton
                src={slide.image}
                alt={slide.title}
                fill
                quality={85}
                skeletonClassName="skeleton-shimmer-dark"
                className={`object-cover object-center transform transition-transform duration-[10000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                priority={index === 0}
                sizes="100vw"
              />
            </div>
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#000c1c]/95 via-[#000c1c]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000c1c] via-[#000c1c]/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(212,160,23,0.12)_0%,transparent_60%)]" />
          </div>
        );
      })}

      {/* ── Main Hero Content Area (Balanced with comfortable gap below Navbar) ── */}
      <div className="relative z-10 max-w-[1700px] mx-auto w-full px-4 md:px-8 lg:px-12 flex-1 flex flex-col justify-center pt-2 md:pt-4">
        <div className="max-w-3xl text-white">
          <div key={`hero-info-${currentSlide.id}`} className="animate-fade-in-up">
            
            {/* Special Offers Pill Banner */}
            <div className="mb-3.5 inline-block">
              <button
                type="button"
                onClick={openPromotions}
                className="cursor-pointer inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs text-white transition-all shadow-lg group hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tropical-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-tropical-gold"></span>
                </span>
                <span className="font-bold text-tropical-gold uppercase tracking-wider text-[10px] md:text-[11px]">Special Offers Available</span>
                <span className="text-white/50 hidden sm:inline">•</span>
                <span className="text-white/90 hidden sm:inline text-xs">Easter &amp; Island Hopper Specials</span>
                <span className="text-tropical-gold group-hover:translate-x-1 transition-transform ml-1 font-bold">→</span>
              </button>
            </div>

            {/* Location Tag */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-tropical-gold" />
              <p className="text-tropical-gold font-bold tracking-[0.25em] uppercase text-xs drop-shadow-md">
                {currentSlide.locationTag}
              </p>
            </div>

            {/* Title */}
            <h1 className="text-3.5xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-heading font-extrabold leading-[1.06] mb-4 md:mb-5 tracking-tight drop-shadow-2xl text-white">
              {currentSlide.title}
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg font-light mb-6 md:mb-7 max-w-2xl leading-relaxed drop-shadow-md">
              {currentSlide.description}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 md:gap-4">
              <Link
                href={currentSlide.ctaLink}
                className="bg-tropical-gold hover:bg-yellow-300 text-deep-navy font-bold py-3.5 md:py-4 px-7 md:px-8 rounded-full transition-all duration-300 text-xs md:text-sm uppercase tracking-wider shadow-[0_8px_25px_rgba(212,160,23,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2.5"
              >
                <span>{currentSlide.ctaText}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <button
                type="button"
                onClick={openPromotions}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 md:py-4 px-5 md:px-6 rounded-full transition-all duration-300 text-xs md:text-sm uppercase tracking-wider backdrop-blur-md border border-white/20 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>🔥</span>
                <span>View Promotions</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── 5 Business Areas (Side-by-Side, Hover Scale, Direct Link, No Auto-Advance) ── */}
      <div className="relative z-20 max-w-[1700px] mx-auto w-full px-4 md:px-8 lg:px-12 mt-4 lg:mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
            Explore All 5 Business Areas
          </p>
        </div>

        {/* 5-Column Side-by-Side Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-3.5 w-full">
          {heroSlides.map((slide, index) => {
            const isSelected = index === activeIdx;
            return (
              <Link
                key={slide.id}
                href={slide.ctaLink}
                onMouseEnter={() => setActiveIdx(index)}
                onFocus={() => setActiveIdx(index)}
                className={`group relative overflow-hidden rounded-2xl p-3.5 md:p-4 flex flex-col justify-end transition-all duration-300 ease-out cursor-pointer border ${
                  isSelected
                    ? "h-32 sm:h-40 md:h-48 bg-white/15 border-tropical-gold shadow-[0_10px_30px_rgba(212,160,23,0.3)] scale-[1.03] ring-1 ring-tropical-gold/50"
                    : "h-28 sm:h-36 md:h-44 bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/10 hover:scale-[1.02] opacity-85 hover:opacity-100"
                }`}
              >
                {/* Background Thumbnail */}
                <div className="absolute inset-0 z-0">
                  <ImageWithSkeleton
                    src={slide.image}
                    alt={slide.cardTitle}
                    fill
                    skeletonClassName="skeleton-shimmer-dark"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 160px, 300px"
                  />
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    isSelected 
                      ? "bg-gradient-to-t from-deep-navy via-deep-navy/70 to-transparent opacity-95"
                      : "bg-gradient-to-t from-deep-navy via-black/60 to-black/30 group-hover:opacity-85"
                  }`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-tropical-gold text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
                      0{index + 1}
                    </span>
                    <span className={`w-2 h-2 rounded-full transition-all ${
                      isSelected ? "bg-tropical-gold scale-125" : "bg-white/30 group-hover:bg-white/70"
                    }`} />
                  </div>

                  <h3 className={`font-heading font-extrabold leading-tight transition-colors ${
                    isSelected ? "text-white text-base md:text-lg" : "text-white/90 text-sm md:text-base group-hover:text-white"
                  }`}>
                    {slide.cardTitle}
                  </h3>

                  <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-white/10">
                    <span className="text-[9px] md:text-[10px] text-white/70 font-medium group-hover:text-tropical-gold transition-colors">
                      Open Page →
                    </span>
                  </div>
                </div>

                {/* Top Active Gold Bar Indicator */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-tropical-gold" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}
