import type { FC } from "react";
import { Crown, ArrowRight } from "lucide-react";

interface PromotionBannerProps {
  onOpenPromotions: () => void;
}

export const PromotionBanner: FC<PromotionBannerProps> = ({ onOpenPromotions }) => {
  return (
    <section id="promotion" className="relative bg-[#070709] py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Gold Bordered Container */}
        <div className="relative rounded-lg border border-[#D4AF37]/60 bg-gradient-to-r from-[#12110D] via-[#1A1812] to-[#12110D] p-6 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] overflow-hidden group hover:border-[#D4AF37] transition-all duration-500">
          
          {/* Subtle Bamboo Silhouette Vector Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M80 0C60 40 30 70 0 80C40 90 70 120 80 160C90 120 120 90 160 80C120 70 90 40 80 0Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Golden Corner Accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-4 text-left space-y-2">
              <span className="font-serif-luxury text-xs tracking-[0.3em] text-[#D4AF37] font-semibold uppercase">
                SPECIAL
              </span>
              
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-[0.08em] gold-gradient-text leading-tight">
                PROMOTION
              </h3>

              <p className="font-thai text-sm text-zinc-300 font-light pt-1 pb-4">
                โปรโมชั่นพิเศษเฉพาะคุณ รับส่วนลดสูงสุด 40% และสิทธิพิเศษเมื่อสมัครสมาชิก VIP
              </p>

              <button
                onClick={onOpenPromotions}
                className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-sm border border-[#D4AF37] bg-[#16140E] hover:bg-[#D4AF37] text-[#F3E5AB] hover:text-black font-serif-luxury text-xs font-semibold tracking-[0.2em] shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>VIEW ALL PROMOTIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Center Graphic: VIP Card + Gift Box */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div 
                onClick={onOpenPromotions}
                className="relative cursor-pointer transform group-hover:scale-105 transition-transform duration-500"
              >
                <img
                  src="/landing/promo_graphic_hd.webp"
                  alt="EKI Special Member Promotion & Gift Box"
                  className="max-h-[160px] sm:max-h-[190px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                />

                {/* Shimmer on card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Right: Golden Circular MEMBER ONLY Badge */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <div 
                onClick={onOpenPromotions}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E2B755] via-[#D4AF37] to-[#8C6D0D] p-[2px] shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center justify-center cursor-pointer group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all duration-300"
              >
                <div className="w-full h-full rounded-full bg-[#18150D] flex flex-col items-center justify-center text-center p-2 border border-[#D4AF37]/50">
                  <Crown className="w-4 h-4 text-[#F3E5AB] mb-1 animate-pulse" />
                  <span className="font-serif-luxury text-[11px] font-bold tracking-[0.15em] text-[#F3E5AB] leading-tight">
                    MEMBER
                  </span>
                  <span className="font-serif-luxury text-[10px] font-semibold tracking-[0.15em] text-[#D4AF37] leading-tight">
                    ONLY
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
