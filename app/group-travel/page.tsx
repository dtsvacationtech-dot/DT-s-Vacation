import type { Metadata } from "next";
import GroupTravelHero from "@/components/group-travel/GroupTravelHero";
import GroupTravelIntro from "@/components/group-travel/GroupTravelIntro";
import GroupTravelExperiences from "@/components/group-travel/GroupTravelExperiences";
import GroupTravelExpertise from "@/components/group-travel/GroupTravelExpertise";
import GroupTravelCTA from "@/components/group-travel/GroupTravelCTA";

export const metadata: Metadata = {
  title: "Group Travel Experiences | DT's Vacation & Travel Limited",
  description:
    "Travel Together. Create Memories. Experience More. DT's Vacation & Travel Limited makes group travel personal, seamless, and stress-free — retreats, family reunions, celebrations, and wellness getaways.",
  openGraph: {
    title: "Group Travel Experiences | DT's Vacation & Travel Limited",
    description:
      "Whether you're planning a retreat, bringing family together, or celebrating a milestone, DT's Vacation & Travel Limited coordinates every detail from start to finish.",
    images: [
      {
        url: "/images/hero_group_travel.webp",
        width: 1200,
        height: 630,
        alt: "DT's Vacation & Travel - Group Travel Experiences",
      },
    ],
  },
};

export default function GroupTravelPage() {
  return (
    <main className="bg-[#faf9f8] overflow-hidden min-h-screen flex flex-col">
      {/* 1. Hero Section */}
      <GroupTravelHero />

      {/* 2. Short Introduction */}
      <GroupTravelIntro />

      {/* 3. Four Visual Service Cards (Retreats, Reunions, Social & Leisure, Health & Wellness) */}
      <GroupTravelExperiences />

      {/* 4 & 5. Your Group. Your Vision. Our Expertise. & Why DT's? */}
      <GroupTravelExpertise />

      {/* 6. Strong CTA Section */}
      <GroupTravelCTA />
    </main>
  );
}
