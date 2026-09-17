import type { FC } from "react";

export const LandingFooter: FC = () => {
  return (
    <footer className="relative bg-[#050507] border-t border-[#D4AF37]/30 pt-10 pb-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/80">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/80 flex items-center justify-center p-1 bg-gradient-to-br from-[#1C1A14] to-[#0D0D10] shadow-[0_0_12px_rgba(212,175,55,0.2)]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] fill-current">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <text x="50" y="44" textAnchor="middle" fontSize="22" fontFamily="'Noto Serif JP', serif" fontWeight="700" fill="currentColor">東</text>
                <text x="50" y="70" textAnchor="middle" fontSize="22" fontFamily="'Noto Serif JP', serif" fontWeight="700" fill="currentColor">駅</text>
              </svg>
            </div>

            <div className="flex flex-col text-left">
              <span className="font-serif-luxury text-lg font-bold tracking-[0.22em] text-[#F3E5AB] leading-none">
                EKI
              </span>
              <span className="font-serif-luxury text-[8px] tracking-[0.3em] text-[#D4AF37] leading-tight mt-0.5">
                ONSEN & SAUNA
              </span>
              <span className="font-jp text-[7px] tracking-[0.15em] text-zinc-400 font-light scale-90 origin-left">
                駅 オンセン ＆ サウナ
              </span>
            </div>
          </div>

          {/* Social Icons (Facebook, Instagram, LINE, TikTok) */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/40 bg-[#12110D] flex items-center justify-center text-[#D4AF37] hover:text-white hover:border-[#F3E5AB] hover:bg-[#D4AF37]/20 hover:scale-110 shadow-sm transition-all duration-300"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/40 bg-[#12110D] flex items-center justify-center text-[#D4AF37] hover:text-white hover:border-[#F3E5AB] hover:bg-[#D4AF37]/20 hover:scale-110 shadow-sm transition-all duration-300"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* LINE */}
            <a
              href="https://line.me"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/40 bg-[#12110D] flex items-center justify-center text-[#D4AF37] hover:text-white hover:border-[#F3E5AB] hover:bg-[#D4AF37]/20 hover:scale-110 shadow-sm transition-all duration-300"
              aria-label="LINE Official Account"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.087.495.238l2.478 3.366V8.108c0-.345.282-.63.629-.63.345 0 .626.285.626.63v4.771h.039zm-6.841 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.156c-.347 0-.63-.285-.63-.629V8.108c0-.345.283-.63.63-.63.348 0 .63.285.63.63v4.141h1.417c.348 0 .631.285.631.63 0 .344-.283.629-.631.629zM24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/40 bg-[#12110D] flex items-center justify-center text-[#D4AF37] hover:text-white hover:border-[#F3E5AB] hover:bg-[#D4AF37]/20 hover:scale-110 shadow-sm transition-all duration-300"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43V12.7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-3.04-1.13z" />
              </svg>
            </a>
          </div>

          {/* Copyright Text */}
          <p className="font-serif-luxury text-xs tracking-widest text-zinc-500 text-center md:text-right">
            © 2024 EKI Onsen & Sauna. All rights reserved.
          </p>

        </div>
      </div>

      {/* Traditional Japanese Seigaiha Golden Wave Pattern Footer Edge */}
      <div 
        className="w-full h-8 mt-6 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v2c9.941 0 18 8.059 18 18h2zm0 0c0-11.046 8.954-20 20-20v2c-9.941 0-18 8.059-18 18h-2z' fill='%23D4AF37' fill-opacity='0.8' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
        }}
      />
    </footer>
  );
};
