"use client";

import Image from "next/image";

export default function AccreditationsShowcase() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#fdfbf9] relative overflow-hidden" id="accreditations">
      {/* Subtle Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tropical-gold/30 to-transparent" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-tropical-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tropical-gold/10 border border-tropical-gold/30 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-tropical-gold animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-tropical-gold">
              Government Certified &bull; Globally Affiliated
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-extrabold text-deep-navy tracking-tight leading-[1.15] mb-5 sm:mb-6">
            Official Accreditations &amp; Trusted Affiliations
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto px-2">
            DT&apos;s Vacation &amp; Travel Limited is fully licensed and recognized by the Jamaican government tourism authorities and global travel consortiums.
          </p>
        </div>

        {/* 2 Balanced Luxury Accreditation Cards (Centered 2-Column Grid) */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          
          {/* 1. Ministry of Tourism (Jamaica) */}
          <div className="group relative rounded-[2rem] sm:rounded-[2.5rem] p-7 sm:p-9 lg:p-10 bg-white border border-gray-200/90 hover:border-tropical-gold shadow-[0_10px_35px_rgba(0,12,28,0.06)] hover:shadow-[0_20px_50px_rgba(212,160,23,0.18)] transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5">
            <div>
              {/* Official Logo Display Box */}
              <div className="h-28 sm:h-32 w-full rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 border border-emerald-900/15 flex items-center justify-center p-3 sm:p-4 mb-6 sm:mb-8 group-hover:border-emerald-500/40 transition-all shadow-sm">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Image
                    src="/images/jamaica_coat_of_arms.png"
                    alt="Government of Jamaica Coat of Arms"
                    width={110}
                    height={95}
                    className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[8.5px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-800 leading-tight block">
                      GOVERNMENT OF JAMAICA
                    </span>
                    <span className="text-[15px] sm:text-[17px] font-heading font-black text-deep-navy tracking-tight leading-tight block mt-0.5 sm:mt-1">
                      MINISTRY OF<br />TOURISM
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-wider block mt-1">
                      Official Licensing Body
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-3.5">
                Official Government License
              </div>

              {/* Text */}
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-deep-navy group-hover:text-[#002D62] transition-colors mb-1.5">
                Ministry of Tourism
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3.5">
                Regulatory Authority &bull; Jamaica
              </p>
              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                Registered and fully compliant under the Travel Agencies Regulation Act governed by Jamaica&apos;s Ministry of Tourism.
              </p>
            </div>

            {/* Footer Verification */}
            <div className="mt-8 pt-4 sm:pt-5 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-mono">
              <span className="text-gray-700 font-semibold">Reg: MOT-JM-876</span>
              <span className="text-emerald-600 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" /> Active License
              </span>
            </div>
          </div>

          {/* 2. Expedia Group TAAP */}
          <div className="group relative rounded-[2rem] sm:rounded-[2.5rem] p-7 sm:p-9 lg:p-10 bg-white border border-gray-200/90 hover:border-tropical-gold shadow-[0_10px_35px_rgba(0,12,28,0.06)] hover:shadow-[0_20px_50px_rgba(212,160,23,0.18)] transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5">
            <div>
              {/* Official Logo Display Box */}
              <div className="h-28 sm:h-32 w-full rounded-2xl bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-900/10 flex items-center justify-center p-3 sm:p-4 mb-6 sm:mb-8 group-hover:border-blue-500/30 transition-all shadow-sm">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Expedia Airplane & Globe Logo */}
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-[#00005a] flex items-center justify-center shadow-sm relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 border-2 border-[#ffcb00] rounded-full" />
                    {/* Yellow Airplane Icon */}
                    <svg className="w-6 sm:w-7 h-6 sm:h-7 text-[#ffcb00] -rotate-45 transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[17px] sm:text-[20px] font-heading font-black text-[#00005a] tracking-tight block leading-none">
                      expedia group
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#002D62] block mt-1">
                      PARTNER NETWORK
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 block mt-0.5">
                      TAAP Global Affiliate
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100/80 border border-blue-300 text-[10px] sm:text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-3.5">
                Global Booking Network
              </div>

              {/* Text */}
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-deep-navy group-hover:text-[#002D62] transition-colors mb-1.5">
                Expedia Group Partner
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3.5">
                TAAP Travel Affiliate
              </p>
              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                Direct access to Expedia&apos;s global inventory of 500,000+ luxury hotels, 500+ airlines, and major worldwide cruise lines.
              </p>
            </div>

            {/* Footer Verification */}
            <div className="mt-8 pt-4 sm:pt-5 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-mono">
              <span className="text-gray-700 font-semibold">Tier-1 TAAP ID</span>
              <span className="text-blue-600 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Certified Partner
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Trust Guarantee Banner (Centered Balance) */}
        <div className="max-w-5xl mx-auto mt-10 sm:mt-14 p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-start sm:items-center gap-3.5">
            <span className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-tropical-gold/15 text-tropical-gold flex items-center justify-center text-lg shrink-0 mt-0.5 sm:mt-0">
              🛡️
            </span>
            <div>
              <p className="font-bold text-deep-navy text-sm sm:text-base">
                100% Verified Travel Governance &amp; Consumer Protection
              </p>
              <p className="text-xs sm:text-sm text-gray-500 font-light mt-0.5 leading-relaxed">
                Every reservation made through DT&apos;s Vacation &amp; Travel Ltd. is safeguarded under certified Jamaican tourism regulations and international travel partner warranties.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-bold text-deep-navy uppercase tracking-wider shrink-0 w-full sm:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-gray-200">
              🇯🇲 Kingston, Jamaica
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-gray-200">
              🌍 Worldwide Operations
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
