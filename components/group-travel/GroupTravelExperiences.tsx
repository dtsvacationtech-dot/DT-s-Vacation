"use client";

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { useEnquiry } from "@/context/EnquiryContext";
import { GROUP_TRAVEL_CONTENT } from "@/lib/siteContent";

export default function GroupTravelExperiences() {
  const { openModal } = useEnquiry();
  const { experiences } = GROUP_TRAVEL_CONTENT;

  const handleCardCta = (exp: typeof experiences[number]) => {
    openModal("group", `Inquiring about ${exp.title} (${exp.subtitle}). We are looking for custom group travel planning.`);
  };

  return (
    <section id="experiences" className="py-24 sm:py-32 bg-[#faf9f8] relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-tropical-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-[11px] sm:text-xs font-bold text-tropical-gold uppercase tracking-[0.3em] mb-3">
            Handcrafted Group Journeys
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-deep-navy tracking-tight mb-6">
            OUR GROUP TRAVEL EXPERIENCES
          </h2>
          <div className="w-16 h-1 bg-tropical-gold mx-auto mb-6" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Every group has a distinct purpose and rhythm. Explore our four signature group travel categories curated to foster connection, relaxation, and lifelong memories.
          </p>
        </div>

        {/* 4 Visual Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,12,28,0.12)] transition-all duration-500 flex flex-col hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <ImageWithSkeleton
                  src={exp.image}
                  alt={`${exp.title} - DT's Vacation & Travel Limited`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/70 via-black/20 to-transparent" />
                
                {/* Floating Category Badge */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-deep-navy/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                  <span className="text-base">{exp.icon}</span>
                  <span className="text-xs font-bold text-white tracking-wider uppercase font-heading">
                    {exp.title}
                  </span>
                </div>

                {/* Subtitle overlay at bottom of image */}
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <p className="text-tropical-gold text-xs font-bold tracking-widest uppercase mb-1">
                    {exp.subtitle}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                    {exp.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light mb-6">
                    {exp.description}
                  </p>

                  {/* Perfect For Section */}
                  <div className="mb-8 pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Perfect For:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.perfectFor.map((item, pIdx) => (
                        <span
                          key={pIdx}
                          className="inline-flex items-center text-xs font-medium text-deep-navy/80 bg-[#f4f2ee] px-3 py-1.5 rounded-full border border-gray-200/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => handleCardCta(exp)}
                    className="cursor-pointer group/btn inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-navy hover:text-tropical-gold transition-colors font-heading"
                  >
                    <span>{exp.ctaText}</span>
                    <span className="w-8 h-8 rounded-full bg-deep-navy text-white flex items-center justify-center group-hover/btn:bg-tropical-gold group-hover/btn:text-deep-navy group-hover/btn:translate-x-1 transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>

                  <button
                    onClick={() => handleCardCta(exp)}
                    className="cursor-pointer text-xs font-semibold text-gray-400 hover:text-deep-navy underline decoration-gray-300 underline-offset-4 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
