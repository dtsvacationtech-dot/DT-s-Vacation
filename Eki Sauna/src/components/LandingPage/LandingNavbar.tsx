import { useState, useEffect } from "react";
import type { FC } from "react";
import { Menu, X, Calendar, Sparkles } from "lucide-react";

interface LandingNavbarProps {
  onOpenBooking: () => void;
  onNavigateToCRM?: () => void;
}

export const LandingNavbar: FC<LandingNavbarProps> = ({ onOpenBooking, onNavigateToCRM }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ["home", "onsen", "sauna", "facilities", "promotion", "membership", "about"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { id: "home", label: "HOME" },
    { id: "onsen", label: "ONSEN" },
    { id: "sauna", label: "SAUNA" },
    { id: "facilities", label: "FACILITIES" },
    { id: "promotion", label: "PROMOTION" },
    { id: "membership", label: "MEMBERSHIP" },
    { id: "about", label: "ABOUT US" },
    { id: "contact", label: "CONTACT US" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#08080A]/95 backdrop-blur-md py-3 border-b border-[#D4AF37]/20 shadow-2xl shadow-black/80"
          : "bg-gradient-to-b from-[#08080A]/90 via-[#08080A]/50 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Japanese Seal */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group text-left cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Traditional Circular Crest */}
            <div className="w-11 h-11 rounded-full border-1.5 border-[#D4AF37]/80 flex items-center justify-center p-1 bg-gradient-to-br from-[#1C1A14] to-[#0D0D10] shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:border-[#F3E5AB] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] fill-current">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <text x="50" y="44" textAnchor="middle" fontSize="22" fontFamily="'Noto Serif JP', serif" fontWeight="700" fill="currentColor">東</text>
                <text x="50" y="70" textAnchor="middle" fontSize="22" fontFamily="'Noto Serif JP', serif" fontWeight="700" fill="currentColor">駅</text>
              </svg>
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl font-bold tracking-[0.25em] text-[#F3E5AB] leading-none group-hover:text-white transition-colors duration-300">
                EKI
              </span>
              <span className="font-serif-luxury text-[9px] tracking-[0.3em] text-[#D4AF37] leading-tight mt-0.5">
                ONSEN & SAUNA
              </span>
              <span className="font-jp text-[8px] tracking-[0.18em] text-zinc-400 font-light scale-90 origin-left">
                駅 オンセン & サウナ
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`font-serif-luxury text-[13px] tracking-[0.18em] transition-all duration-300 relative py-1 cursor-pointer ${
                    isActive
                      ? "text-[#F3E5AB] font-semibold"
                      : "text-zinc-300 hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: BOOK NOW Button */}
          <div className="flex items-center gap-3">
            {onNavigateToCRM && (
              <button
                onClick={onNavigateToCRM}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#D4AF37] border border-[#D4AF37]/40 bg-[#16140F]/80 hover:bg-[#D4AF37]/15 transition-all duration-300"
                title="สลับไปยังระบบสมาชิกลูกค้า (LINE CRM / POS)"
              >
                <Sparkles className="w-3 h-3 text-[#F3E5AB]" />
                <span>Member CRM</span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-5 py-2 rounded-sm border border-[#D4AF37] bg-gradient-to-r from-[#1E1B13] via-[#2A2416] to-[#1E1B13] text-[#F3E5AB] font-serif-luxury text-[12px] tracking-[0.2em] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:border-[#F3E5AB] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            >
              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FFF0B3]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-white transition-colors" />
                BOOK NOW
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#D4AF37] hover:text-white hover:bg-zinc-800/60 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#0B0B0E]/98 backdrop-blur-2xl border-b border-[#D4AF37]/30 shadow-2xl transition-all duration-300 animate-in slide-in-from-top">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left font-serif-luxury text-sm tracking-[0.2em] text-zinc-300 hover:text-[#D4AF37] py-2 border-b border-zinc-800/60 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-zinc-600 text-xs">→</span>
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-md bg-gradient-to-r from-[#D4AF37] via-[#ECC853] to-[#AA820A] text-black font-serif-luxury text-sm font-bold tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-black" />
                BOOK NOW
              </button>

              {onNavigateToCRM && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToCRM();
                  }}
                  className="w-full py-2.5 rounded-md border border-[#D4AF37]/40 text-[#F3E5AB] font-medium text-xs tracking-wider flex items-center justify-center gap-2 bg-[#181612]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Member CRM & E-Voucher Portal
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
