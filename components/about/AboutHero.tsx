"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-deep-navy pt-28 pb-20">
      {/* Background Radial Glow */}
      <div className="absolute top-[-10%] lg:top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-tropical-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* LEFT: Biographical Text Content */}
        <div className="lg:col-span-6 z-10 order-2 lg:order-1 pt-8 lg:pt-0">
          
          <div className="flex items-center gap-4 mb-6">
             <div className="w-8 h-[1px] bg-tropical-gold" />
             <p className="text-tropical-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
               The Visionary
             </p>
          </div>

          {/* Editorial Heading */}
          <h1 className="font-heading font-bold text-white leading-[1.1] tracking-tight mb-8">
            <span className="block text-4xl md:text-5xl lg:text-6xl mb-2">
              Meet
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold to-yellow-200">
              Denis Thomas.
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-white font-heading font-medium leading-relaxed mb-6 max-w-lg">
            More than a travel expert — a devoted architect of intentional journeys.
          </h2>

          <p className="text-gray-400 text-base md:text-lg font-light leading-loose max-w-xl mb-12">
            With over a decade of experience crafting unforgettable escapes, Denis leads DT&apos;s Vacation 
            with a singular vision: to treat every traveler like family. Her roots in Jamaican culture 
            and her unwavering faith set the standard for every itinerary, ensuring that your trip is 
            planned with exactly the same care you would give a close friend.
          </p>

          <div className="font-serif text-3xl md:text-4xl text-white/30 italic opacity-80">
            Denis Thomas
          </div>

        </div>

        {/* RIGHT: Framed Portrait Image */}
        <div className="lg:col-span-6 lg:col-start-8 relative flex justify-center lg:justify-end order-1 lg:order-2">
          
          {/* Decorative Elements */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-tropical-gold/20 to-blue-500/20 rounded-[3rem] blur-2xl opacity-50 pointer-events-none" />

          {/* Main Portrait Frame */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] z-10 group">
            <div className="absolute inset-0 bg-deep-navy/20 group-hover:bg-transparent transition-all duration-700 z-10 pointer-events-none" />
            <ImageWithSkeleton
              src="/images/Denis Profile.png"
              alt="Denis Thomas – Founder"
              fill
              className="object-cover object-top transition-transform duration-[10s] group-hover:scale-105"
              skeletonClassName="skeleton-shimmer-dark"
              sizes="(max-width: 1024px) 90vw, 50vw"
              priority
            />
            
            {/* Glossy Overlay inside frame to make it feel like glass */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none z-20" />
            
            {/* The Quote Card - Snapped to bottom of the frame */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#000c1c]/70 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-6 shadow-2xl z-30 transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <svg className="w-6 h-6 text-tropical-gold mb-3 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p className="text-white text-sm md:text-base font-light leading-relaxed italic">
                &ldquo;Every journey I plan is a prayer answered — yours.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-tropical-gold" />
                <p className="text-tropical-gold text-[10px] font-bold tracking-[0.2em] uppercase">Denis T.</p>
              </div>
            </div>

          </div>
          
        </div>

      </div>

      {/* Subtle Static Wave Pattern Divider */}
      <div className="absolute -bottom-1 left-0 right-0 h-16 w-full overflow-hidden z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full text-white/5" fill="currentColor">
          <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" />
        </svg>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full text-tropical-gold/10" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0,10 C150,110 350,10 600,60 C850,110 1050,10 1200,60" />
          <path d="M0,30 C150,130 350,30 600,80 C850,130 1050,30 1200,80" />
        </svg>
      </div>

    </section>
  );
}
