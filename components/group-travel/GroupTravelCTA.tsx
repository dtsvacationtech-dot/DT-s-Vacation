"use client";

import { useEnquiry } from "@/context/EnquiryContext";
import { GROUP_TRAVEL_CONTENT, CONTACT } from "@/lib/siteContent";

export default function GroupTravelCTA() {
  const { openModal } = useEnquiry();
  const { cta } = GROUP_TRAVEL_CONTENT;

  return (
    <div className="bg-[#faf9f8]">
      {/* ── Brand Motto Section ── */}
      <section className="pt-12 pb-16 px-6 lg:px-16 text-center max-w-[1200px] mx-auto">
        <p className="text-tropical-gold text-xs font-bold uppercase tracking-[0.4em] mb-4">
          Our Brand Promise
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-deep-navy tracking-tight leading-tight">
          &ldquo;{cta.slogan}&rdquo;
        </h2>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="w-12 h-[1px] bg-gray-300" />
          <p className="text-gray-500 text-xs sm:text-sm font-medium tracking-widest uppercase">
            DT&apos;s Vacation &amp; Travel Limited
          </p>
          <div className="w-12 h-[1px] bg-gray-300" />
        </div>
      </section>

      {/* ── Grand Call To Action Dark Box ── */}
      <section className="px-4 md:px-8 lg:px-16 pb-24 relative z-10">
        <div className="max-w-[1400px] mx-auto rounded-[2.5rem] lg:rounded-[3rem] p-10 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,10,30,0.5)] border border-white/10 bg-gradient-to-br from-[#0a182d] via-deep-navy to-[#030914]">
          
          {/* Ambient Lighting Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-tropical-gold/40 to-transparent" />
            <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-tropical-gold/10 blur-[130px]" />
            <div className="absolute -bottom-40 -left-20 w-[25rem] h-[25rem] rounded-full bg-blue-500/10 blur-[110px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6">
              <span className="w-2 h-2 rounded-full bg-tropical-gold animate-ping" />
              <span className="text-tropical-gold text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Start Your Journey
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              {cta.heading}
            </h3>

            {/* Subtext */}
            <p className="text-blue-50/80 text-base md:text-xl font-light max-w-2xl mx-auto mb-4 leading-relaxed">
              {cta.description}
            </p>

            <p className="text-tropical-gold/90 text-sm md:text-base font-medium max-w-xl mx-auto mb-10">
              {cta.subtext}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto">
              {/* Plan Your Group Trip Button */}
              <button
                onClick={() =>
                  openModal(
                    "group",
                    "I would like to plan a custom Group Travel experience with DT's Vacation & Travel Limited."
                  )
                }
                className="cursor-pointer flex items-center justify-center gap-3 bg-tropical-gold text-deep-navy font-bold py-4 px-8 rounded-full hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_30px_rgba(235,180,0,0.25)] text-sm uppercase tracking-wider w-full sm:flex-1 whitespace-nowrap font-heading"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {cta.enquiryCta}
              </button>

              {/* Call or WhatsApp DT's Button */}
              <a
                href={`${CONTACT.whatsapp}?text=Hello%20DT%27s%20Vacation%2C%20I%20would%20like%20to%20plan%20a%20Group%20Travel%20experience.`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm uppercase tracking-wider w-full sm:flex-1 whitespace-nowrap"
              >
                <svg className="w-5 h-5 shrink-0 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {cta.whatsappCta}
              </a>
            </div>

            {/* Direct Phone / Contact text */}
            <div className="mt-8 text-xs text-gray-400 font-light flex items-center justify-center gap-2">
              <span>Direct Concierge Phone:</span>
              <a href={`tel:${CONTACT.phoneLink}`} className="text-white hover:text-tropical-gold underline decoration-white/20 transition-colors font-medium">
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
