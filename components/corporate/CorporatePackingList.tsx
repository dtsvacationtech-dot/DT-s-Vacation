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
    <section className="py-24 bg-[#faf9f8]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Header */}
          <div className="lg:sticky lg:top-40">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-[1px] bg-tropical-gold" />
              <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.35em]">
                Travel Ready
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy tracking-tight leading-[1.05] mb-6">
              The Corporate Retreat
              <br />
              <span className="text-tropical-gold">Packing List</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-10">
              Focused on being disciplined, organized, and progressive. Tick
              off each item before your next executive trip.
            </p>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                <span>Packed</span>
                <span className="text-deep-navy">{checkedCount} / {packingItems.length}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-deep-navy rounded-full transition-all duration-500"
                  style={{ width: `${(checkedCount / packingItems.length) * 100}%` }}
                />
              </div>
            </div>

            {/* High-End Packing Image */}
            <div className="hidden lg:block relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl mt-12 bg-gray-100 group">
              <img 
                src="/images/corporate_luggage.webp" 
                alt="Premium corporate travel luggage in an exclusive airport lounge"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              {/* Optional soft gradient overlay for text readability if we add text later, or just a polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right: Checklist */}
          <div className="flex flex-col gap-4">
            {packingItems.map((item, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`group w-full text-left p-6 lg:p-8 rounded-2xl border transition-all duration-300 flex items-start gap-5 ${
                  checked[i]
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                }`}
              >
                {/* Checkbox */}
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5 ${
                    checked[i]
                      ? "bg-deep-navy border-deep-navy"
                      : "border-gray-300 group-hover:border-tropical-gold"
                  }`}
                >
                  {checked[i] && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl opacity-80">{item.icon}</span>
                    <h3
                      className={`font-semibold tracking-wide transition-colors duration-300 ${
                        checked[i] ? "text-gray-400 line-through" : "text-deep-navy"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className={`text-sm font-light leading-relaxed pl-9 transition-colors duration-300 ${
                    checked[i] ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {item.description}
                  </p>
                </div>
              </button>
            ))}

            {/* DT's Pro-Tip */}
            <div className="mt-8 p-6 lg:p-8 rounded-2xl bg-indigo-50 border border-indigo-100/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                    DT&apos;s Pro-Tip
                  </p>
                  <p className="text-deep-navy/80 text-sm font-medium leading-relaxed italic">
                    &ldquo;Tag your luggage with a bright ribbon or a smart-tag. Knowing
                    your bags are safe allows you to stay in &apos;work-mode&apos; or
                    &apos;relax-mode&apos; without worry.&rdquo;
                  </p>
                  <p className="text-indigo-400 text-xs font-semibold mt-3">— Denise Thomas</p>
                </div>
              </div>
            </div>

            {/* Download CTA */}
            <div className="flex items-center gap-4 mt-2 p-5 lg:px-8 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-tropical-gold/10 group-hover:border-tropical-gold/20 transition-colors">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-tropical-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-deep-navy text-sm font-semibold">Download as PDF</p>
                <p className="text-gray-500 text-xs font-light">A complimentary gift from DT&apos;s Travel</p>
              </div>
              <a
                href="mailto:dtvacationandtravel@gmail.com?subject=Request: Corporate Packing List PDF"
                className="text-deep-navy bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Request
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
