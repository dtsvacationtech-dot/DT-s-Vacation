"use client";

import { getApiUrl } from "@/lib/api";

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
  promotionsCount: number;
  refreshPromotionsCount: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [initialMessage, setInitialMessage] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState<EnquiryPromotionInfo | null>(null);
  const [isPromotionsOpen, setIsPromotionsOpen] = useState(false);
  const [promotionsCount, setPromotionsCount] = useState(0);

  const refreshPromotionsCount = useCallback(() => {
    fetch(getApiUrl(`/api/promotions?_t=${Date.now()}`), {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.promotions)) {
          setPromotionsCount(data.promotions.length);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshPromotionsCount();
  }, [refreshPromotionsCount, isPromotionsOpen]);

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
        promotionsCount,
        refreshPromotionsCount,
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
