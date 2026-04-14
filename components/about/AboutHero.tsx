"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#000c1c] pt-28 pb-20">
      {/* Background Radial Glow */}
      <div className="absolute top-[-10%] lg:top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-tropical-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* LEFT: Text Content */}
        <div className="lg:col-span-6 z-10 order-2 lg:order-1 pt-8 lg:pt-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full p-1.5 pr-6 mb-8 shadow-xl">
            <div className="bg-tropical-gold text-deep-navy text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
              Our Story
            </div>
            <span className="text-gray-300 text-xs font-medium tracking-wide">
              Est. 2014
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading font-extrabold text-white leading-[1.05] tracking-tight mb-8">
            <span className="block text-5xl md:text-6xl lg:text-[72px] mb-2 drop-shadow-lg">
              Crafting Journeys
            </span>
            <span className="block text-5xl md:text-6xl lg:text-[72px] text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold to-yellow-200">
              With Purpose.
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12">
            What began as a calling to serve others has grown into Jamaica&apos;s most trusted 
            boutique travel experience — built on faith, warmth, and an unwavering 
            commitment to making every journey extraordinary.
          </p>

          {/* Signature of Denis */}
          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 max-w-xl backdrop-blur-md shadow-2xl items-center justify-between group hover:bg-white/[0.07] transition-all">
            <div className="flex flex-col">
              <span className="text-white font-heading font-bold text-xl md:text-3xl tracking-wide group-hover:text-tropical-gold transition-colors">
                Denis Thomas
              </span>
              <span className="text-gray-400 text-xs md:text-sm font-medium tracking-widest uppercase mt-1">
                Founder & CEO
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border border-tropical-gold/30 flex items-center justify-center text-tropical-gold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
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

      {/* Smooth transition into the next deep-navy section */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-deep-navy to-transparent pointer-events-none" />
    </section>
  );
}
