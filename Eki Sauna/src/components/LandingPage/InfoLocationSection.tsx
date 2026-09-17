import type { FC } from "react";
import { Clock, Phone, Mail, MapPin, Navigation } from "lucide-react";

export const InfoLocationSection: FC = () => {
  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=Eki+Onsen+Bangkok+Sukhumvit", "_blank");
  };

  return (
    <section id="about" className="relative bg-[#08080A] py-16 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start">
          
          {/* Col 1: Reception Photo with Warm Backlit EKI Wall */}
          <div className="group relative rounded-md overflow-hidden border border-[#D4AF37]/30 shadow-lg hover:border-[#D4AF37] transition-all duration-300 h-full min-h-[190px]">
            <img
              src="/landing/reception_hd.webp"
              alt="EKI Onsen & Sauna Reception Lobby"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="font-serif-luxury text-[11px] tracking-[0.18em] text-[#F3E5AB] drop-shadow">
                EKI WELCOME LOBBY
              </span>
            </div>
          </div>

          {/* Col 2: OPENING HOURS */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h4 className="font-serif-luxury text-sm font-semibold tracking-[0.2em] text-[#F3E5AB] mb-3 uppercase">
                OPENING HOURS
              </h4>

              <div className="flex items-start gap-3 text-zinc-300">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-sm sm:text-base font-semibold text-white tracking-wider">
                    10:00 - 24:00
                  </p>
                  <p className="font-thai text-xs text-zinc-400 font-light">
                    Open Daily (เปิดบริการทุกวัน)
                  </p>
                </div>
              </div>
            </div>

            {/* Cafe & Sakura Lounge Thumbnail */}
            <div className="group relative rounded-md overflow-hidden border border-[#D4AF37]/30 h-24 hover:border-[#D4AF37] transition-all duration-300">
              <img
                src="/landing/cafe_hd.webp"
                alt="EKI Japanese Dining & Sakura Lounge"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/80 to-transparent" />
              <span className="absolute bottom-2 left-2.5 font-thai text-[10px] text-zinc-300">
                Japanese Cafe & Tea Lounge
              </span>
            </div>
          </div>

          {/* Col 3: CONTACT US */}
          <div id="contact" className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-semibold tracking-[0.2em] text-[#F3E5AB] mb-3 uppercase">
              CONTACT US
            </h4>

            <div className="space-y-3 font-thai text-xs text-zinc-300">
              {/* Phone */}
              <a
                href="tel:021234567"
                className="flex items-center gap-3 group hover:text-[#F3E5AB] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#181611] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37]">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <span className="font-mono text-sm tracking-wider text-zinc-200 group-hover:text-white">
                  02-123-4567
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@ekionsen.com"
                className="flex items-center gap-3 group hover:text-[#F3E5AB] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#181611] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37]">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <span className="text-zinc-300 group-hover:text-white truncate">
                  info@ekionsen.com
                </span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#181611] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <span className="text-zinc-400 font-light leading-relaxed">
                  123 Sukhumvit Road, Khlong Toei, Bangkok 10110
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: OUR LOCATION & Map Graphic */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold tracking-[0.2em] text-[#F3E5AB] mb-3 uppercase">
              OUR LOCATION
            </h4>

            {/* Map Preview Container */}
            <div 
              onClick={handleGetDirections}
              className="group relative rounded-md overflow-hidden border border-[#D4AF37]/40 shadow-lg cursor-pointer hover:border-[#D4AF37] transition-all duration-300 h-28 bg-[#18181F]"
            >
              <img
                src="/landing/map_hd.webp"
                alt="Map to EKI Onsen Sukhumvit Bangkok"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110"
              />

              {/* Pulse Pin Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-[#08080A]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-red-500/60 shadow-lg pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-semibold text-white tracking-wide">
                  EKI Onsen
                </span>
              </div>
            </div>

            {/* GET DIRECTIONS Button */}
            <button
              onClick={handleGetDirections}
              className="w-full py-2.5 px-4 rounded-sm border border-[#D4AF37]/50 bg-[#14120D] hover:bg-[#D4AF37] text-[#F3E5AB] hover:text-black font-serif-luxury text-[11px] font-semibold tracking-[0.2em] flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all duration-300 cursor-pointer"
            >
              <span>GET DIRECTIONS</span>
              <Navigation className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
