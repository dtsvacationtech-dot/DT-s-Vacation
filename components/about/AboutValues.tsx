"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const values = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/>
      </svg>
    ),
    title: "Faith-Driven Service",
    body: "Every booking is approached with integrity and genuine care. Our faith drives us to go above and beyond — not just to meet expectations, but to exceed them in ways clients never anticipated.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
      </svg>
    ),
    title: "Meticulous Attention to Detail",
    body: "From cuisine preferences to the perfect sunset view at your hotel room — nothing is too small. We ask the right questions to ensure your journey is tailored specifically to you.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: "Family-First Culture",
    body: "We treat every client like a member of our own family. Our warm, personal approach means you will always feel heard, supported, and genuinely valued — not just as a booking number.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: "Local Through Global",
    body: "Our deep Jamaican roots give us an authentic insider advantage in the Caribbean. Combine that with our international network of partners and you get the best of both worlds — local warmth at a global scale.",
  },
];

export default function AboutValues() {
  return (
    <section className="relative bg-deep-navy py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,rgba(0,45,98,0.5)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-16">
        
        {/* Section Label */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20">
          <div>
            <p className="text-tropical-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
              What Drives Us
            </p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
              Our Core Values
            </h2>
          </div>
          <p className="text-gray-400 font-light text-base leading-relaxed max-w-md">
            These are not just words on a wall — they are the principles that guide every call, 
            every booking, and every trip we plan.
          </p>
        </div>

        {/* Values 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((val, i) => (
            <div
              key={val.title}
              className={`group relative bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-tropical-gold/30 rounded-[2rem] p-8 md:p-10 transition-all duration-500 cursor-default ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-tropical-gold/10 border border-tropical-gold/20 text-tropical-gold flex items-center justify-center mb-6 group-hover:bg-tropical-gold group-hover:text-deep-navy transition-all duration-300">
                {val.icon}
              </div>
              <h3 className="font-heading font-bold text-white text-xl md:text-2xl mb-4">
                {val.title}
              </h3>
              <p className="text-gray-300 font-light leading-relaxed text-[15px]">
                {val.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="mt-20 rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute inset-0">
            <ImageWithSkeleton
              src="/images/hero_cruises.jpg"
              alt="Plan Your Next Journey"
              fill
              className="object-cover"
              skeletonClassName="skeleton-shimmer-dark"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-deep-navy/80 backdrop-blur-sm" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-10 md:px-16 py-14">
            <div>
              <p className="text-tropical-gold text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Ready to Begin?</p>
              <h3 className="font-heading font-bold text-white text-3xl md:text-4xl">
                Let&apos;s Plan Your<br className="hidden md:block"/> Next Adventure
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="bg-tropical-gold hover:bg-white text-deep-navy font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(235,180,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-center"
              >
                Get in Touch
              </a>
              <a
                href="/#hotels"
                className="border border-white/30 hover:border-white text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-center hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
