import type { Metadata } from "next";
import ToursGallery from "@/components/tours/ToursGallery";
import ToursExperiences from "@/components/tours/ToursExperiences";
import ToursCTA from "@/components/tours/ToursCTA";

export const metadata: Metadata = {
  title: "Curated Tours & Experiences | DT's Vacation & Travel Limited",
  description:
    "Explore unforgettable tours across Jamaica and around the world. From river rafting and jungle safaris to ancient ruins and island getaways — DT's Vacation crafts bespoke experiences that stay with you forever.",
};

export default function ToursPage() {
  return (
    <main className="bg-[#faf9f8] overflow-hidden min-h-screen flex flex-col pt-32">
      <ToursGallery />
      <ToursExperiences />
      <ToursCTA />
    </main>
  );
}
