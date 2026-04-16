"use client";

import { useState } from "react";

const packingItems = [
  {
    icon: "⚡",
    title: 'The Tech "Power Trio"',
    description:
      "Universal power adapter, a portable power bank, and a multi-port charging hub.",
  },
  {
    icon: "👔",
    title: '"Smart-Casual" Versatility',
    description:
      "Pieces that transition from a no-nonsense meeting to a jovial group dinner without a change of bag.",
  },
  {
    icon: "📄",
    title: "Digital Backup",
    description:
      "A physical printout of your corporate itinerary and hotel confirmation — just in case technology isn't consistent.",
  },
  {
    icon: "🎧",
    title: "Wellness Essentials",
    description:
      "Noise-canceling headphones for the flight and a reusable water bottle to stay focused and hydrated.",
  },
  {
    icon: "🤝",
    title: "Business Cards / LinkedIn QR",
    description:
      "Since you're a social butterfly, make sure you're ready to connect at every opportunity.",
  },
];

export default function CorporatePackingList() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(packingItems.length).fill(false)
  );

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const checkedCount = checked.filter(Boolean).length;

  return (
    <section className="py-24 bg-[#000d1f]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Header */}
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-[1px] bg-tropical-gold" />
              <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.35em]">
                Travel Ready
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.05] mb-6">
              The Corporate Retreat
              <br />
              <span className="text-tropical-gold">Packing List</span>
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
              Focused on being disciplined, organized, and progressive. Tick
              off each item before your next executive trip.
            </p>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                <span>Packed</span>
                <span className="text-tropical-gold">{checkedCount} / {packingItems.length}</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-tropical-gold rounded-full transition-all duration-500"
                  style={{ width: `${(checkedCount / packingItems.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Briefcase Icon */}
            <div className="w-16 h-16 rounded-2xl bg-tropical-gold/10 border border-tropical-gold/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Right: Checklist */}
          <div className="flex flex-col gap-4">
            {packingItems.map((item, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`group w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-5 ${
                  checked[i]
                    ? "bg-tropical-gold/10 border-tropical-gold/40"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                {/* Checkbox */}
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5 ${
                    checked[i]
                      ? "bg-tropical-gold border-tropical-gold"
                      : "border-white/30 group-hover:border-tropical-gold/60"
                  }`}
                >
                  {checked[i] && (
                    <svg className="w-4 h-4 text-deep-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xl">{item.icon}</span>
                    <h3
                      className={`font-bold tracking-wide transition-colors duration-300 ${
                        checked[i] ? "text-tropical-gold line-through decoration-tropical-gold/50" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm font-light leading-relaxed pl-9">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}

            {/* DT's Pro-Tip */}
            <div className="relative mt-4 p-6 rounded-2xl bg-tropical-gold/10 border border-tropical-gold/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-tropical-gold/5 rounded-full blur-2xl -translate-y-8 translate-x-8 pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-tropical-gold/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-tropical-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                    DT&apos;s Pro-Tip
                  </p>
                  <p className="text-white/80 text-sm font-light leading-relaxed italic">
                    &ldquo;Tag your luggage with a bright ribbon or a smart-tag. Knowing
                    your bags are safe allows you to stay in &apos;work-mode&apos; or
                    &apos;relax-mode&apos; without worry.&rdquo;
                  </p>
                  <p className="text-tropical-gold/60 text-xs font-semibold mt-2">— Denise Thomas</p>
                </div>
              </div>
            </div>

            {/* Download CTA */}
            <div className="flex items-center gap-4 mt-2 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-white text-sm font-semibold">Download as PDF</p>
                <p className="text-gray-500 text-xs font-light">A complimentary gift from DT&apos;s Travel</p>
              </div>
              <a
                href="mailto:dtvacationandtravel@gmail.com?subject=Request: Corporate Packing List PDF"
                className="text-tropical-gold text-xs font-bold uppercase tracking-wider hover:text-yellow-300 transition-colors"
              >
                Request →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
