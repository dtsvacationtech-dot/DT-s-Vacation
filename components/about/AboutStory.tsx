"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const chapters = [
  {
    num: "01",
    year: "The Beginning",
    title: "A Calling to Serve",
    body: "DT's Vacation & Travel Ltd. was born not from a business plan, but from a heartfelt calling. Denis Thomas, rooted deep in Jamaican culture and guided by faith, saw how transformative travel could be — and set out to make it accessible, personal, and extraordinary for every client.",
  },
  {
    num: "02",
    year: "The Vision",
    title: "Boutique, Never Generic",
    body: "From the very first booking, Denis refused to offer cookie-cutter packages. Every itinerary is hand-crafted, every hotel personally vetted, and every detail — from airport transfers to wedding centerpieces — is planned with the same care you would give a close friend.",
  },
  {
    num: "03",
    year: "Today & Beyond",
    title: "Jamaica to the World",
    body: "What started as a local Jamaica specialist has expanded into a full-service international travel consultancy. From Caribbean Cruise packages and Jamaican resort retreats to European honeymoons and corporate conferences — we bring the warmth of the Caribbean to every corner of the world.",
  },
];

export default function AboutStory() {
  return (
    <section className="relative bg-[#000c1c] py-24 md:py-32 overflow-hidden">
      {/* Super subtle background glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <p className="text-tropical-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4">
            The Journey Behind the Journey
          </p>
          <h2 className="font-heading font-extrabold text-5xl md:text-6xl text-white tracking-tight">
            Our Story.
          </h2>
        </div>

        {/* Immersive Panoramic Image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] mb-24 group">
          <ImageWithSkeleton
            src="/images/hero_hotels.jpg"
            alt="Luxury Travel Experience"
            fill
            className="object-cover transition-transform duration-[15s] ease-out group-hover:scale-105"
            skeletonClassName="skeleton-shimmer-dark"
            sizes="100vw"
          />
          {/* Subtle inside shadow/vignette to make it feel premium */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] md:rounded-[3rem] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000c1c]/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Floating Tag inside the image (Clean and grounded) */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-tropical-gold" />
             <span className="text-white text-xs font-medium tracking-widest uppercase">10+ Years Trusted</span>
          </div>
        </div>

        {/* 3-Column Story Chapters */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 relative">
          {chapters.map((chapter) => (
            <div key={chapter.num} className="relative group">
              {/* Massive background number for airy design */}
              <div className="absolute -top-12 -left-6 text-[120px] font-heading font-black text-white/[0.03] pointer-events-none select-none transition-colors duration-500 group-hover:text-tropical-gold/[0.05]">
                {chapter.num}
              </div>
              
              <div className="relative z-10 pt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-[1px] bg-tropical-gold" />
                  <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.2em]">
                    {chapter.year}
                  </p>
                </div>
                
                <h3 className="font-heading font-bold text-white text-2xl lg:text-3xl mb-6">
                  {chapter.title}
                </h3>
                
                <p className="text-gray-400 font-light leading-loose text-[15px] lg:text-base">
                  {chapter.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement Block */}
        <div className="mt-32 md:mt-40 relative">
          {/* Decorative brackets */}
          <div className="absolute left-0 top-0 w-8 h-8 border-t border-l border-tropical-gold/50" />
          <div className="absolute right-0 bottom-0 w-8 h-8 border-b border-r border-tropical-gold/50" />
          
          <div className="py-16 px-8 text-center max-w-4xl mx-auto">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Our Core Mission</p>
            <p className="font-heading font-medium text-2xl md:text-3xl lg:text-4xl text-white leading-[1.6]">
              &ldquo;To be the agency that treats every traveler like family — 
              bringing <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold to-yellow-200">intentional adventures</span>, 
              seamless planning, and unforgettable memories to every soul we serve.&rdquo;
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
