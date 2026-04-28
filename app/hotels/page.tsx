import type { Metadata } from "next";
import HotelsHero from "@/components/hotels/HotelsHero";
import HotelsDTDifference from "@/components/hotels/HotelsDTDifference";
import HotelsHandpicked from "@/components/hotels/HotelsHandpicked";
import HotelsFeaturedGrid from "@/components/hotels/HotelsFeaturedGrid";
import HotelsCTA from "@/components/hotels/HotelsCTA";

export const metadata: Metadata = {
  title: "Premium Hotels & Stays | DT's Vacation & Travel Limited",
  description: "Search and book 200+ premium hotels worldwide. From Jamaica's finest resorts to Parisian palaces — DT's Vacation & Travel finds your perfect stay through our Expedia TAAP partnership.",
  keywords: "luxury hotels, Jamaica resorts, Expedia TAAP, hotel booking, travel agency",
  openGraph: {
    title: "Hotels & Stays | DT's Vacation & Travel",
    description: "Premium hotel search powered by Expedia TAAP partnership.",
    images: ["/images/hero_hotels_bg.webp"],
  },
};

export default function HotelsPage() {
  return (
    <div className="bg-[#faf9f8] min-h-screen flex flex-col overflow-x-hidden">
      <HotelsHero />
      <HotelsDTDifference />
      <HotelsHandpicked />
      <HotelsFeaturedGrid />
      <HotelsCTA />
    </div>
  );
}
