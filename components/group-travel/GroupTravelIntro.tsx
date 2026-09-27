"use client";

import { GROUP_TRAVEL_CONTENT } from "@/lib/siteContent";

export default function GroupTravelIntro() {
  const { hero } = GROUP_TRAVEL_CONTENT;

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f8] relative overflow-hidden border-b border-gray-200/60">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-tropical-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Headline & Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-tropical-gold" />
              <p className="text-tropical-gold text-xs font-bold uppercase tracking-[0.25em]">
                Tailored Group Journeys
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-deep-navy tracking-tight leading-[1.15] mb-6">
              Group travel crafted to be{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold to-yellow-600">
                seamless, personal &amp; effortless.
              </span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed mb-6">
              {hero.intro1}
            </p>

            {/* 3 Value Pillars in clean row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-deep-navy/5 flex items-center justify-center shrink-0 text-deep-navy">
                  <svg className="w-4 h-4 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-deep-navy">
                  Bespoke Planning
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-deep-navy/5 flex items-center justify-center shrink-0 text-deep-navy">
                  <svg className="w-4 h-4 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-deep-navy">
                  Group Rates &amp; Perks
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-deep-navy/5 flex items-center justify-center shrink-0 text-deep-navy">
                  <svg className="w-4 h-4 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-deep-navy">
                  End-to-End Support
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Quote Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_10px_35px_rgba(0,12,28,0.06)] border border-gray-100 relative">
              {/* Subtle gold quote mark */}
              <span className="text-5xl text-tropical-gold/30 font-serif leading-none block mb-2 select-none">
                &ldquo;
              </span>

              <p className="text-deep-navy/85 text-base sm:text-lg font-light leading-relaxed italic mb-6">
                {hero.intro2}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-deep-navy text-tropical-gold flex items-center justify-center font-bold text-sm shrink-0 font-heading shadow-sm">
                  DT
                </div>
                <div>
                  <p className="font-heading font-bold text-deep-navy text-sm">
                    DT&apos;s Vacation &amp; Travel Limited
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    Personalized Group Concierge
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
