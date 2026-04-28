import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const experiences = [
  {
    title: "River & Rainforest",
    description: "Guided bamboo raft journeys through Jamaica's lush tropical river valleys.",
    image: "/images/tour_bamboo_raft_1776115624127.webp",
    stats: [
      { label: "Duration", value: "3 hrs" },
      { label: "Difficulty", value: "Easy" },
    ],
  },
  {
    title: "Jungle ATV Safari",
    description: "Off-road adventures through red-dirt trails and hidden waterfalls.",
    image: "/images/tour_jungle_atv_1776115609750.webp",
    stats: [
      { label: "Duration", value: "4 hrs" },
      { label: "Difficulty", value: "Moderate" },
    ],
  },
  {
    title: "Heritage & History",
    description: "Walk through centuries of Caribbean history at iconic plantation estates.",
    image: "/images/tour_history_1776115655578.webp",
    stats: [
      { label: "Duration", value: "2 hrs" },
      { label: "Difficulty", value: "Easy" },
    ],
  },
];

export default function ToursExperiences() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-tropical-gold" />
            <p className="text-tropical-gold text-xs font-bold uppercase tracking-[0.35em]">
              Adventure Awaits
            </p>
            <div className="w-8 h-[1px] bg-tropical-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-deep-navy tracking-tight leading-[1.1] mb-5">
            Signature Experiences
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Handpicked activities that go beyond sightseeing. Every experience is designed to immerse you in the soul of the destination.
          </p>
        </div>

        {/* ── Experience Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="group relative bg-[#faf9f8] rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgba(0,10,40,0.05)] hover:shadow-[0_24px_60px_rgba(0,10,40,0.12)] hover:-translate-y-2 transition-all duration-700 flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-72 overflow-hidden">
                <ImageWithSkeleton
                  src={exp.image}
                  alt={exp.title}
                  fill
                  skeletonClassName="skeleton-shimmer"
                  className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow relative bg-white z-10 rounded-t-[2rem] -mt-6 transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-2xl font-heading font-bold text-deep-navy mb-3 tracking-tight group-hover:text-tropical-gold transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed mb-6 flex-grow">
                  {exp.description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 pt-5 border-t border-gray-100">
                  {exp.stats.map((stat, si) => (
                    <div key={si} className="flex-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                        {stat.label}
                      </span>
                      <span className="text-deep-navy font-bold text-sm">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-end">
                    <div className="w-10 h-10 rounded-full bg-[#faf9f8] flex items-center justify-center text-deep-navy group-hover:bg-deep-navy group-hover:text-white transition-colors duration-300">
                      <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
