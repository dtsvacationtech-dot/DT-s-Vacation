// ============================================================
//  📝 SITE CONTENT — แก้ไขข้อมูลเว็บไซต์ได้ที่ไฟล์นี้ไฟล์เดียว
//
//  วิธีแก้ไข:
//  1. เปิด GitHub → กด . (จุด) บน keyboard
//  2. แก้ค่าในเครื่องหมาย " " ด้านขวาของแต่ละบรรทัด
//  3. กด Commit (ปุ่มซ้ายมือ) → เว็บจะอัปเดตอัตโนมัติใน ~2 นาที
//
//  ⚠️ ข้อควรระวัง: อย่าลบเครื่องหมาย " " หรือ , ออก
// ============================================================

// ─────────────────────────────────────────────────────────────
// 📞 ข้อมูลติดต่อ (แสดงทุกหน้า)
// ─────────────────────────────────────────────────────────────
export const CONTACT = {
  phone: "(876) 856-9812",          // เบอร์โทรที่แสดงบนเว็บ
  phoneLink: "18768569812",         // เบอร์สำหรับ WhatsApp (ไม่ต้องมีเครื่องหมาย -)
  email: "dtvacationandtravel@gmail.com", // อีเมล์ติดต่อ
  instagram: "https://www.instagram.com/dtvacationandtravel",
  facebook: "https://www.facebook.com/profile.php?id=61560585715323",
  whatsapp: "https://wa.me/18768569812",
  tagline: `"DT's Vacation & Travel Limited. Personalized and Professional Travel Service at its Best... You Ask, We Deliver!"`,
};

// ─────────────────────────────────────────────────────────────
// 🏠 หน้าแรก — Hero Slides (5 สไลด์)
// รูปภาพ: ใส่ชื่อไฟล์ใน /public/images/
// ─────────────────────────────────────────────────────────────
export const heroSlides = [
  {
    id: 1,
    locationTag: "Luxury Stays",            // ป้ายเล็กด้านบน
    title: "Experience Premium Hospitality", // หัวข้อใหญ่
    description: "Discover exclusive 5-star beachfront resorts equipped with world-class amenities, infinity pools, and unparalleled personalized service for the ultimate relaxation.",
    cardTitle: "Hotels",                    // ชื่อการ์ดด้านขวา
    image: "/images/hero_hotels.webp",      // ชื่อไฟล์รูป
    ctaText: "Discover Hotels",             // ข้อความปุ่ม
    ctaLink: "/hotels",                     // ลิงก์ปุ่ม (ห้ามเปลี่ยน)
  },
  {
    id: 2,
    locationTag: "Executive Travel",
    title: "Elevate Your Corporate Retreat",
    description: "Sleek, modern meeting spaces overlooking the Caribbean sea. We handle premium logistics so you can focus on strategy, team-building, and global growth.",
    cardTitle: "Corporate",
    image: "/images/hero_corporate.webp",
    ctaText: "Plan a Retreat",
    ctaLink: "/corporate",
  },
  {
    id: 3,
    locationTag: "Timeless Romance",
    title: "Celebrate Unforgettable Love",
    description: "Say 'I do' on pristine white sand beaches at golden hour. Let us orchestrate your breathtaking destination wedding with elegant floral designs and flawless coordination.",
    cardTitle: "Weddings",
    image: "/images/hero_weddings.webp",
    ctaText: "Start Planning",
    ctaLink: "/weddings",
  },
  {
    id: 4,
    locationTag: "Ocean Voyages",
    title: "Sail the Majestic Caribbean",
    description: "Embark on luxury mega cruise ships traversing crystal clear turquoise waters. Indulge in premium onboard dining, entertainment, and breathtaking coastal horizons.",
    cardTitle: "Cruises",
    image: "/images/hero_cruises.webp",
    ctaText: "View Voyages",
    ctaLink: "/cruises",
  },
  {
    id: 5,
    locationTag: "Immersive Adventures",
    title: "Explore the Unknown Wonders",
    description: "Venture deep into lush jungles, hidden waterfalls, and rich historical cultures. Premium guided excursions designed for the perfect balance of thrill and luxury.",
    cardTitle: "Tours",
    image: "/images/hero_tours.webp",
    ctaText: "Find an Adventure",
    ctaLink: "/tours",
  },
];

// ─────────────────────────────────────────────────────────────
// 📊 ตัวเลขสถิติ (หน้าแรก)
// ─────────────────────────────────────────────────────────────
export const trustStats = [
  { id: 1, value: 120, label: "Destinations Curated", suffix: "+" }, // เปลี่ยนตัวเลข value ได้
  { id: 2, value: 50,  label: "Weddings Executed",    suffix: "+" },
  { id: 3, value: 5,   label: "Star Advocate Rating",  suffix: ".0" },
];

// ─────────────────────────────────────────────────────────────
// 🏨 หน้า Hotels — ข้อมูลโรงแรมแนะนำ
// ─────────────────────────────────────────────────────────────
export const HOTELS_CONTENT = {
  hero: {
    badge: "Handpicked Accommodations",     // ป้ายเล็กด้านบน
    title: "Hotels & Stays",                // หัวข้อหน้า
    subtitle: "Immerse yourself in Jamaica's finest properties — from all-inclusive beachfront resorts to intimate boutique hideaways.",
    backgroundImage: "/images/hero_hotels.webp",
  },
  featuredHotel: {
    name: "Iberostar Grand Rose Hall",      // ชื่อโรงแรม
    location: "Montego Bay, Jamaica",       // ที่อยู่
    stars: 5,                               // ดาว (1-5)
    badge: "Our Top Pick",                  // ป้ายพิเศษ
    description: "An adults-only beachfront sanctuary where turquoise waters meet extraordinary service. The Grand Rose Hall redefines Caribbean luxury with its timeless colonial elegance.",
    image: "/images/hotel_iberostar.webp",  // รูปโรงแรม
    highlights: [                           // จุดเด่น (แก้ได้สูงสุด 4 รายการ)
      "Pristine Private Beach",
      "World-Class Spa",
      "Gourmet Dining",
      "Adults-Only Sanctuary",
    ],
    affiliateLink: "https://www.expedia.com/Montego-Bay-Hotels-Iberostar-Grand-Rose-Hall.h1506060.Hotel-Information",
    ctaText: "Check Availability",
  },
};

// ─────────────────────────────────────────────────────────────
// 🚢 หน้า Cruises
// ─────────────────────────────────────────────────────────────
export const CRUISES_CONTENT = {
  hero: {
    badge: "Caribbean Voyages",
    title: "Luxury Cruises",
    subtitle: "Set sail on an extraordinary journey through the Caribbean's most breathtaking destinations.",
    backgroundImage: "/images/hero_cruises.webp",
  },
};

// ─────────────────────────────────────────────────────────────
// 💍 หน้า Weddings
// ─────────────────────────────────────────────────────────────
export const WEDDINGS_CONTENT = {
  hero: {
    badge: "Destination Weddings",
    title: "Your Dream Wedding",
    subtitle: "Create unforgettable memories with a breathtaking destination wedding in paradise.",
    backgroundImage: "/images/hero_weddings.webp",
  },
};

// ─────────────────────────────────────────────────────────────
// 🌍 หน้า Tours
// ─────────────────────────────────────────────────────────────
export const TOURS_CONTENT = {
  hero: {
    badge: "Guided Excursions",
    title: "Tours & Adventures",
    subtitle: "Explore Jamaica's hidden gems and iconic landmarks with our expertly curated tour experiences.",
    backgroundImage: "/images/hero_tours.webp",
  },
};

// ─────────────────────────────────────────────────────────────
// 🏢 หน้า Corporate
// ─────────────────────────────────────────────────────────────
export const CORPORATE_CONTENT = {
  hero: {
    badge: "Corporate Travel",
    title: "Business Retreats",
    subtitle: "Elevate your corporate events with our premium travel management and planning services.",
    backgroundImage: "/images/hero_corporate.webp",
  },
};

// ─────────────────────────────────────────────────────────────
// ℹ️ หน้า About
// ─────────────────────────────────────────────────────────────
export const ABOUT_CONTENT = {
  companyName: "DT's Vacation & Travel Ltd.",
  founded: "2018",                          // ปีก่อตั้ง
  headline: "Crafting Extraordinary Journeys Since 2018",
  story: "Founded with a passion for exceptional travel experiences, DT's Vacation & Travel Limited has been Jamaica's premier travel consultancy. We believe every journey should be as unique as the traveler.",
  ownerName: "Owner Name",                  // ชื่อเจ้าของ
  ownerTitle: "Founder & Travel Director",  // ตำแหน่ง
};

// ─────────────────────────────────────────────────────────────
// 📦 Package tiers (หน้าแรก — Service Cards)
// ─────────────────────────────────────────────────────────────
export const servicePackages = [
  {
    id: "discovery",
    title: "Discovery",
    audience: "Individual / Leisure",       // กลุ่มเป้าหมาย
    description: "1-on-1 Dream Session, Vetted Itinerary, and Security Oversight.",
    icon: "🌍",
  },
  {
    id: "union",
    title: "Union",
    audience: "Destination Weddings",
    description: "Guest Concierge, Vendor Mediation, and Timeline Management.",
    icon: "💍",
    featured: true,                         // ไฮไลท์การ์ดนี้ (true/false)
  },
  {
    id: "synergy",
    title: "Synergy",
    audience: "Corporate Retreats",
    description: "Expense Transparency, Breakout Coordination, 24/7 Support.",
    icon: "🏢",
  },
];
