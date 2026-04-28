"use client";

import { useEnquiry } from "@/context/EnquiryContext";

export default function HotelsCTA() {
  const { openModal } = useEnquiry();

  return (
    <div className="bg-[#faf9f8] pt-12 pb-24">
      <section className="px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto rounded-[2.5rem] lg:rounded-[3rem] p-10 md:p-16 lg:p-24 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,10,30,0.5)] border border-white/10 bg-gradient-to-br from-[#0f1f38] via-deep-navy to-[#050b14]">
          
          {/* Ambient Mesh Gradients & Lighting */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-tropical-gold/30 to-transparent" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-tropical-gold/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 tracking-tight leading-[1.1] drop-shadow-sm">
              Not sure where to start?
            </h2>
            <p className="text-blue-50/70 text-lg md:text-xl font-light mb-12 leading-relaxed max-w-2xl mx-auto">
              Let Denise help you find the perfect stay — no search required. We’ll curate options that match your exact style, dates, and budget.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto">
              <button 
                onClick={() => openModal("hotels")}
                className="cursor-pointer flex items-center justify-center gap-3 bg-tropical-gold text-deep-navy font-bold py-4 px-8 rounded-full hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_30px_rgba(235,180,0,0.2)] text-sm uppercase tracking-wider w-full sm:flex-1 whitespace-nowrap"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Request Custom Curation
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
    </div>
  );
}
