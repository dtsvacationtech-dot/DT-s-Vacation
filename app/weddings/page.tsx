import type { Metadata } from "next";
import WeddingWhy from "@/components/wedding/WeddingWhy";
import WeddingDifference from "@/components/wedding/WeddingDifference";
import WeddingCTA from "@/components/wedding/WeddingCTA";


export const metadata: Metadata = {
  title: "The Wedding Suite | DT's Vacation & Travel Limited",
  description:
    "A Journey as Unique as Your Bond. DT's Vacation & Travel curates the perfect backdrop for your destination wedding or honeymoon — with an intentional, caring, and meticulous touch.",
};

export default function WeddingPage() {
  return (
    <main className="bg-[#fdf9f5] overflow-hidden min-h-screen flex flex-col pt-32">
      <WeddingWhy />
      <WeddingDifference />
      <WeddingCTA />
    </main>
  );
}
