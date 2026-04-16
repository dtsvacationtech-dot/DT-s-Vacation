const rows = [
  {
    feature: "Approach",
    standard: "Algorithmic & Transactional",
    dts: "Intentional & Relational",
  },
  {
    feature: "Planning Style",
    standard: "Automated / Do-it-yourself",
    dts: "Meticulous & Disciplined",
  },
  {
    feature: "Problem Solving",
    standard: "Chatbots & Long Hold Times",
    dts: "Level-headed & Persistent Advocacy",
  },
  {
    feature: "Focus",
    standard: "Lowest Price Only",
    dts: "Highest Value & Personal Connection",
  },
  {
    feature: "Philosophy",
    standard: "Just a Transaction",
    dts: "Explore, Dream & Discover with Purpose",
  },
];

export default function WeddingDifference() {
  return (
    <section className="bg-[#fdf9f5] py-24 lg:py-28 border-t border-[#f0ddc8]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-5">
            <div className="w-8 h-[1px] bg-[#d4a87a]" />
            <p className="text-[#d4a87a] text-[10px] font-bold uppercase tracking-[0.4em]">
              The DT&apos;s Difference
            </p>
            <div className="w-8 h-[1px] bg-[#d4a87a]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#3d2314] tracking-tight">
            Travel with Intention
          </h2>
          <p className="text-[#7a5c44] text-lg font-light mt-4 max-w-xl mx-auto">
            See how our heart-led approach stands apart from standard booking services.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-3xl overflow-hidden border border-[#f0ddc8] shadow-[0_8px_40px_rgba(180,120,60,0.08)]">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-[#3d2314]">
            <div className="p-5 md:p-6 text-[#d4a87a] text-xs font-bold uppercase tracking-[0.3em]">
              Feature
            </div>
            <div className="p-5 md:p-6 text-white/50 text-xs font-bold uppercase tracking-[0.3em] border-l border-white/10">
              Standard Booking Sites
            </div>
            <div className="p-5 md:p-6 text-[#d4a87a] text-xs font-bold uppercase tracking-[0.3em] border-l border-white/10 flex items-center gap-2">
              <span>💍</span> DT&apos;s Vacation &amp; Travel Ltd.
            </div>
          </div>

          {/* Table Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 border-t border-[#f0ddc8] ${
                i % 2 === 0 ? "bg-white" : "bg-[#fdf0e0]/40"
              }`}
            >
              <div className="p-5 md:p-6">
                <p className="text-[#3d2314] font-semibold text-sm md:text-base tracking-wide">
                  {row.feature}
                </p>
              </div>
              <div className="p-5 md:p-6 border-l border-[#f0ddc8]">
                <p className="text-[#a08060] font-light text-sm md:text-base">
                  {row.standard}
                </p>
              </div>
              <div className="p-5 md:p-6 border-l border-[#f0ddc8] bg-[#fdf3e8]">
                <p className="text-[#c07a40] font-semibold text-sm md:text-base">
                  ✓ {row.dts}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
