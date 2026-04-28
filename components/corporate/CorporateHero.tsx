"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import Link from "next/link";
import { useEnquiry } from "@/context/EnquiryContext";

export default function CorporateHero() {
  const { openModal } = useEnquiry();
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-deep-navy">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithSkeleton
          src="/images/corporate_hero_skyline.webp"
          alt="City skyline at blue hour"
          fill
          className="object-cover object-center"
          skeletonClassName="skeleton-shimmer-dark"
          priority
          sizes="100vw"
        />
        {/* Multi-layer overlay for "Power Suit" deep navy feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-deep-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/60 via-transparent to-transparent" />
      </div>

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tropical-gold to-transparent z-20" />

      {/* Breadcrumb */}
      <div className="absolute top-32 left-6 lg:left-16 z-20">
        <nav className="flex items-center gap-2 text-white/40 text-xs font-medium tracking-widest uppercase">
          <Link href="/" className="hover:text-tropical-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-tropical-gold">Corporate</span>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-16 pb-24 pt-48">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-tropical-gold" />
            <p className="text-tropical-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]">
              Corporate Logistics
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-tight leading-[1.0] mb-6">
            Precision
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold to-yellow-200">
              in Motion.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10">
            In the corporate world, time is the ultimate currency. You need a
            travel partner who is as meticulous and organized as your own
            executive team.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => openModal("corporate")}
              className="cursor-pointer inline-flex items-center gap-3 bg-tropical-gold text-deep-navy font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl shadow-tropical-gold/20 text-sm uppercase tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Request a Consultation
            </button>
            <a
              href="#why-partner"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Learn More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-white text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-white/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
