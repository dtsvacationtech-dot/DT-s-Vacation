"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ServiceType = "wedding" | "corporate" | "tours" | "hotels";

interface EnquiryContextValue {
  isOpen: boolean;
  serviceType: ServiceType | null;
  openModal: (service: ServiceType) => void;
  closeModal: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);

  const openModal = (service: ServiceType) => {
    setServiceType(service);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <EnquiryContext.Provider value={{ isOpen, serviceType, openModal, closeModal }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}
