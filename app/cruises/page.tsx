import type { Metadata } from "next";
import CruiseWhy from "@/components/cruise/CruiseWhy";
import CruiseDestinations from "@/components/cruise/CruiseDestinations";
import CruiseEnquiryForm from "@/components/cruise/CruiseEnquiryForm";
import CruiseCTA from "@/components/cruise/CruiseCTA";

export const metadata: Metadata = {
  title: "Ocean Voyages & Cruises | DT's Vacation & Travel Limited",
  description:
    "Explore the world, one port at a time. DT's Vacation specializes in exclusive cruise deals, personalized itineraries, and full-journey support from takeoff to dock.",
};

export default function CruisesPage() {
  return (
    <main className="bg-[#faf9f8] overflow-hidden min-h-screen flex flex-col">
      <CruiseWhy />
      <CruiseDestinations />
      <CruiseEnquiryForm />
      <CruiseCTA />
    </main>
  );
}
