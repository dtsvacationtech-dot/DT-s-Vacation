// ============================================================
//  🔥 SPECIAL PROMOTIONS & OFFERS DATA
//
//  วิธีอัปเดตโปรโมชั่นประจำสัปดาห์ / วันหยุดเทศกาล:
//  1. เพิ่มหรือแก้ข้อมูลด้านล่าง (ใส่รูปใน /public/images/)
//  2. ตั้งค่า active: true เพื่อเปิดแสดง หรือ false เพื่อซ่อน
// ============================================================

export interface VIPPerk {
  title: string;
  desc: string;
  icon: "hotel" | "gift" | "car" | "shield" | "champagne" | "clock" | "users" | "compass";
}

export interface PromotionOffer {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discountTag: string;
  promoCode: string;
  urgencyTag: string;
  savingsEstimate: string;
  validUntil: string;
  image: string;
  description: string;
  highlights: string[];
  vipPerks: VIPPerk[];
  ctaText: string;
  actionType: "whatsapp" | "enquiry" | "link";
  actionTarget: string; // WhatsApp message, serviceType, or URL
  serviceType: "hotels" | "cruises" | "corporate" | "wedding" | "tours";
  active: boolean;
}

export const SPECIAL_PROMOTIONS: PromotionOffer[] = [
  {
    id: "easter-getaway",
    title: "Easter & Spring Caribbean Getaway",
    subtitle: "All-Inclusive 5-Star Luxury Beachfront Special",
    badge: "Limited Time Flash Deal",
    discountTag: "UP TO 35% OFF",
    promoCode: "SPRING-CARIB-35",
    urgencyTag: "⚡ Only 3 Beachfront Suites Left at this Promo Rate",
    savingsEstimate: "Save up to $650 per stay + Airport VIP Concierge",
    validUntil: "2026-10-31",
    image: "/images/hero_hotels.webp",
    description:
      "Escape to paradise this Spring with exclusive discounted rates at premier Jamaican 5-star all-inclusive resorts in Montego Bay, Ocho Rios, and Negril. Enjoy complimentary VIP airport transfers and gourmet dining.",
    highlights: [
      "Up to 35% Off Selected 5-Star Luxury Resorts",
      "Complimentary VIP Airport Fast-Track & Roundtrip Transfers",
      "Kids Stay & Dine Free at Selected Luxury Family Properties",
      "100% Flexible Date Rebooking Guarantee with Zero Penalty",
    ],
    vipPerks: [
      { title: "VIP Airport Fast-Track", desc: "Skip immigration lines with dedicated concierge arrival", icon: "car" },
      { title: "Resort Credit Perk", desc: "Complimentary spa & candlelight dinner vouchers", icon: "gift" },
      { title: "Flexible Rebooking", desc: "Change dates up to 14 days before departure for free", icon: "shield" },
    ],
    ctaText: "Claim 35% Off on WhatsApp",
    actionType: "whatsapp",
    actionTarget: "Hi DT's Vacation, I would like to claim the 'Easter & Spring Caribbean Getaway' promotion (Promo Code: SPRING-CARIB-35). Please check availability for my dates!",
    serviceType: "hotels",
    active: true,
  },
  {
    id: "caribbean-cruise-voyage",
    title: "Caribbean Island Hopper Cruise Special",
    subtitle: "7-Night Luxury Ocean Voyage with Shipboard Credits",
    badge: "Exclusive Partner Rate",
    discountTag: "$200 ONBOARD CREDIT",
    promoCode: "CRUISE-VIP-200",
    urgencyTag: "⏳ 4 Oceanview & Balcony Cabins Available at this Rate",
    savingsEstimate: "$200 Free Spending Credit + Specialty Dining Pass",
    validUntil: "2026-09-24",
    image: "/images/hero_cruises.webp",
    description:
      "Set sail across turquoise Caribbean waters visiting Barbados, Trinidad, Antigua, and St. Lucia. DT's Vacation guests receive $200 complimentary onboard credit plus complimentary specialty dining upgrades.",
    highlights: [
      "$200 Complimentary Onboard Spend Credit per Stateroom",
      "Free Specialty Dining Experience Upgrade for 2 Guests",
      "Flexible Departure Dates & Priority Port Boarding",
      "Full Concierge Support & Shore Excursion Coordination",
    ],
    vipPerks: [
      { title: "$200 Shipboard Credit", desc: "Use for spa, cocktails, or private shore excursions", icon: "gift" },
      { title: "Specialty Dining Pass", desc: "Fine dining multi-course experience included", icon: "champagne" },
      { title: "Priority Port Check-in", desc: "Direct VIP embarkation without queuing", icon: "clock" },
    ],
    ctaText: "Claim Cruise Promo on WhatsApp",
    actionType: "whatsapp",
    actionTarget: "Hi DT's Vacation, I would like to reserve the 'Caribbean Island Hopper Cruise Special' with the $200 credit (Promo Code: CRUISE-VIP-200). Please share available sailing dates!",
    serviceType: "cruises",
    active: true,
  },
  {
    id: "group-retreat-reunion",
    title: "Group Travel & Family Reunion Package",
    subtitle: "Custom VIP Group Coordination for 10+ Guests",
    badge: "Group Savings Special",
    discountTag: "SPECIAL GROUP RATES",
    promoCode: "GROUP-VIP-2026",
    urgencyTag: "🔥 Free Private Charters & Custom Group Logistics Included",
    savingsEstimate: "Save up to 25% on combined villa, coach & flight bookings",
    validUntil: "Ongoing Season 2026",
    image: "/images/hero_corporate.webp",
    description:
      "Planning a memorable family reunion, milestone birthday, church fellowship, or executive company retreat? We handle complete flight blocks, luxury villa buyouts, private air-conditioned charter buses, and curated group dinners.",
    highlights: [
      "Dedicated 24/7 Group Travel Concierge Coordinator",
      "Exclusive Private Villa & 5-Star Resort Group Tier Rates",
      "Private Air-Conditioned Luxury Coach Transportation",
      "Flexible Split Payment Options for Individual Group Members",
    ],
    vipPerks: [
      { title: "Dedicated Coordinator", desc: "One expert manager handling all logistics and RSVPs", icon: "users" },
      { title: "Private Group Charter", desc: "Executive transportation for all airport & tour transfers", icon: "car" },
      { title: "Bespoke Banqueting", desc: "Custom beach BBQs, private catamaran or ballroom dinners", icon: "compass" },
    ],
    ctaText: "Inquire Group Package on WhatsApp",
    actionType: "whatsapp",
    actionTarget: "Hi DT's Vacation, I'm organizing a group trip/family reunion for 10+ people (Promo Code: GROUP-VIP-2026). Let's discuss dates and custom pricing!",
    serviceType: "corporate",
    active: true,
  },
];
