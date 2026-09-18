"use client";

import { apiFetch } from "@/lib/api";
import { SPECIAL_PROMOTIONS, PromotionOffer } from "@/lib/promotionsData";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export type ServiceType = "wedding" | "corporate" | "tours" | "hotels" | "cruises";

export interface EnquiryPromotionInfo {
  id?: string;
  title: string;
  promoCode?: string;
  discountTag?: string;
  badge?: string;
  savingsEstimate?: string;
  serviceType?: string;
}

interface EnquiryContextValue {
  isOpen: boolean;
  serviceType: ServiceType | null;
  initialMessage: string;
  selectedPromotion: EnquiryPromotionInfo | null;
  openModal: (service: ServiceType, initialNotes?: string, promoInfo?: EnquiryPromotionInfo | null) => void;
  closeModal: () => void;
  isPromotionsOpen: boolean;
  openPromotions: () => void;
  closePromotions: () => void;
  promotions: PromotionOffer[];
  promotionsCount: number;
  refreshPromotions: () => void;
  refreshPromotionsCount: () => void;
}

let inMemoryPromotionsCache: PromotionOffer[] | null = null;

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [initialMessage, setInitialMessage] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState<EnquiryPromotionInfo | null>(null);
  const [isPromotionsOpen, setIsPromotionsOpen] = useState(false);
  
  // Instant Initial State: Memory cache -> SessionStorage -> Default Special Promotions
  const [promotions, setPromotions] = useState<PromotionOffer[]>(() => {
    if (inMemoryPromotionsCache && inMemoryPromotionsCache.length > 0) {
      return inMemoryPromotionsCache;
    }
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("dts_cached_promos");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            inMemoryPromotionsCache = parsed;
            return parsed;
          }
        }
      } catch {}
    }
    return SPECIAL_PROMOTIONS.filter((p) => p.active !== false);
  });

  const [promotionsCount, setPromotionsCount] = useState<number>(() => {
    return promotions.length || SPECIAL_PROMOTIONS.filter((p) => p.active !== false).length;
  });

  const refreshPromotions = useCallback(() => {
    apiFetch(`/api/promotions?_t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.promotions) && data.promotions.length > 0) {
          setPromotions(data.promotions);
          setPromotionsCount(data.promotions.length);
          inMemoryPromotionsCache = data.promotions;
          try {
            sessionStorage.setItem("dts_cached_promos", JSON.stringify(data.promotions));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshPromotions();
  }, [refreshPromotions, isPromotionsOpen]);

  const openModal = (service: ServiceType, initialNotes?: string, promoInfo?: EnquiryPromotionInfo | null) => {
    setServiceType(service);
    setInitialMessage(initialNotes || "");
    setSelectedPromotion(promoInfo || null);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    setInitialMessage("");
    setSelectedPromotion(null);
    if (!isPromotionsOpen) {
      document.body.style.overflow = "";
    }
  };

  const openPromotions = () => {
    setIsPromotionsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePromotions = () => {
    setIsPromotionsOpen(false);
    if (!isOpen) {
      document.body.style.overflow = "";
    }
  };

  return (
    <EnquiryContext.Provider
      value={{
        isOpen,
        serviceType,
        initialMessage,
        selectedPromotion,
        openModal,
        closeModal,
        isPromotionsOpen,
        openPromotions,
        closePromotions,
        promotions,
        promotionsCount,
        refreshPromotions,
        refreshPromotionsCount: refreshPromotions,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}
