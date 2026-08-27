// ============================================================
//  🔥 SPECIAL PROMOTIONS & OFFERS DATA
//
//  วิธีอัปเดตโปรโมชั่นประจำสัปดาห์ / วันหยุดเทศกาล:
//  1. เพิ่มหรือแก้ข้อมูลด้านล่าง (ใส่รูปใน /public/images/)
//  2. ตั้งค่า active: true เพื่อเปิดแสดง หรือ false เพื่อซ่อน
// ============================================================

export interface PromotionOffer {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  validUntil: string;
  image: string;
  description: string;
  highlights: string[];
  ctaText: string;
  actionType: "whatsapp" | "enquiry" | "link";
  actionTarget: string; // WhatsApp message, serviceType, or URL
  active: boolean;
}

export const SPECIAL_PROMOTIONS: PromotionOffer[] = [
  {
    id: "easter-getaway",
    title: "Easter & Spring Caribbean Getaway",
    subtitle: "All-Inclusive Luxury Beachfront Special",
    badge: "Limited Time Offer",
    validUntil: "April 30, 2026",
    image: "/images/hero_hotels.webp",
    description:
      "Celebrate Easter with up to 35% off luxury all-inclusive resorts across Montego Bay, Ocho Rios, and Negril. Complimentary airport transfer included.",
    highlights: [
      "Up to 35% Off Selected 5-Star Resorts",
      "Complimentary VIP Airport Concierge",
      "Kids Stay & Eat Free at Selected Family Properties",
      "Flexible Date Rebooking Guarantee",
    ],
    ctaText: "Inquire on WhatsApp",
    actionType: "whatsapp",
    actionTarget: "Hi DT's Vacation, I am interested in the Easter & Spring Caribbean Getaway promotion!",
    active: true,
  },
  {
    id: "caribbean-cruise-voyage",
    title: "Caribbean Island Hopper Cruise Special",
    subtitle: "7-Night Luxury Voyage with Onboard Credit",
    badge: "Exclusive Partner Rate",
    validUntil: "May 15, 2026",
    image: "/images/hero_cruises.webp",
    description:
      "Set sail to Barbados, Trinidad, Antigua, and St. Lucia. Special group and couple rates with $200 complimentary onboard spend.",
    highlights: [
      "$200 Complimentary Onboard Credit per Stateroom",
      "Free Specialty Dining Upgrade",
      "Flexible Departure Ports Available",
      "Full Concierge Support from DT's Vacation",
    ],
    ctaText: "Book Cruise Special",
    actionType: "enquiry",
    actionTarget: "cruises",
    active: true,
  },
  {
    id: "group-retreat-reunion",
    title: "Group Travel & Family Reunion Package",
    subtitle: "Custom Logistics for 10+ Guests",
    badge: "Group Savings",
    validUntil: "Ongoing 2026",
    image: "/images/hero_corporate.webp",
    description:
      "Planning a family reunion, corporate retreat, or church fellowship? We handle all flight blocks, villa bookings, private charter buses, and group excursions.",
    highlights: [
      "Dedicated Group Travel Coordinator",
      "Private Villa & Resort Group Rates",
      "Customized Group Itinerary & Banqueting",
      "Flexible Individual Payment Options for Group Members",
    ],
    ctaText: "Plan Group Event",
    actionType: "enquiry",
    actionTarget: "corporate",
    active: true,
  },
];
