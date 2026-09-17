import { PromotionOffer } from "./promotionsData";

export interface ExtendedPromotion extends PromotionOffer {
  validFrom?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryRecord {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone: string;
  serviceType: string;
  destination?: string;
  travelDateStart?: string | null;
  travelDateEnd?: string | null;
  adults?: number;
  children?: number;
  guests?: number;
  duration?: string;
  departurePort?: string;
  message?: string;
  promotionId?: string;
  promotionTitle?: string;
  status: "new" | "contacted" | "quoted" | "booked" | "archived";
  notes?: string;
  repliedAt?: string;
  createdAt: string;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  source: string;
  status: "active" | "unsubscribed";
  createdAt: string;
}

export interface BroadcastLogRecord {
  id: string;
  subject: string;
  targetAudience: string;
  recipientCount: number;
  successCount: number;
  failedCount: number;
  promotionId?: string;
  promotionTitle?: string;
  sentAt: string;
}

export interface SecurityAuditRecord {
  id: string;
  event: "login_success" | "login_failed" | "lockout" | "password_change";
  ip: string;
  username?: string;
  userAgent?: string;
  timestamp: string;
}
