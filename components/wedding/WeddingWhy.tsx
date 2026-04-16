import Image from "next/image";


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
              <p className="text-[#d4a87a] text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]">
                The Wedding Suite
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-[#3d2314] tracking-tight leading-[1.05] mb-6">
              A Journey as Unique
              <br />
              <span className="text-[#c07a40]">as Your Bond.</span>
            </h1>
            <p className="text-[#7a5c44] text-lg font-light leading-relaxed mb-8">
              Your wedding or honeymoon isn&apos;t just an event — it&apos;s the beginning of a
              lifelong adventure. You deserve a planner who is as passionate and loving
              as the occasion itself.
            </p>
            
            <h2 className="text-2xl font-heading font-bold text-[#3d2314] mb-4">
              Why trust us with your Big Moment?
            </h2>
            <p className="text-[#7a5c44] text-lg font-light leading-relaxed mb-6">
              At DT&apos;s Vacation &amp; Travel Ltd., we don&apos;t just book destinations
              — we curate the backdrop for your most cherished memories with a
              caring and gentle touch. From bold destination weddings to gentle, quiet honeymoon escapes,
              we are <span className="text-[#c07a40] font-medium">persistent in our pursuit</span> of your perfection.
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

        {/* ── 4 Pillars (Premium iOS Cards) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {[
            {
              title: "The Intentional Touch",
              description:
                "We approach every wedding with a thoughtful and considerate mindset, ensuring that every detail — from the floral arrangements to the sunset view — is intentionally chosen to reflect your unique story.",
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              ),
            },
            {
              title: "Inclusive Celebrations",
              description:
                "We are devoted to making sure every guest feels welcomed and every family tradition is respected, no matter where in the world you choose to say, \"I do\".",
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              ),
            },
            {
              title: "Meticulous Peace of Mind",
              description:
                "You should be focused on each other, not the logistics. Our meticulous and organised planning process handles the no-nonsense details so you can stay in the moment.",
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
            },
            {
              title: "A Joyful Partnership",
              description:
                "With a jovial spirit and a positive outlook, we turn the potentially stressful planning process into a celebratory experience filled with joy.",
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              ),
            },
          ].map((p, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-[2rem] p-8 lg:p-10 border border-[#f0ddc8]/60 shadow-[0_20px_40px_-15px_rgba(180,120,60,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(180,120,60,0.15)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle ambient interior glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#fdf0e0]/50 to-transparent rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Floating Circular Badge */}
                <div className="w-14 h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-[#fdf0e0] to-[#f5e1c8] border border-[#e8cfa8] shadow-[0_8px_16px_-6px_rgba(180,120,60,0.2)] flex items-center justify-center text-[#c07a40] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 z-10 relative">
                  {p.icon}
                  {/* Small glow behind icon */}
                  <div className="absolute inset-0 bg-[#d4a87a] blur-xl opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-500 -z-10" />
                </div>
                
                <div className="z-10 relative pt-1">
                  <h3 className="text-xl md:text-2xl font-heading font-extrabold text-[#3d2314] mb-3 tracking-tight group-hover:text-[#c07a40] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-[#7a5c44]/90 font-light leading-relaxed text-[15px] md:text-base">
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
              alt="Elegant outdoor wedding ceremony aisle with floral arrangements and golden chairs"
              fill
              className="object-cover object-center"
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
