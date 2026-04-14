import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";

export const metadata: Metadata = {
  title: "About Denis Thomas | DT's Vacation & Travel Ltd.",
  description:
    "Meet Denis Thomas, the heart behind DT's Vacation & Travel Ltd. A trusted Jamaican travel agency crafting unforgettable experiences through faith, warmth, and meticulous attention to detail.",
};

export default function AboutPage() {
  return (
    <main className="bg-deep-navy overflow-hidden">
      <AboutHero />
      <AboutStory />
      <AboutStats />
    </main>
  );
}
