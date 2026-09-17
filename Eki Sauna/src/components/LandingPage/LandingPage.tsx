import { useState, useEffect } from "react";
import type { FC } from "react";
import { ArrowUp, Calendar, Phone, MessageCircle } from "lucide-react";
import { LandingNavbar } from "./LandingNavbar";
import { HeroSection } from "./HeroSection";
import { FeaturesPillars } from "./FeaturesPillars";
import { RelaxationShowcase } from "./RelaxationShowcase";
import { PromotionBanner } from "./PromotionBanner";
import { InfoLocationSection } from "./InfoLocationSection";
import { LandingFooter } from "./LandingFooter";
import { BookingModal } from "./BookingModal";
import { FacilityDetailModal } from "./FacilityDetailModal";
import { PromotionModal } from "./PromotionModal";

interface LandingPageProps {
  onNavigateToCRM?: () => void;
}

export const LandingPage: FC<LandingPageProps> = ({ onNavigateToCRM }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-zinc-100 selection:bg-[#D4AF37] selection:text-black relative flex flex-col justify-between">
      
      {/* 1. Glassmorphism Navigation Bar */}
      <LandingNavbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateToCRM={onNavigateToCRM}
      />

      {/* 2. Hero Section */}
      <main className="flex-grow">
        <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 3. 4 Feature Highlights Strip */}
        <FeaturesPillars />

        {/* 4. The Art of Relaxation Showcase */}
        <RelaxationShowcase
          onSelectFacility={(id) => setSelectedFacility(id)}
          onExploreMore={() => setSelectedFacility("onsen")}
        />

        {/* 5. Special Member Promotion Banner */}
        <PromotionBanner onOpenPromotions={() => setIsPromoOpen(true)} />

        {/* 6. Opening Hours, Contact & Location Grid */}
        <InfoLocationSection />
      </main>

      {/* 7. Luxury Footer */}
      <LandingFooter />

      {/* Floating Action: Back to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#1A1812]/90 border border-[#D4AF37]/60 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37] hover:border-[#F3E5AB] shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 active:scale-90 cursor-pointer animate-in fade-in"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Mobile Sticky Quick Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0E]/95 backdrop-blur-lg border-t border-[#D4AF37]/30 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <a
          href="tel:021234567"
          className="flex-1 py-2 px-3 rounded-md bg-[#161410] border border-[#D4AF37]/40 text-[#F3E5AB] font-thai text-xs font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>โทรจอง</span>
        </a>

        <a
          href="https://line.me"
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2 px-3 rounded-md bg-[#101C13] border border-emerald-500/40 text-emerald-300 font-thai text-xs font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>LINE</span>
        </a>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex-[1.5] py-2 px-3 rounded-md bg-gradient-to-r from-[#D4AF37] via-[#ECC853] to-[#AA820A] text-black font-serif-luxury text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#D4AF37]/25 active:scale-95 transition-transform"
        >
          <Calendar className="w-3.5 h-3.5 text-black" />
          <span>BOOK NOW</span>
        </button>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <FacilityDetailModal
        facilityId={selectedFacility}
        onClose={() => setSelectedFacility(null)}
        onBook={() => {
          setSelectedFacility(null);
          setIsBookingOpen(true);
        }}
      />

      <PromotionModal
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
        onBook={() => {
          setIsPromoOpen(false);
          setIsBookingOpen(true);
        }}
      />

    </div>
  );
};
