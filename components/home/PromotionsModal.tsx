"use client";

import { useState, useEffect } from "react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { SPECIAL_PROMOTIONS, PromotionOffer } from "@/lib/promotionsData";
import { useEnquiry, ServiceType } from "@/context/EnquiryContext";
import { CONTACT } from "@/lib/siteContent";

interface PromotionsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function PromotionsModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }: PromotionsModalProps = {}) {
  const { isPromotionsOpen, closePromotions, openModal } = useEnquiry();
  const [selectedOffer, setSelectedOffer] = useState<PromotionOffer | null>(
    SPECIAL_PROMOTIONS[0] || null
  );

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : isPromotionsOpen;
  const handleClose = controlledOnClose || closePromotions;

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleAction = (offer: PromotionOffer) => {
    if (offer.actionType === "whatsapp") {
      const url = `https://wa.me/${CONTACT.phoneLink}?text=${encodeURIComponent(
        offer.actionTarget
      )}`;
      window.open(url, "_blank");
    } else if (offer.actionType === "enquiry") {
      handleClose();
      openModal(offer.actionTarget as ServiceType);
    } else if (offer.actionType === "link") {
      window.open(offer.actionTarget, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000c1c]/85 backdrop-blur-xl transition-opacity animate-fade-in z-0"
        onClick={handleClose}
        aria-hidden
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-gradient-to-br from-[#0a1628] via-deep-navy to-[#050b14] border border-tropical-gold/40 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden z-10 max-h-[90vh] flex flex-col animate-scale-in">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-tropical-gold to-transparent" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-tropical-gold/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-white/10 bg-white/[0.02] relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-tropical-gold/20 flex items-center justify-center border border-tropical-gold/40 shadow-sm">
              <span className="text-tropical-gold text-lg">🔥</span>
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-tropical-gold">
                Exclusive Deals &amp; Seasonal Specials
              </p>
              <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white">
                Ongoing Travel Promotions
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:border-white/30"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 relative z-10">
          
          {/* Left / Tabs List: All Active Promotions */}
          <div className="lg:col-span-5 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-white/10 space-y-3 bg-black/25">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">
              Select Promotion
            </p>

            {SPECIAL_PROMOTIONS.filter((p) => p.active).map((promo) => {
              const isSelected = selectedOffer?.id === promo.id;
              return (
                <button
                  key={promo.id}
                  onClick={() => setSelectedOffer(promo)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 cursor-pointer border flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-white/15 border-tropical-gold shadow-[0_0_25px_rgba(212,160,23,0.2)] scale-[1.01]"
                      : "bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-tropical-gold text-deep-navy font-bold">
                      {promo.badge}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Valid: {promo.validUntil}
                    </span>
                  </div>
                  <h4 className="text-white font-heading font-bold text-base line-clamp-1 mt-1">
                    {promo.title}
                  </h4>
                  <p className="text-gray-300 text-xs font-light line-clamp-2">
                    {promo.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right / Details Pane */}
          {selectedOffer && (
            <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-[#000814]/40">
              
              {/* Promo Image Flyer */}
              <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <ImageWithSkeleton
                  src={selectedOffer.image}
                  alt={selectedOffer.title}
                  fill
                  className="object-cover"
                  skeletonClassName="skeleton-shimmer-dark"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="bg-deep-navy/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-tropical-gold/50 shadow-md">
                    <span className="text-tropical-gold font-bold text-xs">
                      {selectedOffer.badge}
                    </span>
                  </div>
                  <span className="text-white/90 text-xs bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    Until: {selectedOffer.validUntil}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white">
                  {selectedOffer.title}
                </h3>
                <p className="text-tropical-gold text-sm font-semibold">
                  {selectedOffer.subtitle}
                </p>
                <p className="text-gray-200 text-sm md:text-base font-light leading-relaxed">
                  {selectedOffer.description}
                </p>
              </div>

              {/* Highlights Checklist */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5">
                <p className="text-xs font-bold text-tropical-gold uppercase tracking-wider">
                  Promotion Inclusions:
                </p>
                <ul className="space-y-2">
                  {selectedOffer.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs md:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-tropical-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => handleAction(selectedOffer)}
                  className="flex-1 cursor-pointer bg-gradient-to-r from-tropical-gold to-yellow-400 hover:from-yellow-300 hover:to-yellow-400 text-deep-navy font-bold py-4 px-6 rounded-full text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-tropical-gold/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{selectedOffer.ctaText}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <a
                  href={`https://wa.me/${CONTACT.phoneLink}?text=${encodeURIComponent(
                    `Hi DT's Vacation, I have questions about the ${selectedOffer.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-6 rounded-full text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4 text-tropical-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Quick Chat</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
