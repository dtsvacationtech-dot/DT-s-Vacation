"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const milestones = [
  {
    year: "The Beginning",
    title: "A Calling to Serve",
    body: "DT's Vacation & Travel Ltd. was born not from a business plan, but from a heartfelt calling. Denis Thomas, rooted deep in Jamaican culture and guided by faith, saw how transformative travel could be — and set out to make it accessible, personal, and extraordinary for every client.",
  },
  {
    year: "The Vision",
    title: "Boutique, Never Generic",
    body: "From the very first booking, Denis refused to offer cookie-cutter packages. Every itinerary is hand-crafted, every hotel personally vetted, and every detail — from airport transfers to wedding centerpieces — is planned with the same care you would give a close friend.",
  },
  {
    year: "Today & Beyond",
    title: "Jamaica to the World",
    body: "What started as a local Jamaica specialist has expanded into a full-service international travel consultancy. From Caribbean Cruise packages and Jamaican resort retreats to European honeymoons and corporate conferences — DT's Vacation brings the warmth of the Caribbean to every corner of the world.",
  },
];

export default function AboutStory() {
  return (
    <section className="relative bg-deep-navy py-24 md:py-32 overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-900/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 relative">
          
          {/* LEFT: Premium Sticky Images (Fixes the "Solid/Heavy" issue) */}
          <div className="lg:col-span-6 relative">
            <div className="sticky top-32 h-fit mb-12 lg:mb-0">
              
              <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto lg:mr-auto">
                {/* Image 1: Main background portrait */}
                <div className="absolute top-0 right-0 w-[85%] h-[90%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
                  <ImageWithSkeleton
                    src="/images/hero_hotels.jpg"
                    alt="Luxury Travel Experience"
                    fill
                    className="object-cover transition-transform duration-[10s] group-hover:scale-105"
                    skeletonClassName="skeleton-shimmer-dark"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-deep-navy/20 mix-blend-overlay" />
                </div>

                {/* Image 2: Overlapping foreground landscape (Adds airiness and depth) */}
                <div className="absolute bottom-0 left-0 w-[65%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.7)] border-4 border-deep-navy group">
                  <ImageWithSkeleton
                    src="/images/luxury_cruise_top_1776115596156.png"
                    alt="Premium Service"
                    fill
                    className="object-cover transition-transform duration-[10s] group-hover:scale-110"
                    skeletonClassName="skeleton-shimmer-dark"
                    sizes="(max-width: 1024px) 70vw, 30vw"
                  />
                </div>

                {/* Floating Glass Badge (Tucked elegantly) */}
                <div className="absolute top-8 left-0 lg:-left-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                  <p className="text-tropical-gold font-bold text-[10px] uppercase tracking-widest mb-1">
                    Rooted In
                  </p>
                  <p className="text-white font-heading font-bold text-xl leading-tight">
                    Faith &<br/>Purpose
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT: Elegant Story Content (Scrollable) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="mb-16">
              <p className="text-tropical-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
                The Journey Behind the Journey
              </p>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Our Story.
              </h2>
            </div>
            
            {/* Story Chapters without rigid lines (Fixes the "misaligned/เหลื่อม" issue) */}
            <div className="flex flex-col gap-12 md:gap-16">
              {milestones.map((item, i) => (
                <div key={item.year} className="relative pl-6 md:pl-10 group">
                  
                  {/* Clean left border highlight instead of clunky dots */}
                  <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-white/10 group-hover:bg-tropical-gold transition-colors duration-500 rounded-full" />
                  
                  <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                    {item.year}
                  </p>
                  <h3 className="font-heading font-bold text-white text-2xl md:text-3xl mb-4 group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 font-light leading-relaxed text-[15px] md:text-lg">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* In-flow Mission Statement Block */}
            <div className="mt-20 pt-16 border-t border-white/10">
              <blockquote className="relative">
                <svg className="absolute -top-6 -left-4 w-12 h-12 text-tropical-gold/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-white font-heading font-semibold text-xl md:text-2xl leading-relaxed italic z-10 relative">
                  To be the agency that treats every traveler like family — bringing 
                  <span className="text-tropical-gold px-1">intentional adventures</span>, 
                  seamless planning, and unforgettable memories to every soul we serve.
                </p>
              </blockquote>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
