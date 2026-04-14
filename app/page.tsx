import HeroCarousel from "@/components/home/HeroCarousel";
import TrustBar from "@/components/home/TrustBar";
import ServiceCards from "@/components/home/ServiceCards";

import ManifestoMarquee from "@/components/home/ManifestoMarquee";
import WeddingShowcase from "@/components/home/WeddingShowcase";
import CorporateShowcase from "@/components/home/CorporateShowcase";
import WhyUsShowcase from "@/components/home/WhyUsShowcase";
import CruiseShowcase from "@/components/home/CruiseShowcase";
import ToursShowcase from "@/components/home/ToursShowcase";

export default function Home() {
  return (
    <div className="w-full">
      <HeroCarousel />
      <TrustBar />
      <ManifestoMarquee />
      <ServiceCards />
      <CorporateShowcase />
      <WeddingShowcase />
      <WhyUsShowcase />
      <CruiseShowcase />
      <ToursShowcase />
      
      <div id="adventure"></div>
      <div id="wedding"></div>
      <div id="retreat"></div>

    </div>
  );
}
