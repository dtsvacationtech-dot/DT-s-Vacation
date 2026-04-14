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
    <section className="relative bg-[#FAFAFA] py-24 md:py-32 overflow-hidden border-t border-white/10 shadow-[inset_0_40px_80px_rgba(0,0,0,0.05)]">
      
      {/* Air ambient light to keep it premium but breathable */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-tropical-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[100px] pointer-events-none" />

      {/* Elegant Faint Grid Pattern (Light) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }} 
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 relative">
          
          {/* LEFT: Premium Sticky Images */}
          <div className="lg:col-span-6 relative">
            <div className="sticky top-32 h-fit mb-12 lg:mb-0">
              
              <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto lg:mr-auto">
                {/* Image 1: Main background portrait */}
                <div className="absolute top-0 right-0 w-[85%] h-[90%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                  <ImageWithSkeleton
                    src="/images/hero_hotels.jpg"
                    alt="Luxury Travel Experience"
                    fill
                    className="object-cover transition-transform duration-[10s] group-hover:scale-105"
                    skeletonClassName="skeleton-shimmer-light"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-deep-navy/10 mix-blend-overlay" />
                </div>

                {/* Image 2: Overlapping foreground landscape */}
                <div className="absolute bottom-0 left-0 w-[65%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-4 border-white group">
                  <ImageWithSkeleton
                    src="/images/luxury_cruise_top_1776115596156.png"
                    alt="Premium Service"
                    fill
                    className="object-cover transition-transform duration-[10s] group-hover:scale-110"
                    skeletonClassName="skeleton-shimmer-light"
                    sizes="(max-width: 1024px) 70vw, 30vw"
                  />
                </div>

                {/* Floating Glass Badge (Refined for light mode) */}
                <div className="absolute top-8 left-0 lg:-left-8 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                  <p className="text-tropical-gold font-bold text-[10px] uppercase tracking-widest mb-1 drop-shadow-sm">
                    Rooted In
                  </p>
                  <p className="text-deep-navy font-heading font-bold text-xl leading-tight">
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
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-deep-navy tracking-tight leading-[1.1]">
                Our Story.
              </h2>
            </div>
            
            {/* Story Chapters */}
            <div className="flex flex-col gap-12 md:gap-16">
              {milestones.map((item, i) => (
                <div key={item.year} className="relative pl-6 md:pl-10 group">
                  
                  {/* Clean left border highlight */}
                  <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gray-200 group-hover:bg-tropical-gold transition-colors duration-500 rounded-full" />
                  
                  <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                    {item.year}
                  </p>
                  <h3 className="font-heading font-bold text-deep-navy text-2xl md:text-3xl mb-4 group-hover:text-black transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-[15px] md:text-lg">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full-width Premium Quote Block */}
        <div className="mt-32 pt-24 border-t border-gray-200 relative flex justify-center">
          
          {/* Faint massive background quotation mark */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[15rem] leading-none font-serif text-black/[0.02] select-none pointer-events-none">
            &ldquo;
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <p className="text-tropical-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-8 relative z-20">
              Our Core Mission
            </p>
            <p className="font-heading font-medium text-2xl md:text-3xl lg:text-4xl text-deep-navy leading-relaxed md:leading-[1.6]">
              To be the agency that treats every traveler like family — bringing 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8860B]"> intentional adventures</span>, 
              seamless planning, and unforgettable memories to every soul we serve.
            </p>
            
            {/* Small decorative element at bottom */}
            <div className="flex justify-center items-center gap-4 mt-12 opacity-80">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-tropical-gold" />
              <div className="w-2 h-2 rotate-45 bg-tropical-gold" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-tropical-gold" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
