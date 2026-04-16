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
    <section className="relative bg-[#faf9f8]" id="why-partner">
      
      {/* Dark Header Strip for Navbar Contrast & Title */}
      <div className="bg-deep-navy pt-40 pb-32 px-6 lg:px-16" style={{ backgroundImage: "url('/images/corporate_hero_skyline.webp')", backgroundPosition: "center", backgroundSize: "cover", backgroundBlendMode: "overlay", backgroundColor: "rgba(0,8,20,0.85)" }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-[1px] bg-tropical-gold" />
            <p className="text-tropical-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]">
              Corporate
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.05] mb-6">
            Precision in Motion.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-12">
            In the corporate world, time is the ultimate currency. You need a
            travel partner who is as meticulous and organized as your own
            executive team.
          </p>
        </div>
      </div>

      {/* Main Content Area - overlaps the dark header */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 -mt-16 relative z-10">
        
        {/* Content Box */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12 lg:p-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-5 xl:col-span-4 lg:pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-heading font-bold text-deep-navy tracking-tight leading-tight mb-8">
                Why Partner with a<br />
                <span className="text-tropical-gold">Disciplined Specialist?</span>
              </h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed mb-10">
                We move past the fluff to provide level-headed, no-nonsense travel
                management that keeps your business moving forward.
              </p>
              <div className="w-16 h-[2px] bg-gray-200"></div>
            </div>

            {/* Right: Stunning Image */}
            <div className="lg:col-span-7 xl:col-span-8 relative">
              <div className="relative w-full aspect-[16/10] md:aspect-[21/9] lg:aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                <ImageWithSkeleton
                  src="/images/corporate_exec.webp"
                  alt="Business partners celebrating successful corporate collaboration"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-[1500ms] ease-out"
                  skeletonClassName="bg-gray-100"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
                <p className="text-deep-navy font-bold text-sm tracking-wide mb-1">Unmatched Efficiency</p>
                <p className="text-gray-500 text-xs leading-relaxed">Streamlined itineraries designed entirely around your executive priorities.</p>
              </div>
            </div>
          </div>

          {/* 4 Pillar Cards - Light Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="group relative p-8 lg:p-10 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
              >
                {/* Number */}
                <span className="absolute top-8 right-8 text-gray-100 font-heading font-extrabold text-6xl leading-none select-none transition-colors duration-500 group-hover:text-gray-50">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-deep-navy/5 border border-deep-navy/10 flex items-center justify-center text-deep-navy mb-6 group-hover:bg-tropical-gold group-hover:text-white transition-all duration-300 relative z-10">
                  {pillar.icon}
                </div>

                <h3 className="text-xl font-heading font-bold text-deep-navy mb-4 tracking-wide relative z-10">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed relative z-10">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Philosophy Strip */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Airplane Wing Image */}
            <div className="absolute inset-0">
              <ImageWithSkeleton
                src="/images/corporate_team.webp"
                alt="Corporate Retreat and Team Meeting Overlooking the Ocean"
                fill
                className="object-cover object-[center_30%]"
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
                  to corporate logistics — combining the latest technology
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
                Request Consultation
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
