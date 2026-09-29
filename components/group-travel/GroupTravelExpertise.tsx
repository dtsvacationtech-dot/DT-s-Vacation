"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { useEnquiry } from "@/context/EnquiryContext";

const VISUAL_PILLARS = [
  {
    id: "resorts",
    number: "01",
    badge: "Resorts & villas",
    title: "A stay made for everyone",
    subtitle: "Group room blocks, thoughtful upgrades and simple guest payments.",
    image: "/images/hotel_iberostar.webp",
    alt: "Luxury illuminated Jamaican resort and oceanfront pool at evening",
    inquiryTopic: "Negotiated Resort & Villa Room Blocks",
  },
  {
    id: "charters",
    number: "02",
    badge: "Private charters",
    title: "A day out on the water",
    subtitle: "Private sailing, quiet coves and sunset celebrations along the coast.",
    image: "/images/group_social.webp",
    alt: "Private group catamaran charter celebration at sunset in Jamaica",
    inquiryTopic: "Private Catamaran & Ocean Charters",
  },
  {
    id: "excursions",
    number: "03",
    badge: "Island adventures",
    title: "See more of Jamaica",
    subtitle: "Waterfalls, bamboo rafting and memorable meals by the sea.",
    image: "/images/jamaica_dunns_river_1776109133368.webp",
    alt: "Climbing Dunn's River Falls in the lush Jamaican rainforest",
    inquiryTopic: "Private Group Excursions & Waterfalls",
  },
  {
    id: "transit",
    number: "04",
    badge: "VIP logistics",
    title: "Arrive without the wait",
    subtitle: "Airport fast-track and private, air-conditioned group transfers.",
    image: "/images/jamaica_seven_mile_1776109120865.webp",
    alt: "Seven Mile Beach crystal turquoise waters at golden hour",
    inquiryTopic: "Airport Fast-Track & Private Group Transport",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function GroupTravelExpertise() {
  const { openModal } = useEnquiry();

  return (
    <section id="expertise" className="bg-[#f4f1ea] py-16 text-deep-navy sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-9 grid gap-5 md:mb-11 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-tropical-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#94700a]">
                Group travel, thoughtfully handled
              </p>
            </div>
            <h2 className="max-w-3xl font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[3.25rem]">
              Your group. Your vision.
              <span className="mt-1 block font-medium text-[#94700a]">Consider it handled.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 md:col-span-5 md:justify-self-end md:pb-1 md:text-base">
            From resort stays and private charters to island days and airport transfers, our local team brings every detail together so everyone can enjoy the trip.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {VISUAL_PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              onClick={() => openModal("group", `Inquiring about ${pillar.inquiryTopic}.`)}
              aria-label={`Ask about ${pillar.badge.toLowerCase()}: ${pillar.title}`}
              className="group relative block h-[330px] w-full cursor-pointer overflow-hidden rounded-2xl bg-deep-navy text-left shadow-[0_8px_24px_rgba(0,12,28,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,12,28,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tropical-gold sm:h-[360px] lg:h-[380px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <ImageWithSkeleton
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 680px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a31]/90 via-[#061a31]/15 to-black/10" />
              </div>

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-xs font-semibold tabular-nums text-tropical-gold">{pillar.number}</span>
                  <span className="h-4 w-px bg-white/45" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] sm:text-[11px]">
                    {pillar.badge}
                  </span>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white transition-colors duration-300 group-hover:border-tropical-gold group-hover:bg-tropical-gold group-hover:text-deep-navy">
                  <ArrowIcon />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 pt-20 sm:p-7 sm:pt-24">
                <h3 className="font-heading text-2xl font-semibold leading-tight text-white sm:text-[1.75rem]">
                  {pillar.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-white/85 sm:text-[15px]">
                  {pillar.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-[#e6dfd1] bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
          <div className="max-w-3xl">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#94700a]">
              Personal support, all the way through
            </p>
            <h3 className="font-heading text-lg font-semibold text-deep-navy sm:text-xl">
              A local team looking after the details.
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Denise and our on-island specialists keep your plans on track from arrival to the last day.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openModal("group", "I would like to plan a custom group travel experience.")}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-full bg-deep-navy px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#123f70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tropical-gold"
          >
            <span>Plan your group trip</span>
            <ArrowIcon />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[10px] font-medium tracking-wide text-slate-500 sm:text-xs">
          <span>Jamaica Ministry of Tourism Licensed #MOT-JM-876</span>
          <span aria-hidden="true" className="text-tropical-gold">·</span>
          <span>TAAP Certified Partner</span>
          <span aria-hidden="true" className="text-tropical-gold">·</span>
          <span>12+ years of group travel experience</span>
        </div>
      </div>
    </section>
  );
}
