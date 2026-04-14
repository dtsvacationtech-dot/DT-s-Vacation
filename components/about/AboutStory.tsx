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
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_50%,rgba(0,45,98,0.4)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-tropical-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
            The Journey Behind the Journey
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
            Our Story
          </h2>
        </div>

        {/* Split Layout: Milestones left, Big Image right */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Timeline milestones */}
          <div className="flex flex-col gap-0">
            {milestones.map((item, i) => (
              <div key={item.year} className="flex gap-6 group">
                {/* Vertical line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border-2 border-tropical-gold bg-deep-navy mt-1 flex-shrink-0 group-hover:bg-tropical-gold transition-colors duration-300" />
                  {i < milestones.length - 1 && (
                    <div className="w-[1px] flex-1 bg-white/10 mt-2 mb-2 min-h-[60px]" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-12">
                  <p className="text-tropical-gold text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
                    {item.year}
                  </p>
                  <h3 className="font-heading font-bold text-white text-xl md:text-2xl mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 font-light leading-relaxed text-[15px]">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Stacked images (collage effect) */}
          <div className="relative">
            {/* Main large image */}
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <ImageWithSkeleton
                src="/images/hero_hotels.jpg"
                alt="Luxury Jamaica Travel Experience"
                fill
                className="object-cover"
                skeletonClassName="skeleton-shimmer-dark"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-transparent to-transparent" />
            </div>

            {/* Floating overlay card (bottom-left) */}
            <div className="absolute -bottom-6 -left-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 max-w-[220px] shadow-2xl">
              <p className="text-tropical-gold font-bold text-[11px] uppercase tracking-widest mb-1">
                Rooted In
              </p>
              <p className="text-white font-heading font-bold text-2xl">
                Faith &<br/>Purpose
              </p>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed font-light">
                Every trip we plan carries a deeper intention.
              </p>
            </div>

            {/* Floating accent badge (top-right) */}
            <div className="absolute -top-6 -right-2 md:-right-8 bg-tropical-gold rounded-2xl p-5 shadow-[0_10px_30px_rgba(235,180,0,0.3)]">
              <p className="text-deep-navy font-heading font-bold text-3xl leading-none">10+</p>
              <p className="text-deep-navy/70 text-[10px] font-bold uppercase tracking-widest mt-1">
                Years<br/>Trusted
              </p>
            </div>
          </div>
        </div>

        {/* Full-width mission statement */}
        <div className="mt-24 md:mt-32 border-t border-white/10 pt-16">
          <p className="text-center text-white/50 text-[11px] font-bold uppercase tracking-[0.25em] mb-8">Our Mission</p>
          <blockquote className="text-center max-w-4xl mx-auto">
            <p className="text-white font-heading font-semibold text-2xl md:text-3xl lg:text-4xl leading-relaxed">
              &ldquo;To be the agency that treats every traveler like family — 
              bringing <span className="text-tropical-gold">intentional adventures</span>, 
              seamless planning, and 
              <span className="text-tropical-gold"> unforgettable memories</span> to every soul we serve.&rdquo;
            </p>
          </blockquote>
        </div>

      </div>
    </section>
  );
}
