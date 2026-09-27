"use client";

import { GROUP_TRAVEL_CONTENT } from "@/lib/siteContent";

export default function GroupTravelExpertise() {
  const { expertise, whyTravel } = GROUP_TRAVEL_CONTENT;

  return (
    <section className="py-24 sm:py-32 bg-deep-navy text-white relative overflow-hidden">
      {/* Background ambient gold gradient glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-tropical-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-950/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: "Your Group. Your Vision. Our Expertise." */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Small eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-tropical-gold" />
              <p className="text-tropical-gold text-xs font-bold uppercase tracking-[0.25em]">
                Full-Service Coordination
              </p>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-[1.15] mb-6">
              YOUR GROUP.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold via-yellow-200 to-white">
                YOUR VISION.
              </span>
              <br />
              OUR EXPERTISE.
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-8">
              {expertise.description}
            </p>

            {/* Trust Pill / Accreditation Callout */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-tropical-gold/15 flex items-center justify-center shrink-0 border border-tropical-gold/30">
                  <span className="text-xl">🇯🇲</span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm sm:text-base">
                    Ministry of Tourism Licensed &amp; TAAP Partner
                  </h4>
                  <p className="text-xs text-gray-400 font-light mt-0.5">
                    Official license #MOT-JM-876 • Global airline &amp; resort preferential group inventory
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: "Why Travel with DT's?" (7 Value Pillars) */}
          <div className="lg:col-span-6">
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
              {/* Subtle gold corner highlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-tropical-gold/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <p className="text-tropical-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-2">
                  Unrivaled Peace of Mind
                </p>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                  {whyTravel.heading}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-8 font-light">
                  {whyTravel.subtitle}
                </p>

                {/* 7 Checkmark Pillars List */}
                <div className="space-y-4 sm:space-y-4.5">
                  {whyTravel.points.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all group"
                    >
                      <div className="w-7 h-7 rounded-full bg-tropical-gold/20 flex items-center justify-center shrink-0 border border-tropical-gold/40 group-hover:bg-tropical-gold group-hover:text-deep-navy transition-all">
                        <svg className="w-3.5 h-3.5 text-tropical-gold group-hover:text-deep-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
