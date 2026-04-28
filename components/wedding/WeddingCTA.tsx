"use client";

import { useEnquiry } from "@/context/EnquiryContext";

export default function WeddingCTA() {
  const { openModal } = useEnquiry();

  return (
    <section className="bg-[#fdf9f5] px-4 md:px-8 lg:px-16 pb-24">
      <div className="max-w-[1400px] mx-auto rounded-[2.5rem] lg:rounded-[3rem] p-10 md:p-16 lg:p-24 text-center relative overflow-hidden border border-[#d4a87a]/20 shadow-[0_40px_80px_rgba(180,120,60,0.12)] bg-gradient-to-br from-[#3d2314] via-[#5a3220] to-[#1a0a06]">

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#d4a87a]/40 to-transparent" />
          <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#d4a87a]/10 blur-[130px]" />
          <div className="absolute -bottom-32 -left-20 w-[24rem] h-[24rem] rounded-full bg-[#c07a40]/10 blur-[100px]" />
        </div>

        <div className="relative z-10">
          <p className="text-[#d4a87a] text-xs font-bold uppercase tracking-[0.4em] mb-6">
            Ready to Begin?
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Let Us Craft Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a87a] via-[#f0c89a] to-[#d4a87a]">
              Perfect Beginning.
            </span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            One conversation is all it takes to turn your dream wedding into an
            intentional, beautifully orchestrated reality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto">
            <button
              onClick={() => openModal("wedding")}
              className="cursor-pointer flex items-center justify-center gap-3 bg-[#d4a87a] text-[#1a0a06] font-bold py-4 px-8 rounded-full hover:bg-[#f0c89a] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_30px_rgba(212,168,122,0.2)] text-sm uppercase tracking-wider w-full sm:flex-1 whitespace-nowrap"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="16" r="5" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5l-2.5 4h5l-2.5-4zM12 4.5v-2m-3 3l-1.5-1.5m7.5 1.5l1.5-1.5" />
              </svg>
              Start Planning
            </button>
            <a
              href="https://wa.me/18768569812"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm uppercase tracking-wider w-full sm:flex-1 whitespace-nowrap"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (876) 856-9812
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
