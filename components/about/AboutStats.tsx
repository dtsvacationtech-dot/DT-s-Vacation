"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { number: "500+", label: "Trips Planned", sub: "Across 30+ destinations" },
  { number: "98%", label: "Client Satisfaction", sub: "Returning & referred clients" },
  { number: "10+", label: "Years of Service", sub: "Trusted since our founding" },
  { number: "4", label: "Continents Served", sub: "Americas, Europe, Asia, Africa" },
];

export default function AboutStats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-tropical-gold py-24 md:py-32 overflow-hidden border-t border-black/5">
      {/* Subtle engraved diagonal stripe pattern for texture */}
      <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'repeating-linear-gradient(-45deg, #000c1c 0, #000c1c 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px'}} />

      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {stats.map((item, i) => (
            <div
              key={item.label}
              className={`text-center transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Premium Top Line Divider above each stat */}
              <div className="w-12 h-1 bg-deep-navy/20 mx-auto mb-8 rounded-full" />
              
              <p className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-deep-navy mb-3 tracking-tighter drop-shadow-sm">
                {item.number}
              </p>
              <p className="font-bold text-deep-navy text-sm md:text-base mb-2 uppercase tracking-widest">
                {item.label}
              </p>
              <p className="text-deep-navy/70 text-xs md:text-sm font-medium">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
