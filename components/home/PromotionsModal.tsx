"use client";

import { apiFetch } from "@/lib/api";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { PromotionOffer } from "@/lib/promotionsData";
import { useEnquiry, ServiceType } from "@/context/EnquiryContext";
import { CONTACT } from "@/lib/siteContent";
import { formatDateDisplay } from "@/lib/dateUtils";

interface PromotionsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const renderPerkIcon = (icon?: string) => {
  switch (icon) {
    case "hotel":
      return <span className="text-sm">🏨</span>;
    case "gift":
      return <span className="text-sm">🎁</span>;
    case "car":
      return <span className="text-sm">🚗</span>;
    case "shield":
      return <span className="text-sm">🛡️</span>;
    case "champagne":
      return <span className="text-sm">🍾</span>;
    case "clock":
      return <span className="text-sm">⏱️</span>;
    case "users":
      return <span className="text-sm">👥</span>;
    case "compass":
      return <span className="text-sm">🧭</span>;
    default:
      return <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>;
  }
};

export default function PromotionsModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: PromotionsModalProps = {}) {
  const { isPromotionsOpen, closePromotions, openModal } = useEnquiry();
  const [promotionsList, setPromotionsList] = useState<PromotionOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<PromotionOffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : isPromotionsOpen;
  const handleClose = controlledOnClose || closePromotions;

  // Dynamic Fetch Promotions strictly from API / Database with cache busting
  const fetchPromotions = useCallback(() => {
    setIsLoading(true);
    apiFetch(`/api/promotions?_t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.promotions)) {
          setPromotionsList(data.promotions);
          setSelectedOffer((prev) => {
            if (!prev) return data.promotions[0] || null;
            const match = data.promotions.find((p: PromotionOffer) => p.id === prev.id);
            return match || data.promotions[0] || null;
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load promotions:", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchPromotions();
    }
  }, [isOpen, fetchPromotions]);

  // Live Countdown Timer (Dynamic seasonal flash allocation)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, handleClose]);

  const handleWhatsAppAction = (offer: PromotionOffer) => {
    const message = `Hi DT's Vacation & Travel! I'd like to claim the *${offer.title}* promotion. Please let me know the best available rates and dates for my stay!`;
    const url = `https://wa.me/${CONTACT.phoneLink}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleEnquiryAction = (offer: PromotionOffer) => {
    const promoNotes = `[Promo: ${offer.title}] I would like to request a customized itinerary and availability quote for this special offer.`;
    handleClose();
    openModal(offer.serviceType as ServiceType, promoNotes, {
      id: offer.id,
      title: offer.title,
      promoCode: offer.promoCode,
      discountTag: offer.discountTag,
      badge: offer.badge,
      savingsEstimate: offer.savingsEstimate,
      serviceType: offer.serviceType,
    });
  };

  const pathname = usePathname();
  if (pathname.startsWith("/admin") || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 font-body">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-fade-in z-0"
        onClick={handleClose}
        aria-hidden
      />

      {/* Modal Container (Clean, Bright, Luxury 5-Star Aesthetic) */}
      <div className="relative w-full max-w-6xl bg-[#faf9f8] border border-amber-200/90 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,45,98,0.25)] overflow-hidden z-10 max-h-[92vh] flex flex-col animate-scale-in">
        
        {/* ── Top Flash Urgency Header Banner (Warm Radiant Gold) ── */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-4 md:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs relative z-20 border-b border-amber-300 text-deep-navy shadow-sm">
          
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 shadow-sm"></span>
            </span>
            <span className="font-extrabold uppercase tracking-widest text-[11px] sm:text-xs">
              ⚡ Limited Seasonal Deals
            </span>
            <span className="text-deep-navy/40 hidden md:inline">•</span>
            <span className="text-deep-navy/90 hidden md:inline text-[11px] font-semibold">
              Lock in exclusive concierge rates before allocations expire
            </span>
          </div>

          {/* Real-Time Countdown Timer */}
          <div className="flex items-center gap-1.5 bg-white/95 px-3.5 py-1 rounded-full border border-amber-300/80 text-deep-navy font-mono font-extrabold text-[11px] sm:text-xs ml-auto shadow-sm">
            <span className="text-gray-500 text-[10px] font-sans font-bold uppercase tracking-wider mr-1">
              Ends in:
            </span>
            <span className="bg-amber-100 text-deep-navy px-1.5 py-0.5 rounded font-black">{String(timeLeft.days).padStart(2, "0")}d</span>
            <span>:</span>
            <span className="bg-amber-100 text-deep-navy px-1.5 py-0.5 rounded font-black">{String(timeLeft.hours).padStart(2, "0")}h</span>
            <span>:</span>
            <span className="bg-amber-100 text-deep-navy px-1.5 py-0.5 rounded font-black">{String(timeLeft.minutes).padStart(2, "0")}m</span>
            <span>:</span>
            <span className="bg-amber-500 text-white px-1.5 py-0.5 rounded font-black">{String(timeLeft.seconds).padStart(2, "0")}s</span>
          </div>

        </div>

        {/* ── Main Modal Header ── */}
        <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-gray-200/80 bg-white relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center shadow-inner shrink-0">
              <span className="flame-wiggle text-xl">🔥</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-amber-600">
                  VIP Seasonal Specials
                </span>
                <span className="bg-green-100 text-green-800 border border-green-300 text-[9px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider">
                  Verified Active
                </span>
              </div>
              <h2 className="text-lg md:text-2xl font-heading font-extrabold text-deep-navy leading-tight">
                Exclusive Travel Deals &amp; Concierge Promotions
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-deep-navy flex items-center justify-center transition-all cursor-pointer border border-gray-200 hover:scale-105 active:scale-95 shadow-sm"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Modal Body (Split Layout: Light Interactive Tabs + Rich Showcase) ── */}
        {isLoading ? (
          <div className="p-16 text-center space-y-3 max-w-md mx-auto my-auto flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-tropical-gold animate-spin shadow-md" />
            <p className="text-xs font-bold text-deep-navy tracking-widest uppercase">
              Loading Verified Seasonal Deals...
            </p>
          </div>
        ) : promotionsList.length === 0 ? (
          <div className="p-10 md:p-16 text-center space-y-4 max-w-lg mx-auto my-auto flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-3xl shadow-sm border border-amber-200">
              🌴
            </div>
            <h3 className="text-xl font-heading font-extrabold text-deep-navy">
              No Active Seasonal Offers Currently
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Previous limited-time allocations have concluded. Our Jamaican travel specialists are crafting bespoke packages. Contact our VIP concierge directly for private custom rates.
            </p>
            <a
              href={`https://wa.me/${CONTACT.phoneLink}?text=${encodeURIComponent(
                "Hi DT's Vacation & Travel, I would like to inquire about current special rates and bespoke travel packages."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-orange-400 text-deep-navy font-black py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md mt-2"
            >
              <span>Chat with Concierge on WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 relative z-10 divide-y lg:divide-y-0 lg:divide-x divide-gray-200/80">
          
          {/* Left Column: Promotion Selector Tabs */}
          <div className="lg:col-span-4 p-4 md:p-5 space-y-3 bg-gray-50/80 overflow-y-auto">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest">
                Select An Offer ({promotionsList.length})
              </span>
              <span className="text-[10px] text-amber-600 font-extrabold">
                ● 100% Guaranteed Rates
              </span>
            </div>

            {promotionsList.map((promo) => {
              const isSelected = selectedOffer?.id === promo.id;
              return (
                <button
                  key={promo.id}
                  onClick={() => setSelectedOffer(promo)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 cursor-pointer border flex flex-col gap-2 relative overflow-hidden group ${
                    isSelected
                      ? "bg-white border-2 border-tropical-gold shadow-[0_8px_25px_rgba(212,160,23,0.2)] scale-[1.01] ring-1 ring-tropical-gold/30"
                      : "bg-white/80 border-gray-200 hover:border-amber-300 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {/* Left Active Glow Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 via-tropical-gold to-orange-400 shadow-sm" />
                  )}

                  <div className="flex items-center gap-3">
                    {/* Thumbnail Image */}
                    <div className="relative w-14 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 shadow-sm bg-slate-900">
                      <ImageWithSkeleton
                        src={promo.image || "/images/hero_hotels.webp"}
                        alt={promo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="60px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-deep-navy shadow-sm">
                          {promo.discountTag}
                        </span>
                        {promo.validUntil && (
                          <span className="text-[10px] text-gray-500 font-mono font-medium">
                            {formatDateDisplay(promo.validUntil)}
                          </span>
                        )}
                      </div>

                      <h4 className={`font-heading font-extrabold text-xs md:text-sm leading-snug truncate mt-1 transition-colors ${
                        isSelected ? "text-deep-navy" : "text-gray-800 group-hover:text-deep-navy"
                      }`}>
                        {promo.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[10px]">
                    <span className="text-amber-700 font-semibold truncate">
                      {promo.savingsEstimate || promo.subtitle}
                    </span>
                    <span className={`font-bold shrink-0 transition-transform ${
                      isSelected ? "text-amber-600 translate-x-0.5" : "text-gray-400 group-hover:text-deep-navy"
                    }`}>
                      View →
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Concierge Help Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 text-center space-y-1.5 mt-4 shadow-sm">
              <p className="text-xs font-bold text-deep-navy">Need a Bespoke Package?</p>
              <p className="text-[11px] text-gray-600 font-normal">
                Our Jamaican travel experts can tailor any flight, resort, or cruise to your exact dates.
              </p>
              <a
                href={`https://wa.me/${CONTACT.phoneLink}?text=${encodeURIComponent(
                  "Hi DT's Vacation, I need a customized travel itinerary quotation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 mt-1 transition-colors"
              >
                <span>Chat with Concierge Specialist</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Detailed Promotion Showcase (Clean White Luxury) */}
          {selectedOffer && (
            <div className="lg:col-span-8 p-5 sm:p-6 md:p-8 flex flex-col justify-between space-y-5 bg-white overflow-y-auto">
              
              {/* ── Prominent Flyer / Promotional Image Showcase ── */}
              <div className="relative w-full h-52 sm:h-64 md:h-72 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-md group">
                <ImageWithSkeleton
                  src={selectedOffer.image || "/images/hero_hotels.webp"}
                  alt={selectedOffer.title || "Special Promotion"}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  skeletonClassName="skeleton-shimmer"
                  sizes="(max-width: 1024px) 100vw, 750px"
                  priority
                />
                
                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent opacity-80" />

                {/* Top Corner Floating Discount Ribbon */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-deep-navy font-black text-xs md:text-sm px-4 py-1.5 rounded-full shadow-lg border border-yellow-200 flex items-center gap-1.5">
                  <span className="flame-wiggle">🔥</span>
                  <span>{selectedOffer.discountTag}</span>
                </div>

                {selectedOffer.validUntil && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-deep-navy text-[11px] font-bold px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                    Valid Until: {formatDateDisplay(selectedOffer.validUntil)}
                  </div>
                )}

                {/* Bottom Image Highlights */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-300 shadow-md">
                    <span className="text-amber-700 font-extrabold text-xs">
                      {selectedOffer.badge}
                    </span>
                  </div>
                  <div className="bg-deep-navy/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 text-[11px] text-white font-medium">
                    🛡️ Verified DT&apos;s Partner Guarantee
                  </div>
                </div>
              </div>

              {/* Title & Live Urgency Tag */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-amber-100/90 text-amber-900 border border-amber-300/80 text-xs font-bold px-3 py-0.5 rounded-full shadow-sm">
                    <span>{selectedOffer.urgencyTag}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-deep-navy tracking-tight leading-tight">
                  {selectedOffer.title}
                </h3>
                {selectedOffer.subtitle && (
                  <p className="text-amber-600 font-bold text-sm sm:text-base">
                    {selectedOffer.subtitle}
                  </p>
                )}
                {selectedOffer.description && (
                  <p className="text-gray-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {selectedOffer.description}
                  </p>
                )}
              </div>

              {/* VIP Perks Grid (Clean Light Style) */}
              {Array.isArray(selectedOffer.vipPerks) && selectedOffer.vipPerks.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-extrabold text-deep-navy uppercase tracking-wider flex items-center gap-1.5">
                    <span>✨ Included VIP Concierge Perks:</span>
                  </p>
                  <div className={`grid grid-cols-1 ${selectedOffer.vipPerks.length === 1 ? "sm:grid-cols-1" : selectedOffer.vipPerks.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"} gap-2.5`}>
                    {selectedOffer.vipPerks.map((perk, idx) => (
                      <div
                        key={idx}
                        className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-1.5 hover:border-amber-400 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-2">
                          {renderPerkIcon(perk.icon)}
                          <h5 className="text-deep-navy font-bold text-xs">{perk.title}</h5>
                        </div>
                        {perk.desc && (
                          <p className="text-gray-600 text-[11px] font-normal leading-snug">
                            {perk.desc}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete Highlights Checklist */}
              {Array.isArray(selectedOffer.highlights) && selectedOffer.highlights.length > 0 && (
                <div className="bg-gray-50 border border-gray-200/90 rounded-2xl p-4 space-y-2">
                  <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    Promotion Inclusions &amp; Guarantee:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedOffer.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── High-Converting Conversion Action Buttons ── */}
              <div className="space-y-2.5 pt-2">
                
                {/* Primary Action: Direct WhatsApp with Auto-Loaded Message */}
                <button
                  type="button"
                  onClick={() => handleWhatsAppAction(selectedOffer)}
                  className="w-full cursor-pointer relative btn-shimmer bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:via-amber-400 hover:to-orange-400 text-deep-navy font-black py-4 px-6 rounded-2xl text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_6px_25px_rgba(245,158,11,0.45)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.65)] hover:scale-[1.02] active:scale-[0.98] border border-yellow-200"
                >
                  <span className="flame-wiggle text-lg">🔥</span>
                  <span>{selectedOffer.ctaText}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {/* Secondary Actions: Customized Quote Modal + Direct Phone Call */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleEnquiryAction(selectedOffer)}
                    className="cursor-pointer bg-deep-navy hover:bg-[#001f44] text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98] shadow-sm"
                  >
                    <span>📝 Request Custom Itinerary Quote</span>
                  </button>

                  <a
                    href="tel:+18768569812"
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 text-deep-navy font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span>Call: +1 (876) 856-9812</span>
                  </a>
                </div>

                {/* Trust & Instant Guarantee Micro-copy */}
                <p className="text-[11px] text-center text-gray-500 pt-1">
                  🔒 Zero booking fee • 24-Hour complimentary rate hold upon inquiry • Rapid 15-min response
                </p>

              </div>

            </div>
          )}

        </div>
        )}

      </div>
    </div>
  );
}


