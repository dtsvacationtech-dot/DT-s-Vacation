"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { useEnquiry } from "@/context/EnquiryContext";
import { GROUP_TRAVEL_CONTENT } from "@/lib/siteContent";

export default function GroupTravelHero() {
  const { openModal } = useEnquiry();
  const { hero } = GROUP_TRAVEL_CONTENT;

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-end overflow-hidden bg-deep-navy">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithSkeleton
          src={hero.backgroundImage}
          alt="Group of friends and family enjoying luxury vacation in Jamaica"
          fill
          className="object-cover object-center"
          skeletonClassName="skeleton-shimmer-dark"
          priority
          sizes="100vw"
        />
        {/* Deep navy atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/70 via-deep-navy/30 to-transparent" />
      </div>

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tropical-gold to-transparent z-20" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-16 pb-16 sm:pb-24 pt-36 sm:pt-40 md:pt-44">
        <div className="max-w-3xl">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6">
            <span className="w-2 h-2 rounded-full bg-tropical-gold animate-pulse" />
            <span className="text-tropical-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">
              {hero.badge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-tight leading-[1.0] mb-5 sm:mb-6">
            GROUP
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold via-yellow-200 to-white">
              TRAVEL
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-white/95 tracking-wide mb-6">
            {hero.tagline}
          </p>

          {/* Brief teaser paragraph */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8 sm:mb-10">
            {hero.intro1}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => openModal("group", "I would like to plan a Group Travel experience.")}
              className="cursor-pointer inline-flex items-center justify-center gap-3 bg-tropical-gold text-deep-navy font-bold px-8 py-4 sm:py-4.5 rounded-full hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-tropical-gold/25 text-sm uppercase tracking-wider font-heading"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Plan Your Group Trip &rarr;
            </button>
            <a
              href="#experiences"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Explore Experiences
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
