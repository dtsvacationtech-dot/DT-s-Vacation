"use client";

import { useState, useEffect, useCallback } from "react";
import { heroSlides } from "@/lib/mockData";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import Link from "next/link";
import SpecialOffersButton from "@/components/ui/SpecialOffersButton";

export default function HeroCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleSelectSlide = useCallback((index: number) => {
    setActiveIdx((current) => {
      if (index === current) return current;
      setPrevIdx(current);
      return index;
    });
  }, []);

  // Automatic slide rotation (animation slide แบบเดิม)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIdx((current) => {
        setPrevIdx(current);
        return current === heroSlides.length - 1 ? 0 : current + 1;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section 
      className="relative min-h-[92vh] lg:min-h-screen w-full overflow-hidden bg-deep-navy font-body flex flex-col justify-between pt-32 sm:pt-36 md:pt-40 lg:pt-48 pb-8 lg:pb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* ── Background Slides (Silky Smooth Cross-Fade) ── */}
      {heroSlides.map((slide, index) => {
        const isCurrent = index === activeIdx;
        const isPrevious = index === prevIdx;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              isCurrent
                ? "opacity-100 z-10"
                : isPrevious
                ? "opacity-0 z-5"
                : "opacity-0 z-0"
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
                  isCurrent ? "scale-105" : "scale-100"
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

      {/* ── Main Hero Content Area (Overlapping CSS Grid with Smooth Fade-in & Fade-out) ── */}
      <div className="relative z-20 max-w-[1700px] mx-auto w-full px-4 md:px-8 lg:px-12 flex-1 flex flex-col justify-center pt-2 md:pt-4">
        <div className="max-w-3xl text-white grid grid-cols-1 grid-rows-1">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIdx;
            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive
                    ? "opacity-100 translate-y-0 blur-0 pointer-events-auto z-10"
                    : "opacity-0 -translate-y-4 blur-[1px] pointer-events-none z-0"
                }`}
              >
                {/* Location Tag */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-[2px] bg-tropical-gold" />
                  <p className="text-tropical-gold font-bold tracking-[0.25em] uppercase text-xs drop-shadow-md">
                    {slide.locationTag}
                  </p>
                </div>

                {/* Title */}
                <h1 className="text-3.5xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-heading font-extrabold leading-[1.06] mb-4 md:mb-5 tracking-tight drop-shadow-2xl text-white">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-gray-200 text-sm sm:text-base md:text-lg font-light mb-6 md:mb-7 max-w-2xl leading-relaxed drop-shadow-md">
                  {slide.description}
                </p>

                {/* Main Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 md:gap-4">
                  <Link
                    href={slide.ctaLink}
                    tabIndex={isActive ? 0 : -1}
                    className="border border-white/40 bg-white/10 hover:bg-white/20 text-white font-extrabold py-3.5 md:py-4 px-7 md:px-8 rounded-full transition-all duration-300 text-xs md:text-sm uppercase tracking-wider backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white flex items-center gap-2.5 shadow-lg"
                  >
                    <span>{slide.ctaText}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <SpecialOffersButton />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── All 6 Business Areas (One Single Row, Auto-Advance, Hover Pause & Select) ── */}
      <div className="relative z-30 max-w-[1700px] mx-auto w-full px-4 md:px-8 lg:px-12 mt-4 lg:mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
            Explore All {heroSlides.length} Business Areas
          </p>
          <div className="flex items-center gap-2 text-[10px] text-white/60 font-semibold tracking-wider">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-white/40" : "bg-tropical-gold animate-pulse"}`} />
            <span>0{activeIdx + 1} / 0{heroSlides.length}</span>
          </div>
        </div>

        {/* 6 Cards in ONE Single Row across Desktop & Tablet, Horizontal Scroll on Mobile */}
        <div className="flex md:grid md:grid-cols-6 gap-2.5 sm:gap-3 md:gap-3 lg:gap-3.5 w-full overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar snap-x">
          {heroSlides.map((slide, index) => {
            const isSelected = index === activeIdx;
            return (
              <Link
                key={slide.id}
                href={slide.ctaLink}
                onClick={(e) => {
                  if (index !== activeIdx) {
                    e.preventDefault();
                    handleSelectSlide(index);
                  }
                }}
                onMouseEnter={() => handleSelectSlide(index)}
                onFocus={() => handleSelectSlide(index)}
                className={`group relative overflow-hidden rounded-2xl p-3 md:p-3.5 flex flex-col justify-end transition-all duration-500 ease-out cursor-pointer border flex-shrink-0 min-w-[140px] sm:min-w-[160px] md:min-w-0 md:flex-shrink snap-start ${
                  isSelected
                    ? "h-28 sm:h-32 md:h-36 lg:h-40 bg-white/15 border-tropical-gold shadow-[0_10px_30px_rgba(212,160,23,0.3)] scale-[1.02] ring-1 ring-tropical-gold/50 z-10"
                    : "h-28 sm:h-32 md:h-36 lg:h-40 bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/10 hover:scale-[1.01] opacity-75 hover:opacity-100 z-0"
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
                      isSelected ? "bg-tropical-gold scale-125 shadow-[0_0_8px_rgba(212,160,23,0.8)]" : "bg-white/30 group-hover:bg-white/70"
                    }`} />
                  </div>

                  <h3 className={`font-heading font-extrabold leading-tight transition-colors line-clamp-1 ${
                    isSelected ? "text-white text-sm md:text-base lg:text-lg" : "text-white/90 text-xs md:text-sm lg:text-base group-hover:text-white"
                  }`}>
                    {slide.cardTitle}
                  </h3>

                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/10">
                    <span className="text-[9px] md:text-[10px] text-white/70 font-medium group-hover:text-tropical-gold transition-colors">
                      Open Page →
                    </span>
                  </div>
                </div>

                {/* Top Active Gold Progress Bar */}
                {isSelected ? (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 overflow-hidden z-20">
                    <div 
                      key={`progress-${activeIdx}`}
                      className={`h-full bg-tropical-gold ${isPaused ? "w-full" : "animate-hero-progress"}`}
                    />
                  </div>
                ) : (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-white/20 transition-colors z-20" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}
