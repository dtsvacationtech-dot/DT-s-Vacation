import type { FC } from "react";
import { ChevronRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="home" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Image Container with Luxury Dark Vignette & Parallax feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="/landing/hero_pool_hd.webp"
          alt="Eki Onsen & Sauna Luxury Ambience"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.75] contrast-[1.1] transition-transform duration-1000 ease-out"
        />

        {/* Multi-layered Vignette & Gradients for authentic luxury dark mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080A] via-[#08080A]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-[#08080A]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#08080A_95%)]" />

        {/* Traditional Japanese Cloud & Wave Vector Texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20v2c9.941 0 18 8.059 18 18h2zm0 0c0 11.046 8.954 20 20 20v-2c-9.941 0-18-8.059-18-18h-2zM0 30c0-11.046 8.954-20 20-20v2c-9.941 0-18 8.059-18 18H0zm60 0c0 11.046-8.954 20-20 20v-2c9.941 0 18-8.059 18-18h2z' fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated Steam Clouds rising from the hot spring */}
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-t from-white/15 to-transparent blur-3xl animate-steam-1 pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-gradient-to-t from-amber-100/10 to-transparent blur-2xl animate-steam-2 pointer-events-none" />
        <div className="absolute bottom-1/5 right-1/5 w-96 h-96 rounded-full bg-gradient-to-t from-sky-100/10 to-transparent blur-3xl animate-steam-3 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          
          {/* Japanese Kicker Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181611]/85 border border-[#D4AF37]/35 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)] animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-jp text-[13px] tracking-[0.25em] text-[#F3E5AB] font-normal">
              駅 オンセン ＆ サウナ
            </span>
          </div>

          {/* Grand Brand Title: EKI */}
          <h1 className="font-serif-luxury text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.08em] leading-none mb-1">
            <span className="gold-gradient-text drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
              EKI
            </span>
          </h1>

          {/* Subtitle: ONSEN & SAUNA */}
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl tracking-[0.28em] font-semibold text-[#D4AF37] mb-4 drop-shadow-md">
            ONSEN & SAUNA
          </h2>

          {/* Traditional Lotus / Zen Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D4AF37] fill-current opacity-90 animate-pulse">
              <path d="M12 2C10.5 5 9 7.5 9 10C9 12 10.34 13.5 12 13.5C13.66 13.5 15 12 15 10C15 7.5 13.5 5 12 2Z" />
              <path d="M12 14.5C9.5 14.5 7.5 13 6 11C6.5 14 8.5 17 12 17C15.5 17 17.5 14 18 11C16.5 13 14.5 14.5 12 14.5Z" opacity="0.7" />
              <path d="M12 18C7 18 4 15 2 13C3 17 7 21 12 21C17 21 21 17 22 13C20 15 17 18 12 18Z" opacity="0.5" />
            </svg>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
          </div>

          {/* Thai Body Tagline */}
          <div className="space-y-1 text-base sm:text-lg md:text-xl font-light text-zinc-200 leading-relaxed font-thai mb-8 drop-shadow">
            <p>สัมผัสประสบการณ์แห่งการผ่อนคลาย</p>
            <p className="text-zinc-300 font-normal">ท่ามกลางกลิ่นอายญี่ปุ่นแท้</p>
          </div>

          {/* Primary CTA Button: BOOK NOW > */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-8 py-3.5 rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#ECC853] to-[#AA820A] text-black font-serif-luxury text-sm font-bold tracking-[0.22em] shadow-[0_8px_30px_rgba(212,175,55,0.35)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {/* Animated metallic highlight sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              
              <span className="relative flex items-center gap-2.5">
                <span>BOOK NOW</span>
                <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Subtle Feature Badge */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#D4AF37] bg-[#16140F]/80 backdrop-blur-md px-4 py-3 rounded-sm border border-[#D4AF37]/25">
              <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
              <span>Authentic Mineral Springs & Hinoki Sauna</span>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#08080A] to-transparent z-10 pointer-events-none" />
    </section>
  );
};
