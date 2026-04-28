import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import Link from "next/link";

export default function CruiseHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-deep-navy">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithSkeleton
          src="/images/cruise_wonder_4k.webp"
          alt="Luxury cruise ship navigating the ocean"
          fill
          className="object-cover object-[center_70%]"
          skeletonClassName="skeleton-shimmer-dark"
          priority
          sizes="100vw"
        />
        {/* Multi-layer overlay for deep navy feel and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a3d] via-[#002D62]/60 to-[#002D62]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3d]/70 via-transparent to-transparent" />
      </div>

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tropical-gold to-transparent z-20" />

      {/* Breadcrumb */}
      <div className="absolute top-32 left-6 lg:left-16 z-20">
        <nav className="flex items-center gap-2 text-white/40 text-xs font-medium tracking-widest uppercase">
          <Link href="/" className="hover:text-tropical-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-tropical-gold">Cruises</span>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-16 pb-24 pt-48">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-tropical-gold" />
            <p className="text-tropical-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]">
              Ocean Voyages
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-tight leading-[1.0] mb-6">
            Set Sail on a
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold to-yellow-200">
              Journey of Discovery.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10">
            If you&apos;re dreaming of your next getaway but can&apos;t decide on just one destination, a cruise seamlessly offers the best of both worlds. Explore multiple breathtaking locations while enjoying world-class amenities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#cruise-enquiry"
              className="inline-flex items-center justify-center gap-3 bg-tropical-gold text-deep-navy font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl shadow-tropical-gold/20 text-sm uppercase tracking-wider"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Book a Voyage
            </a>
            <a
              href="#why-cruise"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-sm uppercase tracking-wider"
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
