"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-deep-navy pt-24 pb-0">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(0,174,239,0.10)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_30%_80%,rgba(235,180,0,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto w-full px-5 md:px-8 lg:px-16 grid lg:grid-cols-2 gap-0 items-end">
        
        {/* LEFT: Text Content */}
        <div className="pb-16 lg:pb-24 z-10 order-2 lg:order-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-tropical-gold/10 border border-tropical-gold/20 rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-tropical-gold animate-pulse" />
            <span className="text-tropical-gold text-[11px] font-bold uppercase tracking-[0.2em]">
              Our Story
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading font-bold text-white leading-[1.12] mb-6">
            <span className="block text-4xl md:text-5xl lg:text-[60px] tracking-tight">
              Crafting Journeys
            </span>
            <span className="block text-4xl md:text-5xl lg:text-[60px] tracking-tight text-tropical-gold">
              With Purpose.
            </span>
          </h1>

          <p className="text-gray-300 text-lg font-light leading-relaxed max-w-lg mb-10">
            What began as a calling to serve others has grown into Jamaica&apos;s most trusted 
            boutique travel experience — built on faith, warmth, and an unwavering 
            commitment to making every journey extraordinary.
          </p>

          {/* Signature of Denis */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col">
              <span className="text-white font-heading font-bold text-xl tracking-wide">Denis Thomas</span>
              <span className="text-tropical-gold text-sm font-medium tracking-widest uppercase text-[11px]">
                Founder & CEO, DT&apos;s Vacation & Travel Ltd.
              </span>
            </div>
            {/* Decorative Line */}
            <div className="flex-1 max-w-[80px] h-[1px] bg-tropical-gold/40" />
          </div>
        </div>

        {/* RIGHT: Denis silhouette photo — anchored to bottom */}
        <div className="relative flex justify-center lg:justify-end items-end order-1 lg:order-2 pt-8 lg:pt-0">
          {/* Glow halo behind the image */}
          <div className="absolute bottom-0 left-0 right-0 mx-auto w-[300px] h-[300px] rounded-full bg-tropical-gold/10 blur-[80px] pointer-events-none" />

          {/* Photo Container */}
          <div className="relative w-[300px] md:w-[380px] lg:w-[450px] aspect-[3/4]">
            <ImageWithSkeleton
              src="/images/Denis Profile.png"
              alt="Denis Thomas – Founder of DT's Vacation & Travel"
              fill
              className="object-cover object-top drop-shadow-2xl"
              skeletonClassName="skeleton-shimmer-dark"
              sizes="(max-width: 768px) 300px, (max-width: 1200px) 380px, 450px"
              priority
            />
            {/* Bottom fade to blend with background */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep-navy to-transparent pointer-events-none" />
          </div>

          {/* Floating Quote Card */}
          <div className="absolute right-0 md:right-8 top-12 lg:top-20 max-w-[220px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
            <svg className="w-5 h-5 text-tropical-gold mb-2 opacity-80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p className="text-white/80 text-xs font-light leading-relaxed italic">
              &ldquo;Every journey I plan is a prayer answered — yours.&rdquo;
            </p>
            <p className="text-tropical-gold text-[10px] font-bold mt-2 tracking-widest uppercase">— Denis T.</p>
          </div>
        </div>

      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
