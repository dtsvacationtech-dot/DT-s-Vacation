"use client";

import { GROUP_TRAVEL_CONTENT } from "@/lib/siteContent";

export default function GroupTravelIntro() {
  const { hero } = GROUP_TRAVEL_CONTENT;

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Decorative background ambient circles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-tropical-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-deep-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
        {/* Experience Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-tropical-gold/10 border border-tropical-gold/20 mb-8">
          <span className="text-tropical-gold text-xs font-bold uppercase tracking-widest">
            ✨ Over 12 Years of Excellence
          </span>
        </div>

        {/* Lead statement */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-deep-navy leading-[1.25] tracking-tight mb-8">
          Group travel made{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold to-yellow-600">
            personal, seamless, and stress-free.
          </span>
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto mb-10">
          {hero.intro1}
        </p>

        <div className="h-[1px] w-24 bg-tropical-gold/40 mx-auto mb-10" />

        <p className="text-sm sm:text-base md:text-lg text-deep-navy/80 font-medium italic max-w-2xl mx-auto">
          &ldquo;{hero.intro2}&rdquo;
        </p>

        {/* Quick Highlights / Metrics */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
          <div className="bg-[#faf9f8] p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-deep-navy mb-1 font-heading">
              12+ <span className="text-tropical-gold text-2xl">Yrs</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
              Industry Experience
            </p>
          </div>
          <div className="bg-[#faf9f8] p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-deep-navy mb-1 font-heading">
              100% <span className="text-tropical-gold text-2xl">Tailored</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
              Personalized Itineraries
            </p>
          </div>
          <div className="bg-[#faf9f8] p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-deep-navy mb-1 font-heading">
              24/7 <span className="text-tropical-gold text-2xl">Support</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
              Dedicated Group Concierge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
