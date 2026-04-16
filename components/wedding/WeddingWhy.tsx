import Image from "next/image";

const pillars = [
  {
    icon: "💍",
    title: "The Intentional Touch",
    description:
      "We approach every wedding with a thoughtful and considerate mindset, ensuring that every detail — from the floral arrangements to the sunset view — is intentionally chosen to reflect your unique story.",
  },
  {
    icon: "🌍",
    title: "Inclusive Celebrations",
    description:
      "We are devoted to making sure every guest feels welcomed and every family tradition is respected, no matter where in the world you choose to say, \"I do\".",
  },
  {
    icon: "📋",
    title: "Meticulous Peace of Mind",
    description:
      "You should be focused on each other, not the logistics. Our meticulous and organised planning process handles the no-nonsense details so you can stay in the moment.",
  },
  {
    icon: "✨",
    title: "A Joyful Partnership",
    description:
      "With a jovial spirit and a positive outlook, we turn the potentially stressful planning process into a celebratory experience filled with joy.",
  },
];

export default function WeddingWhy() {
  return (
    <section className="bg-[#fdf9f5] py-24 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">

        {/* ── Intro Split Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          {/* Left: Text */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-[1px] bg-[#d4a87a]" />
              <p className="text-[#d4a87a] text-[10px] font-bold uppercase tracking-[0.4em]">
                Why Trust Us
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#3d2314] tracking-tight leading-tight mb-8">
              Why Trust Us With
              <br />
              <span className="text-[#c07a40]">Your Big Moment?</span>
            </h2>
            <p className="text-[#7a5c44] text-lg font-light leading-relaxed mb-6">
              At DT&apos;s Vacation &amp; Travel Ltd., we don&apos;t just book destinations
              — we curate the backdrop for your most cherished memories with a
              caring and gentle touch.
            </p>
            <p className="text-[#7a5c44] text-lg font-light leading-relaxed">
              From bold destination weddings to gentle, quiet honeymoon escapes,
              we are{" "}
              <span className="text-[#c07a40] font-medium">persistent in our pursuit</span>{" "}
              of your perfection.
            </p>
          </div>

          {/* Right: Rings Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(180,120,60,0.2)] aspect-[4/3]">
              <Image
                src="/images/wedding_rings.webp"
                alt="Wedding rings on a passport — travel and love intertwined"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-xl border border-[#f0ddc8] hidden md:block">
              <p className="text-[#c07a40] text-xs font-bold uppercase tracking-widest mb-1">Our Devotion</p>
              <p className="text-[#3d2314] text-sm font-medium leading-snug max-w-[200px]">
                Every detail chosen to reflect your story
              </p>
            </div>
          </div>
        </div>

        {/* ── 4 Pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-8 lg:p-10 border border-[#f0ddc8] hover:border-[#d4a87a]/40 hover:shadow-[0_8px_30px_rgba(180,120,60,0.12)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-[#fdf0e0] border border-[#f0ddc8] flex items-center justify-center text-2xl group-hover:bg-[#d4a87a]/20 transition-colors duration-300">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#3d2314] mb-3 tracking-wide">
                    {p.title}
                  </h3>
                  <p className="text-[#7a5c44] font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Group Celebration Image Strip ── */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-[420px] md:h-[520px]">
            <Image
              src="/images/wedding_group.webp"
              alt="Joyful wedding reception celebration with family and friends"
              fill
              className="object-cover object-[center_30%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a06]/70 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <p className="text-[#d4a87a] text-xs font-bold uppercase tracking-[0.35em] mb-3">
                Your Dream, Our Devotion
              </p>
              <p className="text-white text-2xl md:text-3xl font-heading font-light leading-tight max-w-xl italic">
                &ldquo;Let us help you Explore, Dream, and Discover the perfect start
                to your forever.&rdquo;
              </p>
            </div>
            <a
              href="mailto:dtvacationandtravel@gmail.com?subject=Wedding Planning Enquiry"
              className="flex-shrink-0 inline-flex items-center gap-3 bg-[#d4a87a] text-[#1a0a06] font-bold px-7 py-4 rounded-full hover:bg-[#f0c89a] transition-all duration-300 shadow-xl text-sm uppercase tracking-wider whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Start Planning
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
