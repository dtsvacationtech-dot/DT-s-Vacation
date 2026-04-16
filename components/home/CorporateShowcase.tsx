import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import Link from "next/link";

export default function CorporateShowcase() {
  return (
    <section className="py-24 bg-white" id="corporate">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        
        {/* Premium Corporate Split Card */}
        <div className="w-full bg-deep-navy rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row-reverse relative">
          
          {/* Subtle gold accent line at the top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tropical-gold/10 via-tropical-gold to-tropical-gold/10 z-20"></div>

          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 p-6 md:p-16 lg:p-20 flex flex-col justify-center z-10 relative">
            <h2 className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
              Bold & Strategic
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              Elevate Your <br /> Corporate Vision.
            </h3>
            
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-12 max-w-lg">
              Transform your next executive retreat or team-building event into a masterpiece of tropical luxury. From focused strategy sessions on oceanfront terraces to exclusive private catamaran charters, we orchestrate seamless corporate logistics that inspire pure synergy.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 mt-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                   <svg className="w-5 h-5 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-wide">Executive Retreats</h4>
                  <p className="text-sm text-gray-400 font-light max-w-[200px] leading-relaxed">Premium oceanfront meeting spaces.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                   <svg className="w-5 h-5 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-wide">Team Building</h4>
                  <p className="text-sm text-gray-400 font-light max-w-[200px] leading-relaxed">Bespoke Caribbean excursions.</p>
                </div>
              </div>
            </div>

            <div className="mt-14 flex flex-col sm:flex-row gap-4">
              <Link
                href="/corporate"
                className="inline-flex items-center gap-2 bg-tropical-gold text-deep-navy px-8 py-4 rounded-full font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-black/20"
              >
                Plan Your Event
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/corporate"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300 text-sm"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Left Image Overlapping Collage */}
          <div className="w-full lg:w-1/2 p-4 md:p-12 lg:p-16 flex flex-col justify-center border-r border-white/10 relative overflow-hidden">
            {/* Subtle backdrop glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-tropical-gold/10 blur-[100px] rounded-full z-0"></div>

            <div className="relative z-10 flex flex-col w-full">
              
              {/* Top Main Image: Catamaran (Aligned Right) */}
              <div className="relative w-[90%] md:w-[85%] aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] ml-auto group">
                <ImageWithSkeleton 
                  src="/images/corporate_activity_1776114758134.webp"
                  alt="Luxury Corporate Catamaran"
                  fill
                  skeletonClassName="skeleton-shimmer-dark"
                  className="object-cover transition-transform duration-[3000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {/* Bottom Overlapping Image: Meeting (Aligned Left) */}
              <div className="relative w-[85%] md:w-[75%] aspect-[16/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[6px] md:border-[8px] border-deep-navy -mt-16 md:-mt-32 z-20 group">
                <ImageWithSkeleton 
                  src="/images/corporate_meeting_1776114742944.webp"
                  alt="Corporate Meeting"
                  fill
                  skeletonClassName="skeleton-shimmer-dark"
                  className="object-cover transition-transform duration-[3000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
