import Image from "next/image";

export default function WeddingHero() {
  return (
    <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-[#1a0a06]">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0">
        <Image
          src="/images/wedding_couple.webp"
          alt="Couple walking on beach at sunset"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay: transparent top, dark warm bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a06]/90 via-[#1a0a06]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a06]/50 via-transparent to-transparent" />
      </div>

      {/* Content anchored to bottom-left */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 lg:px-16 pb-20 md:pb-28">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[#d4a87a]" />
          <p className="text-[#d4a87a] text-[10px] font-bold uppercase tracking-[0.4em]">
            The Wedding Suite
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-tight leading-[1.0] mb-6 max-w-3xl">
          A Journey as Unique
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a87a] via-[#f0c89a] to-[#d4a87a]">
            as Your Bond.
          </span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10">
          Your wedding or honeymoon isn&apos;t just an event — it&apos;s the beginning of a
          lifelong adventure. You deserve a planner who is as passionate and loving
          as the occasion itself.
        </p>

        <a
          href="mailto:dtvacationandtravel@gmail.com?subject=Wedding Planning Enquiry"
          className="inline-flex items-center gap-3 bg-[#d4a87a] text-[#1a0a06] font-bold px-8 py-4 rounded-full hover:bg-[#f0c89a] transition-all duration-300 shadow-xl text-sm uppercase tracking-wider"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Start Planning Your Dream Wedding
        </a>
      </div>
    </section>
  );
}
