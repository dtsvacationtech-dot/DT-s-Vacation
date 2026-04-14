import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";

export const metadata: Metadata = {
  title: "About Denise Thomas | DT's Vacation & Travel Limited",
  description:
    "Meet Denise Thomas, the heart behind DT's Vacation & Travel Limited. A trusted Jamaican travel agency crafting unforgettable experiences through faith, warmth, and meticulous attention to detail.",
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
