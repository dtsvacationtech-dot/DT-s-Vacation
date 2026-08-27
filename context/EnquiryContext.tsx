"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ServiceType = "wedding" | "corporate" | "tours" | "hotels" | "cruises";

interface EnquiryContextValue {
  isOpen: boolean;
  serviceType: ServiceType | null;
  openModal: (service: ServiceType) => void;
  closeModal: () => void;
  isPromotionsOpen: boolean;
  openPromotions: () => void;
  closePromotions: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [isPromotionsOpen, setIsPromotionsOpen] = useState(false);

  const openModal = (service: ServiceType) => {
    setServiceType(service);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
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
        openModal,
        closeModal,
        isPromotionsOpen,
        openPromotions,
        closePromotions,
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
