import type { Metadata } from "next";
import CorporateHero from "@/components/corporate/CorporateHero";
import CorporateWhy from "@/components/corporate/CorporateWhy";
import CorporatePackingList from "@/components/corporate/CorporatePackingList";
import CorporateCTA from "@/components/corporate/CorporateCTA";

export const metadata: Metadata = {
  title: "Corporate Logistics | DT's Vacation & Travel Limited",
  description:
    "Precision in Motion. DT's Vacation & Travel provides disciplined, no-nonsense corporate travel management — executive retreats, conferences, and business logistics worldwide.",
};

export default function CorporatePage() {
  return (
    <main className="bg-deep-navy overflow-hidden">
      <CorporateHero />
      <CorporateWhy />
      <CorporatePackingList />
      <CorporateCTA />
    </main>
  );
}
