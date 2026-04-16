export default function CorporateCTA() {
  return (
    <div className="bg-[#faf9f8]">
      {/* ── Our Promise Section ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 text-center max-w-[1200px] mx-auto">
        <p className="text-tropical-gold text-xs font-bold uppercase tracking-[0.4em] mb-6">
          Our Promise
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-deep-navy tracking-tight leading-tight italic">
          &ldquo;Explore. Dream. Discover.&rdquo;
        </h2>
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="w-12 h-[1px] bg-gray-300" />
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
            DT&apos;s Vacation &amp; Travel Limited
          </p>
          <div className="w-12 h-[1px] bg-gray-300" />
        </div>
      </section>

      {/* ── Call to Action Block (Dark Card iOS Style) ── */}
      <section className="px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-[1400px] mx-auto bg-deep-navy rounded-[2.5rem] lg:rounded-[3rem] p-10 md:p-16 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-deep-navy/20">
          
          {/* Decorative glow inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-tropical-gold/50 to-transparent" />
          <div className="absolute -top-40 -left-20 w-96 h-96 rounded-full bg-tropical-gold/10 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Your Next Executive Trip,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-gold to-yellow-200">
                Perfectly Orchestrated.
              </span>
            </h3>

            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Let us take the logistics off your plate. One conversation is all it
              takes to build a travel system that works.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="mailto:dtvacationandtravel@gmail.com?subject=Corporate Consultation Request"
                className="inline-flex items-center justify-center gap-3 bg-tropical-gold text-deep-navy font-bold px-8 py-4 lg:px-10 lg:py-5 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl shadow-tropical-gold/20 text-sm uppercase tracking-wider w-full sm:w-auto"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Request Consultation
              </a>
              <a
                href="tel:8768569812"
                className="inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold px-8 py-4 lg:px-10 lg:py-5 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm uppercase tracking-wider w-full sm:w-auto"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
