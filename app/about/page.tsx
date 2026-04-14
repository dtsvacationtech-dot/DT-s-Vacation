import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutStats from "@/components/about/AboutStats";

export const metadata: Metadata = {
  title: "About Denis Thomas | DT's Vacation & Travel Ltd.",
  description:
    "Meet Denis Thomas, the heart behind DT's Vacation & Travel Ltd. A trusted Jamaican travel agency crafting unforgettable experiences through faith, warmth, and meticulous attention to detail.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-deep-navy overflow-hidden">
        <AboutHero />
        <AboutStory />
        <AboutStats />
        <AboutValues />
      </main>
      <Footer />
    </>
  );
}
