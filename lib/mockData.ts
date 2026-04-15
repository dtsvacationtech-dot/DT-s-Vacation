export const heroSlides = [
  {
    id: 1,
    locationTag: "Luxury Stays",
    title: "Experience Premium Hospitality",
    description: "Discover exclusive 5-star beachfront resorts equipped with world-class amenities, infinity pools, and unparalleled personalized service for the ultimate relaxation.",
    cardTitle: "Hotels",
    image: "/images/hero_hotels.webp",
    ctaText: "Discover Hotels",
    ctaLink: "#hotels",
  },
  {
    id: 2,
    locationTag: "Executive Travel",
    title: "Elevate Your Corporate Retreat",
    description: "Sleek, modern meeting spaces overlooking the Caribbean sea. We handle premium logistics so you can focus on strategy, team-building, and global growth.",
    cardTitle: "Corporate",
    image: "/images/hero_corporate.webp",
    ctaText: "Plan a Retreat",
    ctaLink: "#corporate",
  },
  {
    id: 3,
    locationTag: "Timeless Romance",
    title: "Celebrate Unforgettable Love",
    description: "Say 'I do' on pristine white sand beaches at golden hour. Let us orchestrate your breathtaking destination wedding with elegant floral designs and flawless coordination.",
    cardTitle: "Weddings",
    image: "/images/hero_weddings.webp",
    ctaText: "Start Planning",
    ctaLink: "#weddings",
  },
  {
    id: 4,
    locationTag: "Ocean Voyages",
    title: "Sail the Majestic Caribbean",
    description: "Embark on luxury mega cruise ships traversing crystal clear turquoise waters. Indulge in premium onboard dining, entertainment, and breathtaking coastal horizons.",
    cardTitle: "Cruises",
    image: "/images/hero_cruises.webp",
    ctaText: "View Voyages",
    ctaLink: "#cruises",
  },
  {
    id: 5,
    locationTag: "Immersive Adventures",
    title: "Explore the Unknown Wonders",
    description: "Venture deep into lush jungles, hidden waterfalls, and rich historical cultures. Premium guided excursions designed for the perfect balance of thrill and luxury.",
    cardTitle: "Tours",
    image: "/images/hero_tours.webp",
    ctaText: "Find an Adventure",
    ctaLink: "#tours",
  }
];

export const trustStats = [
  { id: 1, value: 120, label: "Destinations Curated", suffix: "+" },
  { id: 2, value: 50, label: "Weddings Executed", suffix: "+" },
  { id: 3, value: 5, label: "Star Advocate Rating", suffix: ".0" },
];

export const servicePackages = [
  {
    id: "discovery",
    title: "Discovery",
    audience: "Individual / Leisure",
    description: "1-on-1 Dream Session, Vetted Itinerary, and Security Oversight.",
    icon: "🌍",
  },
  {
    id: "union",
    title: "Union",
    audience: "Destination Weddings",
    description: "Guest Concierge, Vendor Mediation, and Timeline Management.",
    icon: "💍",
    featured: true,
  },
  {
    id: "synergy",
    title: "Synergy",
    audience: "Corporate Retreats",
    description: "Expense Transparency, Breakout Coordination, 24/7 Support.",
    icon: "🏢",
  }
];

export const quizQuestions = [
  {
    id: "q1",
    question: "What is the primary return-state goal of your journey?",
    options: [
      { id: "o1", text: "Refreshed & Inspired", resultScore: { discovery: 2, union: 0, synergy: 0 } },
      { id: "o2", text: "Connected & Celebrated", resultScore: { discovery: 0, union: 2, synergy: 1 } },
      { id: "o3", text: "Bold & Strategic", resultScore: { discovery: 1, union: 0, synergy: 2 } }
    ]
  }
];
