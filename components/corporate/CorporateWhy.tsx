import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Consistency is Key",
    description:
      "We don't just book flights — we build reliable systems that ensure your team arrives refreshed and ready to perform, every single time.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Forthright Communication",
    description:
      "You will always receive honest, direct advice on cost-saving measures and travel efficiencies — no fluff, no surprises.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Inclusive Solutions",
    description:
      "From large-scale conferences to solo executive trips, every team member's specific needs are met with equal care and compassion.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Persistent Advocacy",
    description:
      "When travel disruptions happen, our persistent and resilient nature means we don't stop until your itinerary is back on track.",
  },
];

export default function CorporateWhy() {
  return (
    <section className="py-24 bg-deep-navy" id="why-partner">
      {/* Gold accent line at top */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-tropical-gold/40 to-transparent mb-24" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-[1px] bg-tropical-gold" />
              <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.35em]">
                Why Choose Us
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.05]">
              Why Partner with a<br />
              <span className="text-tropical-gold">Disciplined Specialist?</span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md lg:text-right">
            We move past the fluff to provide level-headed, no-nonsense travel
            management that keeps your business moving forward.
          </p>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative p-8 lg:p-10 rounded-[2rem] border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-tropical-gold/30 transition-all duration-500"
            >
              {/* Number */}
              <span className="absolute top-8 right-8 text-white/5 font-heading font-extrabold text-7xl leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-tropical-gold/10 border border-tropical-gold/20 flex items-center justify-center text-tropical-gold mb-6 group-hover:bg-tropical-gold/20 transition-colors duration-300">
                {pillar.icon}
              </div>

              <h3 className="text-xl font-heading font-bold text-white mb-4 tracking-wide">
                {pillar.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Philosophy Strip */}
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10">
          {/* Airplane Wing Image */}
          <div className="absolute inset-0">
            <ImageWithSkeleton
              src="/images/corporate_airplane_wing.webp"
              alt="Business travel at sunrise"
              fill
              className="object-cover object-center"
              skeletonClassName="skeleton-shimmer-dark"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-deep-navy/85" />
          </div>

          <div className="relative z-10 p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
                Our Philosophy
              </p>
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed">
                We bring a{" "}
                <span className="font-semibold text-tropical-gold">progressive mindset</span>{" "}
                to corporate logistics — combining the latest travel technology
                with devoted personal service. We handle the{" "}
                <em>&quot;how&quot;</em> so you can focus on the{" "}
                <em>&quot;why.&quot;</em>
              </p>
            </div>

            <a
              href="mailto:dtvacationandtravel@gmail.com?subject=Corporate Consultation Request"
              className="flex-shrink-0 inline-flex items-center gap-3 bg-tropical-gold text-deep-navy font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl text-sm uppercase tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Request a Corporate Consultation
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
