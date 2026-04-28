"use client";

import { useEnquiry } from "@/context/EnquiryContext";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function ToursCTA() {
  const { openModal } = useEnquiry();

  return (
    <div className="bg-[#faf9f8]">

      {/* ── Quote Strip ── */}
      <section className="pt-8 pb-16 lg:pt-10 lg:pb-20 px-6 lg:px-16 text-center max-w-[1200px] mx-auto">
        <p className="text-tropical-gold text-xs font-bold uppercase tracking-[0.4em] mb-6">
          Our Philosophy
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-deep-navy tracking-tight leading-tight italic">
          &ldquo;The world is a book, and those who do not travel read only one page.&rdquo;
        </h2>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="w-12 h-[1px] bg-gray-300" />
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
            Saint Augustine
          </p>
          <div className="w-12 h-[1px] bg-gray-300" />
        </div>
      </section>

      {/* ── Full-width Image CTA Banner ── */}
      <section className="px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-[1600px] mx-auto relative rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,10,40,0.2)]">
          
          {/* Background Image */}
          <div className="relative h-[420px] md:h-[500px]">
            <ImageWithSkeleton
              src="/images/hero_tours.webp"
              alt="Stunning panoramic view of a tropical tour destination"
              fill
              skeletonClassName="skeleton-shimmer"
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/90 via-deep-navy/70 to-deep-navy/40" />
          </div>

          {/* CTA Content */}
          <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 lg:p-20 gap-10">
            
            <div className="relative z-10 max-w-xl">
              <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-5">
                Ready For Your Next Adventure?
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Let Us Design Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold via-yellow-200 to-tropical-gold">
                  Perfect Itinerary.
                </span>
              </h3>
              <p className="text-blue-100/70 text-lg font-light leading-relaxed max-w-md">
                Tell us your dream destination, and our experts will create a bespoke tour tailored to your interests, pace, and budget.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => openModal("tours")}
                className="cursor-pointer flex items-center justify-center gap-3 bg-tropical-gold text-deep-navy font-bold py-4 px-8 rounded-full hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_30px_rgba(235,180,0,0.2)] text-sm uppercase tracking-wider w-full whitespace-nowrap"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Plan My Tour
              </button>
              <a
                href="https://wa.me/18768569812"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm uppercase tracking-wider w-full whitespace-nowrap"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (876) 856-9812
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
