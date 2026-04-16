export default function CorporateCTA() {
  return (
    <section className="py-24 bg-deep-navy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tropical-gold/40 to-transparent" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-tropical-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 text-center relative z-10">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-8 h-[1px] bg-tropical-gold" />
          <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.35em]">
            Ready to Begin
          </p>
          <div className="w-8 h-[1px] bg-tropical-gold" />
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight mb-6">
          Your Next Executive Trip,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold to-yellow-200">
            Perfectly Orchestrated.
          </span>
        </h2>

        <p className="text-gray-400 text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed">
          Let us take the logistics off your plate. One conversation is all it
          takes to build a travel system that works.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="mailto:dtvacationandtravel@gmail.com?subject=Corporate Consultation Request"
            className="inline-flex items-center gap-3 bg-tropical-gold text-deep-navy font-bold px-10 py-5 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl shadow-tropical-gold/20 text-sm uppercase tracking-wider"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Request a Corporate Consultation
          </a>
          <a
            href="tel:8768569812"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-10 py-5 rounded-full hover:bg-white/20 transition-all duration-300 text-sm uppercase tracking-wider"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (876) 856-9812
          </a>
        </div>

        {/* Signature Tagline */}
        <div className="border-t border-white/10 pt-16">
          <p className="text-white/20 text-xs font-medium uppercase tracking-[0.5em] mb-3">
            Our Promise
          </p>
          <p className="text-2xl md:text-3xl font-heading font-bold text-white/50 italic tracking-wide">
            &ldquo;Explore. Dream. Discover.&rdquo;
          </p>
          <p className="text-gray-600 text-sm mt-3 font-light">
            DT&apos;s Vacation &amp; Travel Limited
          </p>
        </div>

      </div>
    </section>
  );
}
